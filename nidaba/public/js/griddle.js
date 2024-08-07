var griddle = 
{
	timer: null,

	init: function()
	{
		document.addEventListener("keydown", function(event)
		{
			griddle.get_griddle(false);
		});

		griddle.get_griddle(true);
	},
	
	get_griddle: function(peek)
	{
		document.getElementById("next_order_button").disabled = true;
		io.exec(["get_griddle", peek], griddle.get_griddle_cb);	
	},

	get_griddle_cb: function(server_obj)
	{
		var queue_full = false;
		
		if(server_obj !== null)
		{
			if(server_obj.length > 0)
			{
				queue_full = true;
			}

			for (var i = 0; i < server_obj.length; i++)
			{
				if(server_obj[i].length == 0)
				{
					document.getElementById("on_"+i).innerHTML = "";
					queue_full = false;
				}
				else
				{
					document.getElementById("on_"+i).innerHTML = server_obj[i][0]["order_number"];
					document.getElementById("next_order_button").disabled = false;
				}

				for (var j = 0; (j < server_obj[i].length) && (j < 10); j++)
				{
					if(server_obj[i][j]["type"] == "burger")
					{
						document.getElementById("o_"+j+"_"+i).className = server_obj[i][j]["burger_mix_type"]+" order_item";
						document.getElementById("o_"+j+"_"+i).style.backgroundImage = "url('img/"+server_obj[i][j]["burger_type"]+".png')";
					}
					else if(server_obj[i][j]["type"] == "cold_food")
					{
						document.getElementById("o_"+j+"_"+i).className = "zero_mix order_item";
						document.getElementById("o_"+j+"_"+i).style.backgroundImage = "url('img/"+server_obj[i][j]["cold_food_type"]+".png')";
					}
				
					var extra_str = "<div class='blinking_extras'>";
					for (var k = 0; k < server_obj[i][j]["extras"].length; k++)
					{
						extra_str += server_obj[i][j]["extras"][k];
						extra_str += "<br>";
					}
					extra_str += "</div>";
					
					document.getElementById("o_"+j+"_"+i).innerHTML = extra_str;
				}
				for (var j = server_obj[i].length; j < 10; j++)
				{
					document.getElementById("o_"+j+"_"+i).className = "zero_mix order_item";
					document.getElementById("o_"+j+"_"+i).style.backgroundImage = "url('img/zero_burger.png')";
					document.getElementById("o_"+j+"_"+i).innerHTML = "";
				}
			}
		}

		if(queue_full == false)
		{
			clearTimeout(griddle.timer);
			griddle.timer = setTimeout(function(){griddle.get_griddle(true);}, 9000);
		}
	},
};

