$(function () {
	$('#scheduleDate').datetimepicker(
		{
			pickTime: false
			,icons: {
				date: 'fa fa-calendar'				
			}
			
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

		}
	)
});
