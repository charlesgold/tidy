/*
 * Controller
 */

	var Tidy =	{
			Model:	{
				//blank
				extend: function(extInfo){
					
					//Check to see if the extension is an array or just one single value.
					if(extInfo.isArray()){
						
						
						
					} else {
											
						//model "title"
						Tidy.Model[extInfo.title] = extInfo.value;						
					}

					
				}
			}
	};

	var home	= Tidy.Model.extend({
			title: 'dashboard'
			,exp: 'charlieVariable'
	});

	var app	=	Object.create(Tidy);
	
