/**
*
*/

var pglSchedule =	Tidy.Model.extend({			
	'fc': [
		{
			msg: ''
			,scheduleLineData: '{"list":[]}'
			,setScheduleLineData: function(){
				var initLineData = $('#schedule-line-init').val();
				if(initLineData!=''){
					this.scheduleLineData = atob(initLineData);
				}
				console.log('init line data: ' + this.scheduleLineData);
			}
			,today: function(){
				var day	=	new Date();
				return (day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();
			}
			,isFutureDay: function(schedDay){
				future = false;
				schedDay = new Date(schedDay);
				today = new Date(this.today());
				if((schedDay - today) >= 0){
					future = true;
				}
				
				return future;
			}

			,getNewLine: function(){
				var scheduleDate	=	$('#schedule-date-text').val();
				var scheduleTime	=	$('#schedule-time-text').val();
				//simple validation
				//is it a future day?
				if(this.isFutureDay(scheduleDate)){

				} else { //past date
					console.log('Date in past '+ this.today());
				}

				//start the creation
				this.createLine(scheduleDate, scheduleTime);
			}			
			,createLine: function(sDate, sTime){				
				var lineList	=	 JSON.parse(this.scheduleLineData);
				lineList['list'].push({"sdate":sDate,"stime":sTime});
				this.scheduleLineData = JSON.stringify(lineList);
				
				this.updateScheduleLines();
			}
			,updateScheduleLines: function(){

				var defaultStatus	=	'<span class="label label-default">not saved</span>';				
				var newLine = '';
				var newField = '';

				data = $.parseJSON(this.scheduleLineData);
				console.log(data);
				$.each(data['list'], function(i, item){

						var lineId	=	'new'+i;
						var removeBtn = '<button class="btn btn-danger btn-xs remove-schedule-line" id="'+lineId+'"><i class="fa fa-trash-o"></i></button>';
						
						newLine = newLine + '<tr class="text-center">';
						newLine = newLine + '<td>'+item.sdate+'</td>';
						newLine = newLine + '<td>'+item.stime+'</td>';
						newLine = newLine + '<td>'+defaultStatus+'</td>';
						newLine = newLine + '<td>'+removeBtn+'</td>';
						newLine = newLine + '</tr>';

						//hidden form fields
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][start_date]" value="'+ item.sdate + '"/>';
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][start_time]" value="'+ item.stime + '"/>';						

						console.log(i);
						
				});
				$('.schedule-line-fields').html(newField);
				$('#schedule-lines').html(newLine);
			}
			,removeScheduleLine: function(lineId){

				//clean the "namespace off"					
				var nId	=	lineId.replace('new','');

				//parse
				data = $.parseJSON(this.scheduleLineData);

				//remove elements based on nId
				//then remove actual "node"
				delete data['list'][nId];
				data['list'].splice(nId,1);


				//reset the local var
				this.scheduleLineData = JSON.stringify(data);
				this.updateScheduleLines();
			}


		}
	]			

});

//Jquery controls handlers

$(document).ready(function(){
	pglSchedule.fc.setScheduleLineData();
});

//add schedule line
$('#add-schedule-line').on('click', function(){

	pglSchedule.fc.getNewLine();

});
$(document).on('click','.remove-schedule-line', function(){
	pglSchedule.fc.removeScheduleLine(this.id);
});
