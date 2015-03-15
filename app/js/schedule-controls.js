/**
*
*/

var pglSchedule =	Tidy.Model.extend({			
	'fc': [
		{
			msg: ''
			,scheduleDeleteData: '{"list":[]}'
			,updateScheduleDeleteFields: function(){
				console.log(this.scheduleDeleteData);
				
				var newField = '';
				sdata = $.parseJSON(this.scheduleDeleteData);
				
				//console.log(data);
				$.each(sdata['list'], function(i, item){


						//hidden form fields
						var fId = (typeof(item.id) !== 'undefined')?item.id:0;
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][id]" value="'+ fId + '"/>';
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][enabled]" value="'+ item.enabled + '"/>';
						

						//console.log(i);
						
				});
				console.log(newField);
				$('.schedule-delete-fields').html(newField);
				

			}
			,schedInit: function(){
				this.setScheduleStatusList();
				this.setScheduleLineData();
				this.updateScheduleLines();
			}
			,scheduleStatusList: '{}'
			,setScheduleStatusList: function(){
				var initStatusList	=	$('#schedule-status-list').val();
				if(initStatusList != ''){
					this.scheduleStatusList = atob(initStatusList);
				}
				console.log('init status list' + this.scheduleStatusList);
			}
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
				lineList['list'].push({"id": 0,"sdate":sDate,"stime":sTime, "enabled": 0, "completed": 0});
				this.scheduleLineData = JSON.stringify(lineList);
				
				this.updateScheduleLines();
			}
			,createStatusLabel: function(statusVal){				
				sList = $.parseJSON(this.scheduleStatusList);
				var statusLabel	=	'<span class="label label-default">not saved</span>';								
				$.each(sList, function(i, item){					
					if((i) == statusVal){												
						statusLabel = '<span class="label '+ item.className +'">'+ item.name +'</span>'
					}
					
				});
				return statusLabel;
			}
			,createRemoveButton: function(statusVal,i){

				var lineId	= 'new'+i;
				var removeBtn = '<button class="btn btn-danger btn-xs remove-schedule-line" id="'+lineId+'" data-rec-type="new"><i class="fa fa-trash-o"></i></button>';

				//if its not ZERO, then it is from a database
				if(statusVal>0){
					removeBtn = '<button class="btn btn-danger btn-xs remove-schedule-line" id="'+lineId+'" data-rec-type="db"><i class="fa fa-trash-o"></i></button>';
				}

				return removeBtn;
			}
			,updateScheduleLines: function(){

				var _this = this;
				var defaultStatus	=	'<span class="label label-default">not saved</span>';								
				var newLine = '';
				var newField = '';

				data = $.parseJSON(this.scheduleLineData);
				//console.log(data);
				$.each(data['list'], function(i, item){

						defaultStatus = _this.createStatusLabel(item.completed);
						var removeBtn = _this.createRemoveButton(item.completed,i);

						//var lineId	=	'new'+i;
						//var removeBtn = '<button class="btn btn-danger btn-xs remove-schedule-line" id="'+lineId+'" data-rec-type="db"><i class="fa fa-trash-o"></i></button>';
						
						newLine = newLine + '<tr class="text-center">';
						newLine = newLine + '<td>'+item.sdate+'</td>';
						newLine = newLine + '<td>'+item.stime+'</td>';
						newLine = newLine + '<td>'+defaultStatus+'</td>';
						newLine = newLine + '<td>'+removeBtn+'</td>';
						newLine = newLine + '</tr>';

						//hidden form fields
						var fId = (typeof(item.id) !== 'undefined')?item.id:0;
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][id]" value="'+ fId + '"/>';
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][start_date]" value="'+ item.sdate + '"/>';
						newField = newField + '<input type="hidden" name="data[CampaignSchedule]['+ i + '][start_time]" value="'+ item.stime + '"/>';						

						//console.log(i);
						
				});
				$('.schedule-line-fields').html(newField);
				$('#schedule-lines').html(newLine);
			}
			,removeScheduleLine: function(lineId, that){

				//clean the "namespace off"					
				var nId	=	lineId.replace('new','');

				//parse
				data = $.parseJSON(this.scheduleLineData);


				//*Before we delete it from line array
				//now check to see if the item was a db item
				//if so we need to make a list, so it can be deleted
				//on the dbase side on edit->submit
				var removeCntl	= that.attr('data-rec-type');
				
				var _this = this; //redefine

				if(typeof removeCntl != 'undefined' && removeCntl == 'db'){
					//call deleteScheduleLine function					
					console.log('data-rec-type: ' + removeCntl);
					_this.addDeleteField(data['list'][nId].id);
				} else {
					console.log('removeCntl has no data-rec-type');
				}				


				//remove elements based on nId
				//then remove actual "node"
				delete data['list'][nId];
				data['list'].splice(nId,1);


				//reset the local var
				this.scheduleLineData = JSON.stringify(data);
				this.updateScheduleLines();

				
			}
			,addDeleteField: function(recId){

				
				var deleteList	=	 JSON.parse(this.scheduleDeleteData);
				deleteList['list'].push({"id": recId,"enabled": 0});
				this.scheduleDeleteData = JSON.stringify(deleteList);
				
				//now update the fields (write them)
				this.updateScheduleDeleteFields();
				
			}


		}
	]			

});

//Jquery controls handlers

$(document).ready(function(){
	pglSchedule.fc.schedInit();
});

//add schedule line
$('#add-schedule-line').on('click', function(){

	pglSchedule.fc.getNewLine();

});
$(document).on('click','.remove-schedule-line', function(){
	pglSchedule.fc.removeScheduleLine(this.id, $(this));
});
