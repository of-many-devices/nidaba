#!/usr/bin/python3

import os.path
import json
import cherrypy
import threading
import subprocess

import nidaba_archive
import nidaba_queue

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

class nidaba(object):

	def __init__(self, archive, queue):
		self.m_archive = archive
		self.m_queue = queue
		self.m_io_lock = threading.Lock()

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#
	
	@cherrypy.expose
	def io(self):
		content_length_bytes = cherrypy.request.headers['Content-Length']
		client_str = cherrypy.request.body.read(int(content_length_bytes))
		client_obj = json.loads(client_str.decode())
	
		server_obj = self.io_parse(client_obj)

		return json.dumps(server_obj).encode()

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	@cherrypy.expose
	def reports(self, date="", scale="total", print_view="no", mode="turnover"):
		doc = ""
		report_data, report_meta_data = self.io_parse(["get_report", date])
		config = self.io_parse(["get_config", date])

		if not scale in ["total", "type"]:
			scale = "total"

		if not mode in ["profit", "turnover"]:
			mode = "turnover"

		with open("./private/reports_top.html", "rb") as read_fp:
			doc += read_fp.read().decode()

		if print_view == "no":
			doc += \
"""	<link rel="stylesheet" type="text/css" href="static/css/main.css">
	<link rel="stylesheet" type="text/css" href="static/css/reports.css">
</head>

<body>"""
		else:
			doc += \
"""	<link rel="stylesheet" type="text/css" href="static/css/reports_print.css">
</head>

<body>"""
		if print_view != "basic":

			doc += \
"""	<div id="header">"""
			doc += '<div id="event_title"><br><span id="title_1">{0} : {1}</span><span id="title_2"> [{2}]</span><span id="title_3"> : £{3:.2f}</span></div>'.format(config["event_name"], report_meta_data["day"], report_meta_data["date"], report_meta_data["total_"+mode])

			doc += \
"""	</div>
	<div id="charts">"""

			### times

			doc += \
"""		<div id="chart_time">
			<div class="chart_header">
				<h2>Time</h2>
			</div>
			<div class="chart_data" id="chart_data_time">"""

			for hour in sorted(report_data.keys()):
				doc += '<div class="entry"><div class="bar_value_time">[{0}-{1}]</div></div>'.format( \
					hour,
					hour+1)

			doc += \
"""			</div>
		</div>"""

			### total profit/turnover

			doc += '<div class="chart" id="chart_{0}"><div class="chart_header"><h2>Total {0}</h2></div><div class="chart_data" id="chart_data_{0}">'.format(mode)

			for hour in sorted(report_data.keys()):
				try:
					width = int((report_data[hour][mode]*100)/report_meta_data["total_"+mode])
				except ZeroDivisionError:
					width = 0

				doc += '<div class="entry"><div style="width:{0}%" class="bar" id="cdp_{1}"></div><div class="bar_value"><div class="bar_value_{4}" id="cdp_{1}_{4}">£{3:.2f}</div></div></div>'.format( \
					width,
					hour,
					hour+1,
					report_data[hour][mode],
					mode)

			doc += \
"""			</div>
		</div>"""

			### burgers

			doc += \
"""		<div class="chart" id="chart_burgers">
			<div class="chart_header">
				<h2>Burgers</h2>
			</div>
			<div class="chart_data" id="chart_data_burgers">"""

			for hour in sorted(report_data.keys()):
				try:
					if scale == "total":
						width = int((report_data[hour]["burger"][mode]*100)/report_meta_data["total_"+mode])
					else:
						width = int((report_data[hour]["burger"][mode]*100)/report_meta_data["total_"+mode+"_type"]["burger"])
				except ZeroDivisionError:
					width = 0

				doc += '<div class="entry"><div style="width:{0}%" class="bar" id="cdb_{1}"></div><div class="bar_value"><div class="bar_value_count" id="cdb_{1}_count">{3:6d} : </div><div class="bar_value_{5}" id="cdb_{1}_{5}">£{4:.2f}</div></div></div>'.format( \
					width,
					hour,
					hour+1,
					report_data[hour]["burger"]["count"],
					report_data[hour]["burger"][mode],
					mode)

			doc += \
"""			</div>
		</div>"""

			### hot drinks

			doc += \
