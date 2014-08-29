/**
 *Controller / View for new.htm 
 */

/**
 *extend the main controller  
 **/

	var pglNewCampaign =	Tidy.Model.extend({			
		'newCampaign': [
						{
							msg: ''
							,getMessage: function(){
									var smsMsg	= $('#sms-message').val();
									//set the msg variable to contain the content typed
									this.msg	=	smsMsg;
									//set the character length
									this.monitorSize = smsMsg.length;
							}
							,maxSize: 140
							,monitorSize: 0
							,sizeRemaining: function(){
								return (this.maxSize - this.monitorSize);	
							}
						}
			]			

	});
/**
 * end of extend
 */

$('#sms-message').on('keyup',function(){
		
	pglNewCampaign.newCampaign.getMessage();
	//console.log(app.Model['newCampaign'].msg);
	var newMsg	=pglNewCampaign.newCampaign.msg;
	if(newMsg != ''){
		$('#smsMsgPreview').html(newMsg);		
	} else {
		$('#smsMsgPreview').html('No content is typed...');
	}
	
	//set the remaining count visible
	if(pglNewCampaign.newCampaign.sizeRemaining() < 0){
			$('.remaining-count').html(pglNewCampaign.newCampaign.sizeRemaining()).addClass('negative');		
	} else {
			$('.remaining-count').html(pglNewCampaign.newCampaign.sizeRemaining()).removeClass('negative');
	}

	
});

$('#send-later').on('click',function(){	
	$('.schedule-related').toggle();
	
	//change the button that is showing, so that it can be saved, instead of sending.
	$(this).hide();
	$('#save-later').show();

});


