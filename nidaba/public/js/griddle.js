var griddle = 
{
	timer: null,

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
					queue_full = false;
				}
				else
				{
					document.getElementById("next_order_button").disabled = false;
				}
				
				for (var j = 0; (j < server_obj[i].length) && (j < 10); j++)
				{
					document.getElementById("o_"+j+"_"+i).className = server_obj[i][j]["burger_mix_type"]+" order_item";
					document.getElementById("o_"+j+"_"+i).style.backgroundImage = "url('img/"+server_obj[i][j]["burger_type"]+".png')";
				
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
			griddle.timer = setTimeout(function(){griddle.get_griddle(true)}, 9000);
		}
	},
};

