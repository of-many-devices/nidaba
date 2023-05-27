var kitchen =
{
	timer: null,

	update: function()
	{
		io.exec(["get_kitchen_report"], kitchen.update_cb);	
	},
	update_cb: function(server_obj)
	{
		document.getElementById("burgers_served").innerHTML = "<h1>"+server_obj["burgers_served"]+"</h1><h2>Burgers served since last delivery...</h2>";
		document.getElementById("cobs_served").innerHTML = "<h1>"+server_obj["cobs_served"]+"</h1><h2>Cobs served since last delivery...</h2>";

		clearTimeout(kitchen.timer);
		kitchen.timer = setTimeout(kitchen.update, 32000);
	},
	
	burgers_delivered: function()
	{
		document.getElementById("burgers_delivered_button").disabled = true;
		io.exec(["set_kitchen_burger_delivery"], kitchen.burgers_delivered_cb);
	},
	burgers_delivered_cb: function(server_obj)
	{
		document.getElementById("burgers_delivered_button").disabled = false;
		kitchen.update();
	},

	cobs_delivered: function()
	{
		document.getElementById("cobs_delivered_button").disabled = true;
		io.exec(["set_kitchen_cob_delivery"], kitchen.cobs_delivered_cb);
	},
	cobs_delivered_cb: function(server_obj)
	{
		document.getElementById("cobs_delivered_button").disabled = false;
		kitchen.update();
	},
};