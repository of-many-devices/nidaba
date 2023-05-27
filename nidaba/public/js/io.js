var io =
{
	timer: null,
	exec_cb: null,
	
	exec: function(client_obj, cb)
	{
		io.exec_cb = cb;
		
		var client_str = JSON.stringify(client_obj);
			
		var xhr=new XMLHttpRequest();
		xhr.open('POST', '/io', true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("Content-length", client_str.length);
		xhr.setRequestHeader("Connection", "close");
		xhr.onreadystatechange=function()
		{
			// Ready state 4 means the request is done
			if(xhr.readyState === 4)
			{
				// 200 is a successful return
				if(xhr.status === 200)
				{
					clearTimeout(io.timer);
					cb(JSON.parse(xhr.responseText));
				}
				else
				{
					console.log('ajax error: '+xhr.status);
				}
			}
		};

		io.timer = setTimeout(io.timeout, 2000);

		xhr.send(client_str);
	},
	timeout: function()
	{
		io.exec_cb([]);
	},
};
