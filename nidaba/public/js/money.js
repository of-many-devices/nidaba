//jshint sub:true
var money =
{
	init: function()
	{
		var order_number_str = window.localStorage.getItem("order_number");
		if (order_number_str == null)
		{
			order_number_str = "0";
		}
		document.getElementById("order_number").value = order_number_str;

		document.getElementById("classic_single_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "classic", "burger_type" : "single", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("classic_double_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "classic", "burger_type" : "double", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("classic_cheezly_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "classic", "burger_type" : "cheezly", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("classic_double_cheezly_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "classic", "burger_type" : "double_cheezly", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("vlt_single_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "vlt", "burger_type" : "single", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("vlt_cheezly_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "vlt", "burger_type" : "cheezly", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("hemp_single_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "hemp", "burger_type" : "single", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("hemp_double_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "hemp", "burger_type" : "double", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("hemp_cheezly_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "hemp", "burger_type" : "cheezly", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("hemp_double_cheezly_burger").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "hemp", "burger_type" : "double_cheezly", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("gluten_free_meal").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "burger", "burger_mix_type" : "gluten_free", "burger_type" : "single", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("wedges").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_food", "cold_food_type" : "wedges", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("cake").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_food", "cold_food_type" : "cake", "extras" : [] });
			}.bind(this)
		);

		document.getElementById("no_onions").addEventListener('click',
			function(event)
			{
				this.add_extra("No onions");
			}.bind(this)
		);
		document.getElementById("no_salad").addEventListener('click',
			function(event)
			{
				this.add_extra("No salad");
			}.bind(this)
		);
		document.getElementById("no_lettuce").addEventListener('click',
			function(event)
			{
				this.add_extra("No lettuce");
			}.bind(this)
		);
		document.getElementById("no_cucumber").addEventListener('click',
			function(event)
			{
				this.add_extra("No cucum.");
			}.bind(this)
		);
		document.getElementById("no_tomato").addEventListener('click',
			function(event)
			{
				this.add_extra("No tomato");
			}.bind(this)
		);
		document.getElementById("ask_me_0").addEventListener('click',
			function(event)
			{
				this.add_extra("Ask me");
			}.bind(this)
		);

		document.getElementById("tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("coffee").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "coffee", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("hot_chocolate").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "hot_chocolate", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("chamomile_tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "chamomile_tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("peppermint_tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "peppermint_tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("berry_tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "berry_tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("chai").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "chai", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("no_onions").addEventListener('click',
			function(event)
			{
				this.add_extra("No onions");
			}.bind(this)
		);
		document.getElementById("mushrooms").addEventListener('click',
			function(event)
			{
				this.add_extra("Shrooms");
			}.bind(this)
		);
		document.getElementById("rasher").addEventListener('click',
			function(event)
			{
				this.add_extra("Rasher");
			}.bind(this)
		);
		document.getElementById("earl_grey").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "earl_grey", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("green_tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "green_tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("rooibos").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "rooibos", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("decaf_coffee").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "decaf_coffee", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("nettle_tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "nettle_tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("decaf_tea").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "hot_drink", "hot_drink_type" : "decaf_tea", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("can").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_drink", "cold_drink_type" : "can", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("carton").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_drink", "cold_drink_type" : "carton", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("bottle").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_drink", "cold_drink_type" : "bottle", "extras" : [] });
			}.bind(this)
		);

		document.getElementById("soya").addEventListener('click',
			function(event)
			{
				this.add_extra("Soya");
			}.bind(this)
		);
		document.getElementById("oat").addEventListener('click',
			function(event)
			{
				this.add_extra("Oat");
			}.bind(this)
		);
		document.getElementById("rice").addEventListener('click',
			function(event)
			{
				this.add_extra("Rice");
			}.bind(this)
		);
		document.getElementById("coconut").addEventListener('click',
			function(event)
			{
				this.add_extra("Coconut");
			}.bind(this)
		);
		document.getElementById("almond").addEventListener('click',
			function(event)
			{
				this.add_extra("Almond");
			}.bind(this)
		);
		document.getElementById("hemp").addEventListener('click',
			function(event)
			{
				this.add_extra("Hemp");
			}.bind(this)
		);
		document.getElementById("sugar").addEventListener('click',
			function(event)
			{
				this.add_extra("Sugar");
			}.bind(this)
		);
		document.getElementById("ask_me_1").addEventListener('click',
			function(event)
			{
				this.add_extra("Ask me");
			}.bind(this)
		);
		document.getElementById("pasty").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_food", "cold_food_type" : "pasty", "extras" : [] });
			}.bind(this)
		);
		document.getElementById("indian").addEventListener('click',
			function(event)
			{
				this.add({ 	"type" : "cold_food", "cold_food_type" : "indian", "extras" : [] });
			}.bind(this)
		);

		document.getElementById("next_customer_button").disabled = true;
		document.getElementById("delete_button").disabled = true;

		io.exec(["get_config"], this.load_config_cb.bind(this));	
	},
	load_config_cb: function(server_obj)
	{
		if(server_obj !== null)
		{
			this.config = server_obj;
		}
	},
	
	current_item: {},
	order: [],
	order_str: "",

	add: function(item)
	{
		if(this.order.length == 0)
		{
			document.getElementById("next_customer_button").disabled = this.next_customering;
			document.getElementById("delete_button").disabled = false;
		}

		if(Object.keys(this.current_item).length != 0)
		{
			this.order.push(this.current_item);
		}
		this.current_item = item;
		this.update();
	},

	add_extra: function(extra)
	{
		if(utils.array_contains(this.current_item["extras"], extra) === false)
		{
			this.current_item["extras"].push(extra);
			this.update();
		}
	},
	
	del: function()
	{
		if(Object.keys(this.current_item).length != 0)
		{
			this.current_item = {};
		}
		else
		{
			if(this.order.length > 0)
			{
				this.order.pop();
			}
		}

		if(this.order.length == 0)
		{
			document.getElementById("next_customer_button").disabled = true;
			document.getElementById("delete_button").disabled = true;
		}

		this.update();
	},
	
	next_customering: false,
	
	next_customer: function()
	{
		if(Object.keys(this.current_item).length != 0)
		{
			this.order.push(this.current_item);
			this.current_item = {};
		}

		var order_number = parseInt(document.getElementById("order_number").value);
		for (var i = 0; i < this.order.length; i++)
		{
			this.order[i]["order_number"] = order_number;
		}

		this.order.splice(0, 0, "put_order");
		io.exec(this.order, money.next_customer_cb.bind(this));
	
		this.order = [];
		document.getElementById("next_customer_button").disabled = true;
		document.getElementById("delete_button").disabled = true;
		this.update();

		this.next_customering = true;
	},
	next_customer_cb: function()
	{
		var order_number = parseInt(document.getElementById("order_number").value) + 1;
		var order_number_str = order_number.toString();
		document.getElementById("order_number").value = order_number_str;
		window.localStorage.setItem("order_number", order_number_str);

		document.getElementById("next_customer_button").disabled = document.getElementById("delete_button").disabled;
		this.next_customering = false;
	},

	config: { "price_burger_base" : 4.0, "price_burger_extra" : 0.9, "price_hot_drink" : 2.0 },

	item_price: function(item)
	{
		var price;
		var extra_string;
		
		if(item["type"] == "burger")
		{
			switch(item["burger_type"])
			{
				case "single":
				{
					price = this.config["price_burger_base"];
					break;
				}
				case "cheezly":
				{
					price = this.config["price_burger_base"] + this.config["price_burger_extra"];
					break;
				}
				case "double":
				{
					price = this.config["price_burger_base"] + (2 * this.config["price_burger_extra"]);
					break;
				}
				case "double_cheezly":
				{
					price = this.config["price_burger_base"] + (3 * this.config["price_burger_extra"]);
					break;
				}
				default:
				{
					price = 0;
					break;
				}
			}

			var burger_str = item["burger_mix_type"]+" "+item["burger_type"]+" burger ";
			if(item["extras"].length > 0)
			{
				extra_string = "("+item["extras"].join()+")";
				burger_str += extra_string;
			}

			if(item["extras"].indexOf("Shrooms") > -1)
			{
				price += this.config["price_burger_extra"];
			}
			if(item["extras"].indexOf("Rasher") > -1)
			{
				price += this.config["price_burger_extra"];
			}

			burger_str = burger_str.charAt(0).toUpperCase() + burger_str.slice(1);
			this.order_str += burger_str;
		}
		else if(item["type"] == "hot_drink")
		{
			price = this.config["price_hot_drink"];

			var hot_drink_str = item["hot_drink_type"]+" ";
			if(item["extras"].length > 0)
			{
				extra_string = "("+item["extras"].join()+")";
				hot_drink_str += extra_string;
			}

			hot_drink_str = hot_drink_str.charAt(0).toUpperCase() + hot_drink_str.slice(1);
			this.order_str += hot_drink_str;
		}
		else if(item["type"] == "cold_food")
		{
			switch(item["cold_food_type"])
			{
				case "wedges":
				case "pasty":
				{
					price = this.config["price_cold_food_pasty"];
					break;
				}
				case "indian":
				{
					price = this.config["price_cold_food_indian"];
					break;
				}
				case "cake":
				{
					price = this.config["price_cold_food_cake"];
					break;
				}
				default:
				{
					price = 0;
					break;
				}
			}
			
			var cold_food_str = item["cold_food_type"]+" ";
			if(item["extras"].length > 0)
			{
				extra_string = "("+item["extras"].join()+")";
				cold_food_str += extra_string;
			}

			cold_food_str = cold_food_str.charAt(0).toUpperCase() + cold_food_str.slice(1);
			this.order_str += cold_food_str;
		}
		else if(item["type"] == "cold_drink")
		{
			switch(item["cold_drink_type"])
			{
				case "can":
				{
					price = this.config["price_cold_drink_can"];
					break;
				}
				case "carton":
				{
					price = this.config["price_cold_drink_carton"];
					break;
				}
				case "bottle":
				{
					price = this.config["price_cold_drink_bottle"];
					break;
				}
				default:
				{
					price = 0;
					break;
				}
			}
			
			var cold_drink_str = item["cold_drink_type"]+" ";
			if(item["extras"].length > 0)
			{
				extra_string = "("+item["extras"].join()+")";
				cold_drink_str += extra_string;
			}

			cold_drink_str = cold_drink_str.charAt(0).toUpperCase() + cold_drink_str.slice(1);
			this.order_str += cold_drink_str;
		}
		else
		{
			price = 0.0;
		}

		this.order_str += "<br>";

		return(price);
	},

	update: function()
	{
		var price = 0;
		this.order_str = "";
		
		for (var i = 0; i < this.order.length; i++)
		{
			price += this.item_price(this.order[i]);
		}
		price += this.item_price(this.current_item);

		document.getElementById("price").innerHTML = "<h1>£ " + price.toFixed(2)+"</h1>";
		document.getElementById("order").innerHTML = this.order_str;
	},
};
