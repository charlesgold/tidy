/*
 * Custom CST2 3
 */
	var ItunesApi = {
	    ajax: function() {
	    	//https://itunes.apple.com/search?term=jack+johnson&entity=musicVideo
	        console.log( "Tell me something good..." );

			$.ajax({
			  url: "https://itunes.apple.com/search?term=jack+johnson&entity=musicVideo&callback=jpcallback",
			  type: "POST",
			  //data: { id : menuId },
			  dataType: "jsonP"
			  ,success: function(data){
			  	console.log(data);
			  }
			});
	        
	    }
	};
	
	var app = Object.create(ItunesApi);

	app.ajax();
