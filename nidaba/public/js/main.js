var utils = 
{
	array_contains: function(array, obj)
	{
		var ret_val = false;
		for (var i = 0; i < array.length; i++)
		{
			if (array[i] === obj)
			{
				ret_val = true;
			}
		}
		return ret_val;
	},

	get_url_vars: function()
	{
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; });
		return vars;
	},
}