"""		<div class="chart" id="chart_hot_drinks">
			<div class="chart_header">
				<h2>Hot Drinks</h2>
			</div>
			<div class="chart_data" id="chart_data_hot_drinks">"""

			for hour in sorted(report_data.keys()):
				try:
					if scale == "total":
						width = int((report_data[hour]["hot_drink"][mode]*100)/report_meta_data["total_"+mode])
					else:
						width = int((report_data[hour]["hot_drink"][mode]*100)/report_meta_data["total_"+mode+"_type"]["hot_drink"])
				except ZeroDivisionError:
					width = 0

				doc += '<div class="entry"><div style="width:{0}%" class="bar" id="cdhd_{1}"></div><div class="bar_value"><div class="bar_value_count" id="cdhd_{1}_count">{3:6d} : </div><div class="bar_value_{5}" id="cdhd_{1}_{5}">£{4:.2f}</div></div></div>'.format( \
					width,
					hour,
					hour+1,
					report_data[hour]["hot_drink"]["count"],
					report_data[hour]["hot_drink"][mode],
					mode)

			doc += \
"""			</div>
		</div>"""

			### cold food

			doc += \
"""		<div class="chart" id="chart_cold_food">
			<div class="chart_header">
				<h2>Cold Food</h2>
			</div>
			<div class="chart_data" id="chart_data_cold_food">"""

			for hour in sorted(report_data.keys()):
				try:
					if scale == "total":
						width = int((report_data[hour]["cold_food"][mode]*100)/report_meta_data["total_"+mode])
					else:
						width = int((report_data[hour]["cold_food"][mode]*100)/report_meta_data["total_"+mode+"_type"]["cold_food"])
				except ZeroDivisionError:
					width = 0

				doc += '<div class="entry"><div style="width:{0}%" class="bar" id="cdcf_{1}"></div><div class="bar_value"><div class="bar_value_count" id="cdcf_{1}_count">{3:6d} : </div><div class="bar_value_{5}" id="cdcf_{1}_{5}">£{4:.2f}</div></div></div>'.format( \
					width,
					hour,
					hour+1,
					report_data[hour]["cold_food"]["count"],
					report_data[hour]["cold_food"][mode],
					mode)

			doc += \
"""			</div>
		</div>"""

			### cold drinks

			doc += \
"""		<div class="chart" id="chart_cold_drinks">
			<div class="chart_header">
				<h2>Cold Drinks</h2>
			</div>
			<div class="chart_data" id="chart_data_cold_drinks">"""

			for hour in sorted(report_data.keys()):
				try:
					if scale == "total":
						width = int((report_data[hour]["cold_drink"][mode]*100)/report_meta_data["total_"+mode])
					else:
						width = int((report_data[hour]["cold_drink"][mode]*100)/report_meta_data["total_"+mode+"_type"]["cold_drink"])
				except ZeroDivisionError:
					width = 0

				doc += '<div class="entry"><div style="width:{0}%" class="bar" id="cdcd_{1}"></div><div class="bar_value"><div class="bar_value_count" id="cdcd_{1}_count">{3:6d} : </div><div class="bar_value_{5}" id="cdcd_{1}_{5}">£{4:.2f}</div></div></div>'.format( \
					width,
					hour,
					hour+1,
					report_data[hour]["cold_drink"]["count"],
					report_data[hour]["cold_drink"][mode],
					mode)

			doc += \
"""			</div>
		</div>"""

		###

		else:

			doc += \
"""	<div id="header_basic">"""
			doc += '<div id="event_title"><br><span id="title_1">{0} : {1}</span><span id="title_2"> [{2}]</span><span id="title_3"> : £{3:.2f}</span></div>'.format(config["event_name"], report_meta_data["day"], report_meta_data["date"], report_meta_data["total_"+mode])


			doc += \
"""	</div>
	<div id="charts_basic">"""


			doc += '<br><br><table class="center"><tr><th>Time</th><th>Total {0}</th><th>Burgers</th><th>Hot Drinks</th><th>Cold Food</th><th>Cold Drinks</th></tr>'.format(mode)
			for hour in sorted(report_data.keys()):
				doc += '<tr><td>[{0}-{1}]</td><td>£{2:.2f}</td><td>{3:6d} : £{4:.2f}</td><td>{5:6d} : £{6:.2f}</td><td>{7:6d} : £{8:.2f}</td><td>{9:6d} : £{10:.2f}</td></tr>'.format( \
					hour,
					hour+1,
					report_data[hour][mode],
					report_data[hour]["burger"]["count"],
					report_data[hour]["burger"][mode],
					report_data[hour]["hot_drink"]["count"],
					report_data[hour]["hot_drink"][mode],
					report_data[hour]["cold_food"]["count"],
					report_data[hour]["cold_food"][mode],
					report_data[hour]["cold_drink"]["count"],
					report_data[hour]["cold_drink"][mode])

			doc += \
