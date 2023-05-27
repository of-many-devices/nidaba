var config = 
{
	load: function()
	{
		document.getElementById("save_button").disabled = true;
		io.exec(["get_config"], config.load_cb);	
	},
	load_cb: function(server_obj)
	{
		document.getElementById("save_button").disabled = false;
		if(server_obj !== null)
		{
			document.getElementById("event_name").value = server_obj["event_name"];

			document.getElementById("price_burger_base").value = server_obj["price_burger_base"].toFixed(2);
			document.getElementById("price_burger_extra").value = server_obj["price_burger_extra"].toFixed(2);
			document.getElementById("price_hot_drink").value = server_obj["price_hot_drink"].toFixed(2);

			document.getElementById("price_cold_drink_can").value = server_obj["price_cold_drink_can"].toFixed(2);
			document.getElementById("price_cold_drink_carton").value = server_obj["price_cold_drink_carton"].toFixed(2);
			document.getElementById("price_cold_drink_bottle").value = server_obj["price_cold_drink_bottle"].toFixed(2);

			document.getElementById("price_cold_food_pasty").value = server_obj["price_cold_food_pasty"].toFixed(2);
			document.getElementById("price_cold_food_indian").value = server_obj["price_cold_food_indian"].toFixed(2);
			document.getElementById("price_cold_food_cake").value = server_obj["price_cold_food_cake"].toFixed(2);

			document.getElementById("cost_burger_base").value = server_obj["cost_burger_base"].toFixed(2);
			document.getElementById("cost_burger_extra").value = server_obj["cost_burger_extra"].toFixed(2);
			document.getElementById("cost_hot_drink").value = server_obj["cost_hot_drink"].toFixed(2);

			document.getElementById("cost_cold_drink_can").value = server_obj["cost_cold_drink_can"].toFixed(2);
			document.getElementById("cost_cold_drink_carton").value = server_obj["cost_cold_drink_carton"].toFixed(2);
			document.getElementById("cost_cold_drink_bottle").value = server_obj["cost_cold_drink_bottle"].toFixed(2);

			document.getElementById("cost_cold_food_pasty").value = server_obj["cost_cold_food_pasty"].toFixed(2);
			document.getElementById("cost_cold_food_indian").value = server_obj["cost_cold_food_indian"].toFixed(2);
			document.getElementById("cost_cold_food_cake").value = server_obj["cost_cold_food_cake"].toFixed(2);

		}
	},

	save: function()
	{
		var client_obj = {};
		client_obj["event_name"] = document.getElementById("event_name").value;

		client_obj["price_burger_base"] = parseFloat(document.getElementById("price_burger_base").value);
		client_obj["price_burger_extra"] = parseFloat(document.getElementById("price_burger_extra").value);
		client_obj["price_hot_drink"] = parseFloat(document.getElementById("price_hot_drink").value);

		client_obj["price_cold_drink_can"] = parseFloat(document.getElementById("price_cold_drink_can").value);
		client_obj["price_cold_drink_carton"] = parseFloat(document.getElementById("price_cold_drink_carton").value);
		client_obj["price_cold_drink_bottle"] = parseFloat(document.getElementById("price_cold_drink_bottle").value);

		client_obj["price_cold_food_pasty"] = parseFloat(document.getElementById("price_cold_food_pasty").value);
		client_obj["price_cold_food_indian"] = parseFloat(document.getElementById("price_cold_food_indian").value);
		client_obj["price_cold_food_cake"] = parseFloat(document.getElementById("price_cold_food_cake").value);

		client_obj["cost_burger_base"] = parseFloat(document.getElementById("cost_burger_base").value);
		client_obj["cost_burger_extra"] = parseFloat(document.getElementById("cost_burger_extra").value);
		client_obj["cost_hot_drink"] = parseFloat(document.getElementById("cost_hot_drink").value);

		client_obj["cost_cold_drink_can"] = parseFloat(document.getElementById("cost_cold_drink_can").value);
		client_obj["cost_cold_drink_carton"] = parseFloat(document.getElementById("cost_cold_drink_carton").value);
		client_obj["cost_cold_drink_bottle"] = parseFloat(document.getElementById("cost_cold_drink_bottle").value);

		client_obj["cost_cold_food_pasty"] = parseFloat(document.getElementById("cost_cold_food_pasty").value);
		client_obj["cost_cold_food_indian"] = parseFloat(document.getElementById("cost_cold_food_indian").value);
		client_obj["cost_cold_food_cake"] = parseFloat(document.getElementById("cost_cold_food_cake").value);
		
		io.exec(["put_config", client_obj], config.save_cb);
		document.getElementById("save_button").disabled = true;
	},
	save_cb: function()
	{
		document.getElementById("save_button").disabled = false;
		
		document.getElementById("toast").innerHTML = "Configuration saved...";
		setTimeout(config.toast_cb, 1000);
	},

	toast_cb: function()
	{
		document.getElementById("toast").innerHTML = "";
	}
};