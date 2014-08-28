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
				}
			}
	};


	var app	=	Object.create(Tidy);

	var newOne =	Tidy.Model.extend({			
			'home': [
							{
								prop: 'aTitle'
								,prop2:	function(aParam){
									console.log(aParam);
								}								
							}				
			]
			,'newCampaign': [
						{
							msg: ''
							,getMessage: function(){
									var smsMsg	= $('#sms-message').val();
									this.msg	=	smsMsg;
							}
						}
			]			

	});

	//app.Model['home'].prop2('hello');
	//console.log(app.Model['home'].prop);

