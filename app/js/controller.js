/*
 * Controller
 * 
 *  alpha, not completed. Here you can create Object "extend"
 *  can DELETE conent, not necessary.
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
			,exp: 'test'
	});

	var app	=	Object.create(Tidy);
	