"""		</table>"""

		###
			
		doc += \
"""	</div>"""

		if print_view == "no":
			doc += \
"""	<div id="controls">"""

			if scale == "total":
				doc += \
"""		<br><div id="radio_scale_total" class="radio_selected">
		<br>Scale: Total
		</div>
		<div id="radio_scale_type" class="radio_not_selected">
		<br>Scale: By type"""

			else:
				doc += \
"""		<br><div id="radio_scale_total" class="radio_not_selected">
		<br>Scale: Total
		</div>
		<div id="radio_scale_type" class="radio_selected">
		<br>Scale: By type"""

			doc += \
"""		</div>"""

			if mode == "profit":
				doc += \
"""		<div id="radio_mode_profit" class="radio_selected">
		<br>Mode: Profit
		</div>
		<div id="radio_mode_turnover" class="radio_not_selected">
		<br>Mode: Turnover"""

			else:
				doc += \
"""		<div id="radio_mode_profit" class="radio_not_selected">
		<br>Mode: Profit
		</div>
		<div id="radio_mode_turnover" class="radio_selected">
		<br>Mode: Turnover"""

			doc += \
"""		</div>
		<button type="button" id="download_button" onclick="reports.download()">Download</button>
	</div>"""

		with open("./private/reports_bottom.html", "rb") as read_fp:
			doc += read_fp.read().decode()
			
		return doc

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	@cherrypy.expose
	def reports_pdf(self, date="", mode="turnover"):
		date = str(self.m_archive.get_sanitized_date([ date ]))

		if not mode in ["profit", "turnover"]:
			mode = "profit"

		doc = ""
		subprocess.call(["xvfb-run", "--", "wkhtmltopdf", "127.0.0.1:8080/reports?date={0}&print_view=basic&mode={1}".format(date, mode), "public/reports/{1}_{0}.pdf".format(date, mode)])

		doc += \
"""<!doctype html>
<html>
<head>"""
		doc += '<meta http-equiv="refresh" content="0; url=static/reports/{1}_{0}.pdf" />'.format(date, mode)
		
		doc += \
"""</head>
</html>"""
		return doc

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def one_at_a_time(f):
		def wrapped_f(class_instance, client_obj):
			with class_instance.m_io_lock:
				return f(class_instance, client_obj)
		return wrapped_f

	def io_error(self, client_obj):
		cherrypy.log("unrecognized client request")

	@one_at_a_time
	def io_parse(self, client_obj):
		return {\
			"put_order": self.m_queue.enqueue_order,

			"get_griddle": self.m_queue.dequeue_griddle,

			"get_hot_drinks": self.m_queue.dequeue_hot_drinks,

			"set_kitchen_burger_delivery": self.m_queue.set_kitchen_burger_delivery,
			"set_kitchen_cob_delivery": self.m_queue.set_kitchen_cob_delivery,
			"get_kitchen_report": self.m_queue.get_kitchen_report,

			"get_config": self.m_archive.get_config,
			"put_config": self.m_archive.archive_config,

			"get_report": self.m_archive.get_report,

			"set_time": self.m_archive.set_time,
			"get_time": self.m_archive.get_time,

		}.get(client_obj[0], self.io_error)(client_obj[1:])

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

if(__name__ == '__main__'):
	conf = \
	{
		'global':
		{
			'server.socket_host': "0.0.0.0"
		},
		'/':
		{
			'tools.sessions.on': True,
			'tools.staticdir.root': os.path.abspath(os.getcwd())
		},
		'/static':
		{
			'tools.staticdir.on': True,
			'tools.staticdir.dir': './public'
		}
	}
	archive = nidaba_archive.nidaba_archive()
	cherrypy.quickstart(nidaba(archive, nidaba_queue.nidaba_queue(archive)), '/', conf)
