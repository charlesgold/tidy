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
							,longUrl: function(){
								return ($('#longUrl').val()).replace(' ','');
							}
						}
			]			

	});
/**
 * end of extend
 */
var smsMessageSync	=	function(){
			
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
};

$('#sms-message').on('keyup',function(event){
	smsMessageSync();
});
$('#sms-message').on('change', function(){
	smsMessageSync();
});

$('#send-later').on('click',function(){	
	$('.schedule-related').toggle();
	
	//change the button that is showing, so that it can be saved, instead of sending.
	$(this).hide();
	$('#save-later').show();
	//*May want to introduce some logic here that doesn't show the "Save"
	//button unless the enabled box is ticked. Or the date / time boxes have values.
});

//Handle preview device buttons
$('.apple').on('click',function(){
	$('.device-description').html('iPhone');
	$('.sms-emulation').removeClass('android');	
	$('.sms-emulation').addClass('apple');
});

$('.android').on('click',function(){
	$('.device-description').html('Android');
	$('.sms-emulation').removeClass('apple');	
	$('.sms-emulation').addClass('android');
});

//Handle shortlink generte button
$('#makeShortLink').on('click',function(){
	var data	=	{
							'longUrl': pglNewCampaign.newCampaign.longUrl()	
	}
	var gapi	=	globalController.global.ajax("https://www.googleapis.com/urlshortener/v1/url/?key=AIzaSyAYzMxprGNBBtvyde7LboLBtZmiISMdO7I",JSON.stringify(data),'post','#sms-message');
});
