//jshint sub:true
var title = 
{
	init: function()
	{
		document.getElementById("money").addEventListener('touchstart',
			function(event)
			{
				window.location = "money.html";
			}
		);
		document.getElementById("griddle").addEventListener('touchstart',
			function(event)
			{
				window.location = "griddle.html";
			}
		);
		document.getElementById("hot_drinks").addEventListener('touchstart',
			function(event)
			{
				window.location = "hot_drinks.html";
			}
		);
		document.getElementById("kitchen").addEventListener('touchstart',
			function(event)
			{
				window.location = "kitchen.html";
			}
		);
		document.getElementById("reports").addEventListener('touchstart',
			function(event)
			{
				window.location = "../reports";
			}
		);
		document.getElementById("config").addEventListener('touchstart',
			function(event)
			{
				window.location = "config.html";
			}
		);

		var d = new Date();
		var time_seconds_since_epoch = d.getTime() / 1000;
		
		io.exec(["set_time", time_seconds_since_epoch], title.init_set_time_cb);
	},

	init_set_time_cb: function()
	{
		io.exec(["get_time"], title.init_get_time_cb);
	},

	init_get_time_cb: function(server_obj)
	{
		if(server_obj !== null)
		{
			document.getElementById("server_status").innerHTML = "System time set to: <br>"+server_obj["time_string"];
		}
	},
};
