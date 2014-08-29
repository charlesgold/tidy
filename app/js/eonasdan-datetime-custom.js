$(function () {
$('#scheduleDate').datetimepicker(
		{
			pickTime: false
			,icons: {
				date: 'fa fa-calendar'				
			}
			,minDate: ((new Date()).getMonth()+1 ) + '/' + (new Date().getDate()) + '/' + (new Date().getFullYear())
			
		}
	),
	$('#scheduleTime').datetimepicker(
		{
			pickDate: false
			,icons: {
				time: 'fa fa-clock-o'
				,up: 'fa fa-arrow-up'
				,down: 'fa fa-arrow-down'				
			}
			,minuteStepping: 5


		}
	)
});
