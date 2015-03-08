	var pglDashboard =	Tidy.Model.extend({			
		'functions': [
						{
							timeZoneString: function(){
									var tz = jstz.determine(); // Determines the time zone of the browser client
    								return tz.name(); // Returns the name of the time zone eg "Europe/Berlin"
							}
							,getTime: function(){
								  var d = new Date(),
								      h = (d.getHours()<10?'0':'') + d.getHours(),
								      m = (d.getMinutes()<10?'0':'') + d.getMinutes();		
								      
								      //utc check
								      utc	=	d.getUTCHours();
								      var u = 'PM';
								      if(utc<12){
								      	u		=	'AM';
								      }						      						      
								  time = h + ':' + m + ' ' + u;
								  return time;
							}
						}
			]			

	});



$(document).ready(function(){
	$('#dash-timezone').html(pglDashboard.functions.timeZoneString());
	
	$('#dash-time').html(pglDashboard.functions.getTime());	
	setInterval(function(){
		$('#dash-time').html(pglDashboard.functions.getTime());	
	},30000);
	
});
