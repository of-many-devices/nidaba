var reports = 
{
	init: function()
	{
		if((utils.get_url_vars()["print_view"] != "basic") && (utils.get_url_vars()["print_view"] != "yes"))
		{
			document.getElementById("radio_scale_total").addEventListener('touchstart',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					window.location = "reports?date="+date+"&scale=total_profit"
				}
			);
			document.getElementById("radio_scale_total").addEventListener('click',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					window.location = "reports?date="+date+"&scale=total_profit"
				}
			);
			document.getElementById("radio_scale_type").addEventListener('touchstart',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					window.location = "reports?date="+date+"&scale=type_profit"
				}
			);
			document.getElementById("radio_scale_type").addEventListener('click',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					window.location = "reports?date="+date+"&scale=type_profit"
				}
			);
		}
		setTimeout(reports.update, 560000);
	},
	
	update: function()
	{
		date = utils.get_url_vars()["date"];
		scale = utils.get_url_vars()["scale"];
		location.replace("reports?date="+date+"&scale="+scale);
	},

	download: function()
	{
		date = utils.get_url_vars()["date"];
		window.open("reports_pdf?date="+date);
	},
};