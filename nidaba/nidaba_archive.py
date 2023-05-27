#!/usr/bin/python3

import time
import datetime
import os.path
import shutil
import pickle
import subprocess
import cherrypy

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

class nidaba_archive(object):
	
	def __init__(self):
		self.m_root_path = "{0}/.nidaba".format(os.path.expanduser("~"))
		if not os.path.exists(self.m_root_path):
			os.makedirs(self.m_root_path)

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def archive_order(self, order):
		pickle_jar = "{0}/archive_orders_{1}.p".format(self.m_root_path, datetime.date.today())
		with open(pickle_jar, "ab") as write_fp:
			for item in order:
				item["hour"] = datetime.datetime.now().hour
				
				pickle.dump(item, write_fp)

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def archive_config(self, argv):
		config = argv[0]
		pickle_jar = "{0}/archive_config_{1}.p".format(self.m_root_path, datetime.date.today())
		default_pickle_jar = "{0}/archive_config_default.p".format(self.m_root_path)

		with open(pickle_jar, "wb") as write_fp:
			pickle.dump(config, write_fp)

		shutil.copyfile(pickle_jar, default_pickle_jar)

	def get_config(self, argv):
		date = self.get_sanitized_date(argv)

		pickle_jar = "{0}/archive_config_{1}.p".format(self.m_root_path, date)
		default_pickle_jar = "{0}/archive_config_default.p".format(self.m_root_path)

		if (not os.path.exists(pickle_jar)) and os.path.exists(default_pickle_jar):
			shutil.copyfile(default_pickle_jar, pickle_jar)
	
		if os.path.exists(pickle_jar):
			with open(pickle_jar, "rb") as read_fp:
				config = pickle.load(read_fp)
		else:
			config = {}
			
		return config

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def get_sanitized_date(self, argv):
		try:
			date = datetime.datetime.strptime(argv[0], "%Y-%m-%d").date()
		except (ValueError, IndexError, TypeError):
			date = datetime.date.today()
		
		return date

	def date_2_day(self, date_str):
		date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
		return date.strftime("%A")

	def set_time(self, argv):
		now = datetime.datetime.fromtimestamp(int(argv[0]))

		subprocess.call(["sudo", "date", "+%Y-%m-%d", "-s", "{0}".format(now.date())])
		subprocess.call(["sudo", "date", "+%T", "-s", "{0}:{1}:{2}".format(now.hour, now.minute, now.second)])

	def get_time(self, argv):
		return 	{ \
					"time_epoch": time.time(),
					"time_string": str(datetime.datetime.now())
				}

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def item_profit(self, item, config):
		price = 0
		cost = 0

		if item["type"] == "burger":
			extra_count = { 	"single" : 0, \
								"double" : 2, 
								"cheezly": 1,
								"double_cheezly" : 2 }.get(item["burger_type"], None)

			if "Shrooms" in item["extras"]:
				extra_count += 1
			if "Rasher" in item["extras"]:
				extra_count += 1

			price = config["price_burger_base"] + config["price_burger_extra"] * extra_count
			cost = config["cost_burger_base"] + config["cost_burger_extra"] * extra_count

		if item["type"] == "hot_drink":
			price = config["price_hot_drink"]
			cost = config["cost_hot_drink"]

		if item["type"] == "cold_food":
			price = {	"wedges" : config["price_cold_food_pasty"], \
						"pasty" : config["price_cold_food_pasty"], \
						"indian" : config["price_cold_food_indian"],
						"cake" : config["price_cold_food_cake"] }.get(item["cold_food_type"], None)
			cost = {	"wedges" : config["cost_cold_food_pasty"], \
						"pasty" : config["cost_cold_food_pasty"], \
						"indian" : config["cost_cold_food_indian"],
						"cake" : config["cost_cold_food_cake"] }.get(item["cold_food_type"], None)

		if item["type"] == "cold_drink":
			price = {	"can" : config["price_cold_drink_can"], \
						"carton" : config["price_cold_drink_carton"],
						"bottle" : config["price_cold_drink_bottle"] }.get(item["cold_drink_type"], None)
			cost = {	"can" : config["cost_cold_drink_can"], \
						"carton" : config["cost_cold_drink_carton"],
						"bottle" : config["cost_cold_drink_bottle"] }.get(item["cold_drink_type"], None)

		return(price, cost)

	def get_report(self, argv):
		config = self.get_config(argv)
		date_str = str(self.get_sanitized_date(argv))
		pickle_jar = "{0}/archive_orders_{1}.p".format(self.m_root_path, date_str)

		report_data = {}
		report_meta_data = { 	"date": date_str,\
								"day" : self.date_2_day(date_str),
								"max_profit" : 0.0,
								"max_hour_profit" : 0.0,
								"max_turnover" : 0.0,
								"max_hour_turnover" : 0.0,
								"max_count" : { 	"burger" : 0, \
													"hot_drink" : 0,
													"cold_food" : 0,
													"cold_drink" : 0 },
								"total_profit" : 0.0,
								"total_profit_type" : { 	"burger" : 0, \
															"hot_drink" : 0,
															"cold_food" : 0,
															"cold_drink" : 0 },
								"total_turnover" : 0.0,
								"total_turnover_type" : { 	"burger" : 0, \
															"hot_drink" : 0,
															"cold_food" : 0,
															"cold_drink" : 0 }	}
		
		if os.path.exists(pickle_jar):
			with open(pickle_jar, "rb") as read_fp:
				try:
					while True:
						item = pickle.load(read_fp)

						if not item["hour"] in report_data:
							report_data[item["hour"]] = { 	"burger" : { "count" : 0, "profit" : 0.0, "turnover" : 0.0 }, \
															"hot_drink" : { "count" : 0, "profit" : 0.0, "turnover" : 0.0 },
															"cold_food" : { "count" : 0, "profit" : 0.0, "turnover" : 0.0 },
															"cold_drink" : { "count" : 0, "profit" : 0.0, "turnover" : 0.0 },
															"profit" : 0.0, "turnover" : 0.0 }

						price, cost = self.item_profit(item, config)
						profit = price-cost
						report_data[item["hour"]][item["type"]]["count"] += 1
						report_data[item["hour"]][item["type"]]["profit"] += profit
						report_data[item["hour"]]["profit"] += profit
						report_data[item["hour"]][item["type"]]["turnover"] += price
						report_data[item["hour"]]["turnover"] += price

						report_meta_data["total_profit"] += profit
						report_meta_data["total_profit_type"][item["type"]] += profit
						report_meta_data["total_turnover"] += price
						report_meta_data["total_turnover_type"][item["type"]] += price

						if report_data[item["hour"]][item["type"]]["count"] > report_meta_data["max_count"][item["type"]]:
							report_meta_data["max_count"][item["type"]] = report_data[item["hour"]][item["type"]]["count"]

						if report_data[item["hour"]][item["type"]]["profit"] > report_meta_data["max_profit"]:
							report_meta_data["max_profit"] = report_data[item["hour"]][item["type"]]["profit"]

						if report_data[item["hour"]]["profit"] > report_meta_data["max_hour_profit"]:
							report_meta_data["max_hour_profit"] = report_data[item["hour"]]["profit"]

						if report_data[item["hour"]][item["type"]]["turnover"] > report_meta_data["max_turnover"]:
							report_meta_data["max_turnover"] = report_data[item["hour"]][item["type"]]["turnover"]

						if report_data[item["hour"]]["turnover"] > report_meta_data["max_hour_turnover"]:
							report_meta_data["max_hour_turnover"] = report_data[item["hour"]]["turnover"]

				except EOFError:
					pass

		return [ report_data, report_meta_data ]
