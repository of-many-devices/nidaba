//jshint sub:true
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
					mode = utils.get_url_vars()["mode"];
					window.location = "reports?date="+date+"&scale=total&mode="+mode;
				}
			);
			document.getElementById("radio_scale_total").addEventListener('click',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					mode = utils.get_url_vars()["mode"];
					window.location = "reports?date="+date+"&scale=total&mode="+mode;
				}
			);
			document.getElementById("radio_scale_type").addEventListener('touchstart',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					mode = utils.get_url_vars()["mode"];
					window.location = "reports?date="+date+"&scale=type&mode="+mode;
				}
			);
			document.getElementById("radio_scale_type").addEventListener('click',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					mode = utils.get_url_vars()["mode"];
					window.location = "reports?date="+date+"&scale=type&mode="+mode;
				}
			);
			document.getElementById("radio_mode_profit").addEventListener('touchstart',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					scale = utils.get_url_vars()["scale"];
					window.location = "reports?date="+date+"&scale="+scale+"&mode=profit";
				}
			);
			document.getElementById("radio_mode_profit").addEventListener('click',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					scale = utils.get_url_vars()["scale"];
					window.location = "reports?date="+date+"&scale="+scale+"&mode=profit";
				}
			);
			document.getElementById("radio_mode_turnover").addEventListener('touchstart',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					scale = utils.get_url_vars()["scale"];
					window.location = "reports?date="+date+"&scale="+scale+"&mode=turnover";
				}
			);
			document.getElementById("radio_mode_turnover").addEventListener('click',
				function(event)
				{
					date = utils.get_url_vars()["date"];
					scale = utils.get_url_vars()["scale"];
					window.location = "reports?date="+date+"&scale="+scale+"&mode=turnover";
				}
			);
		}
		setTimeout(reports.update, 560000);
	},
	
	update: function()
	{
		date = utils.get_url_vars()["date"];
		scale = utils.get_url_vars()["scale"];
		mode = utils.get_url_vars()["mode"];
		location.replace("reports?date="+date+"&scale="+scale+"&mode="+mode);
	},

	download: function()
	{
		date = utils.get_url_vars()["date"];
		mode = utils.get_url_vars()["mode"];
		window.open("reports_pdf?date="+date+"&mode="+mode);
	},
};
