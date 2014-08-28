/**
 *Controller / View for new.htm 
 */

$('#sms-message').on('keyup',function(){
	app.Model['newCampaign'].getMessage();	
	//console.log(app.Model['newCampaign'].msg);
	var newMsg	=app.Model['newCampaign'].msg;
	if(newMsg != ''){
		$('#smsMsgPreview').html(newMsg);		
	} else {
		$('#smsMsgPreview').html('No content is typed...');
	}
	

});
