#!/usr/bin/python3

#This file is part of Nidaba.
#
#Nidaba is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
#
#Nidaba is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
#You should have received a copy of the GNU General Public License along with Nidaba. If not, see <https://www.gnu.org/licenses/>. 

import cherrypy

import nidaba_archive

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

class nidaba_queue(object):

	def __init__(self, archive):
		self.m_archive = archive
		self.m_griddle_queue = []
		self.m_hot_drinks_queue = []
		self.m_dequeue_length = 10
		self.m_burgers_served = 0
		self.m_cobs_served = 0

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def enqueue_order(self, order):
	
		self.m_archive.archive_order(order)

		griddle_order = [ item for item in order if item["type"] == "burger" or (item["type"] == "cold_food" and item["cold_food_type"] == "wedges")]
		hot_drinks_order = [ item for item in order if item["type"] == "hot_drink"]

		if len(griddle_order) > 0:
			self.m_griddle_queue.append(griddle_order)

		if len(hot_drinks_order) > 0:
			self.m_hot_drinks_queue.append(hot_drinks_order)

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def dequeue(self, queue, peek):
		orders = []
		for i in range(0, self.m_dequeue_length):
			orders.append([])

		if peek == False:
			if len(queue) > 0:
				for item in queue[0]:
					if item["type"] == "burger":
						self.m_burgers_served += {\
							"single" : 1,
							"double" : 2,
							"cheezly" : 1,
							"double_cheezly" : 2 }.get(item["burger_type"], None)
						self.m_cobs_served += 1

				queue[0:1] = []
	
		orders[0:0] = queue[0:self.m_dequeue_length]
		orders[self.m_dequeue_length:] = []

		return orders

	def dequeue_griddle(self, argv):
		return self.dequeue(self.m_griddle_queue, argv[0])

	def dequeue_hot_drinks(self, argv):
		return self.dequeue(self.m_hot_drinks_queue, argv[0])

#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#=#

	def set_kitchen_burger_delivery(self, argv):
		self.m_burgers_served = 0
		
	def set_kitchen_cob_delivery(self, argv):
		self.m_cobs_served = 0

	def get_kitchen_report(self, argv):
		kitchen_report = {}
		kitchen_report["burgers_served"] = self.m_burgers_served
		kitchen_report["cobs_served"] = self.m_cobs_served

		return kitchen_report
