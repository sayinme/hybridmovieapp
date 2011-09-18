/* 	document.addEventListener("deviceready",onDeviceReady, false);
	 	
	 	function onDeviceReady()
	 	{
	 		checkConnection();	
	 	}
	 	
	 	function checkConnection()
	 	{
	 		var networkState = navigator.network.connection.type;
	 		
	 		if(networkState == Connection.UNKNOWN)
	 		{
	 			alert('인터넷 연결이 끊겼으니 네트워크를 확인해 주시기 바랍니다.');
	 		}
	 		else{
	 			alert('enjoy!');
	 		}
	 	}  */ 
	 	
	   $("#[data-role=page]").live("pageshow",function(event) { 
			if(this.id == "usersearchpage")
			{
				var loadpage = 1;
	 	  		var display = 0;
	 	  		var movieName ='';

	 	  		function varinit()
	 	  		{
	 	  			loadpage = 1;
		 	  		display = 0;
		 	  		movieName ='';
	 	  		}
	 	  		
	 	  		$("#callXML").click(function(){
			  		$("#resultlist").empty();
			  		varinit();
		 	  		movieName = $.trim($("#movieName").val());
				  	if(movieName.length > 0)
				  	{
				  		$.mobile.showPageLoadingMsg();
				  		callsearchmovie();
				  	}
				  
				  	else
				  		alert('please input text');
			  	}); 
	 	  		
	 	  		function callsearchmovie()
			  	{
			  		$.ajax({
					  	type:"GET",
						url: "http://openapi.naver.com/search?key=db13514ebf38ccd279a6b93538f88bca&query=" + movieName + "&display=10&start="+ loadpage +"&target=movie" ,
						dataType: "xml",
						success: parseXml2,
						error: callsearchmovieerror
				  	});
			  	}
			  	
	 	  		function callsearchmovieerror()
	 	  		{
	 	  			$.mobile.hidePageLoadingMsg();
	 	  			alert('죄송합니다. 다시 시도하여 주시기 바랍니다.');
	 	  		}
	 	  		
			  	function parseXml2(xml)
			  	{	
			  		var imgurl = '';
			  		var total = 0;
			  		if($(xml).find("item").length == 0)
			  		{
			  			$("#resultlist").append("<p align='center'>검색결과가 없습니다</p>");
			  		}
			  		else
			  		{
					  	$(xml).find("item").each(function()
					  	{
					  		if($(this).find("image").text() == '')
					  		{
					  			imgurl = "img/noimage.png";	
					  		}
					  		else
					  		{
					  			imgurl = $(this).find("image").text();
					  		}
						  	$("#resultlist").append("<li><a href='" + $(this).find("link").text() + "' data-ajax=”false”><img src='" + imgurl + "'><h3>" + $(this).find("title").text() + "</h3><p>" + $(this).find("subtitle").text() + "</p><img src='img/star.png'>" + $(this).find("userRating").text() + "</a></li>");
					  	});
					  	
					  	total = parseInt($(xml).find("total").text());
					  	if(total > 10)
					  	{
					  		display = parseInt($(xml).find("display").text());
					  		loadpage = loadpage + display;
					  		if(total >= loadpage)
					  		{
					  			$("#resultlist").append("<li id=loadmore data-theme='b'>Load more..</li>");
						  		$("#loadmore").click(function(){
						  			$("#loadmore").remove();
						  			callsearchmovie();
							  	});	
					  		}
					  	}
			  		}
			  		$("#resultlist").listview('refresh');
			  		$.mobile.hidePageLoadingMsg();
			  		
			  	}
			}
			
	        if(this.id == "realtimesearchpage") 
	        { 
	        	callrealtime();
	        	  	//setInterval(function() 
	        	  	//{
		        	//	$("#realtimelist").empty();
		        	//  	callrealtime();
		          	//},10000); 
	        	$("#refreshbtn").click(function(){
	        		callrealtime();
	        	});
	        
		        function callrealtime()
		        {
		        	$("#realtimelist").empty();
		        	$.ajax({
						type:"GET", 
						url: "http://openapi.naver.com/search?key=db13514ebf38ccd279a6b93538f88bca&query=movie&target=ranktheme",
						dataType: "xml",
						success: parseXml,
						error: errorr
					});	
		        }
	
		        function errorr()
		        {
		        	alert('죄송합니다. 다시 시도해 주십시오');
		        }
		        
		        function parseXml(xml)
				{		  
					var i = 1;
				  	var sign ;
				  	for(i=1; i<11; i++)
				  	{
			  			$(xml).find("R"+[i]).each(function()
			  			{
			  				if($(this).find("S").text() == "*")
						  	{
						  		sign = "img/same.png"	
						  		$("#realtimelist").append("<li><img src='img/"+ i +".png' class='ui-li-icon'>" + $(this).find("K").text()+"<img src='" + sign +"' data-iconpos='right'></li>");
						  	}
			  				else
			  				{
			  					if ($(this).find("S").text() == "+")
							  	{
							  		sign = "img/up.png"	
							  	}
							  	else if($(this).find("S").text() == "-")
							  	{
							  		sign = "img/down.png"
							  	}
						  		$("#realtimelist").append("<li><img src='img/"+ i +".png' class='ui-li-icon'>" + $(this).find("K").text()+"<img src='" + sign +"'>" + $(this).find("V").text() +"</li>");
			  				}
			  			});	
			  		}
					$("#realtimelist").listview('refresh');
				  	$.mobile.hidePageLoadingMsg();
				}
	        }     

	        if(this.id == "teaserpage")
	        {
		       
	        	var video = document.getElementById('videoplay');
	        	var playbtn = document.getElementById('palybtn');
	        	 
	    		playbtn.addEventListener('click',function(){
	    			alert('teaser');
	    			video.play();	
	    		},false);

	    		//if($('videoplay').length > 0)
	    		//{
		    	//	alert('go');
		    	//	$('#playbtn').bind('click',function(){
			    //		document.play();
		    	//	});	
	        }

	   });