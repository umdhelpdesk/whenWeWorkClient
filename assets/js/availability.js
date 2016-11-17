
function addShift(row) {
	var rowSelector = "tr#" + row;
	var row = $(rowSelector);
	var start = row.find('select#start');
	var end = row.find('select#end');
	var selectedTimes = row.find('div#times');
	var startTime = start.val();
	var endTime = end.val();

	if(startTime == endTime) {
		alert('Error: Start and end time cannot be the same');
	} else {
		var newTime = document.createElement('button');
		$(newTime).addClass('btn');
		$(newTime).addClass('btn-warning');
		$(newTime).addClass('tempShift');

		$(newTime).click(function() {
			this.remove();
		});

		$(newTime).html(start.val() + "-" + end.val());
		$(selectedTimes).append(newTime);	
	}
}


function submitAvaliability() {
	// Implement later
	// get all of the selected shifts for each day/row and 
	// process/validate them somehow
}