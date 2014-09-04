/*
 * Controller
 * 
 *  alpha, not completed. Here you can create Object "extend"
 *  can DELETE conent, not necessary.
 */

	var Tidy =	{
			Model:	{
				//blank
				extend: function(obj){
				
					
					//iterate through extend
					for(var name in obj){
							if(Object.prototype.toString.call(obj[name]) == '[object Array]'){
								for(var i=0;i<obj[name].length;i++){
									
									//reassign
									var arrObj	=	obj[name];
									for(var sName in arrObj){
									
										Tidy.Model[name]	=	arrObj[sName];
											
									}
																		
								}
							}
					}
					//model "title"					
					/*
					 
					Tidy.Model[extInfo.title] = extInfo.exp;						
					return Tidy.Model[extInfo.title];
					*/
					return Tidy.Model;
				}
			}
	};


	var app	=	Object.create(Tidy);
	
	var globalController	=	Tidy.Model.extend({
		'global': [
						{
							ajax: function(path, data, type, control){
								
									$.ajax({
											dataType: 'json',
											type: type,
											url: path,
											data: data,
											//contentType: "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
											//mimeType: "multipart/form-data",
											contentType: "application/json",							
											processData: false,
											cache: false,
											success: function(response) {
												console.log('SUCCESS', response);
												//return response;	
												$(control).val($(control).val()+' ' + response.id + ' ');											
											},
											error: function(response) {
												console.log('FAIL', response);
												return 'error';
											}
										});		
											
							}						
						}
		]
	});

	var newOne =	Tidy.Model.extend({			
			'home': [
							{
								prop: 'aTitle'
								,prop2:	function(aParam){
									console.log(aParam);
								}								
							}				
			]		

	});

	//app.Model['home'].prop2('hello');
	//console.log(app.Model['home'].prop);

