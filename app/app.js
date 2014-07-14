/*
 * Controller
 */

	var Tidy =	{
			Model:	{
				//blank
				extend: function(extInfo){
					console.log(extInfo.title);
				}
			}
	};

	var home	= Tidy.Model.extend({
			title: 'charlie'
	});

	var app	=	Object.create(Tidy);
	
;/*
 * Controller
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
;/*
 * Model
 */


//tiny-eco.com