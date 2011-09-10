$(document).ready(function(){
	$("[data-role=page").live("pageshow",function(event){
		if(this.id == "firstpage")
		{
			alert('first');
			$("#callXML").click(function(){
		  		$("#resultlist").empty();
			  	var movieName = $.trim($("#movieName").val());
			  	if(movieName.length > 0)
			  	{
				  	$.ajax({
					  	type:"GET",
						url: "http://openapi.naver.com/search?key=db13514ebf38ccd279a6b93538f88bca&query=" + movieName + "&display=10&start=1&target=movie" ,
						dataType: "xml",
						success: parseXml2
				  	});
			  	}
			  	else
			  		alert('please input text');
		  	});

			$("#usersearch").click(function(){
		  		$("#resultlist").empty();
		  	});
			
		  	$("resultlist").ajaxError(function(event, request, settings, exception){
			  	//("resultlist").html("Error Calling: " + settings.url + "<br/>HTTP Code: " + request.status);
			  	alert('죄송합니다. 다시 시도하여 주시기 바랍니다.');
		  	});

		  	function parseXml2(xml)
		  	{	
			  	$(xml).find("item").each(function()
			  	{
				  	$("#resultlist").append("<li><a href='" + $(this).find("link").text() + "'><img src='" + $(this).find("image").text() + "'><h3>" + $(this).find("title").text() + "</h3><p>" + $(this).find("subtitle").text() + "</p></a></li>");
				  	$("#resultlist").listview('refresh');
			  	});
		  	}
		}
		
		if(this.id == "secondpage")
		{
			alert('second');
			$("#resultlist").empty();
		  	$.ajax({
			  	type:"GET",
				url: "http://openapi.naver.com/search?key=db13514ebf38ccd279a6b93538f88bca&query=movie&target=ranktheme",
				dataType: "xml",
				success: parseXml
		  	});
		  	
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
				  			sign = "same.png"	
				  			$("#resultlist").append("<li><img src='"+ i +".png'>" + $(this).find("K").text()+"<img src='" + sign +"'></li>");
				  		}
	  					else
	  					{
	  						if ($(this).find("S").text() == "+")
					  		{
					  			sign = "up.png"	
					  		}
					  		else if($(this).find("S").text() == "-")
					  		{
					  			sign = "down.png"
					  		}
				  			$("#resultlist").append("<li><img src='"+ i +".png'>" + $(this).find("K").text()+"<img src='" + sign +"'>" + $(this).find("V").text() +"</li>");
	  					}
	  				});	
	  			}
		  		$("#resultlist").listview('refresh');
		  	}
		}
	});
	
	
});