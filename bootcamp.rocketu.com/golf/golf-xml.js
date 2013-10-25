$(document).ready(function(){

	xmlDoc = $.parseXML( golfxml );
	$xml = $( xmlDoc );


	var parsArray = $xml.find('golf').find('pars').text().split('');
	for (var i=0; i<parsArray.length; i++){
		parsArray[i] = Number(parsArray[i]);
	}

	var scores = new Array();

	for (i = 0; i<5; i++){
		counter = 0;
		scores[i] = ($($xml.find('golf').find('scores').find('person')[i]).find('strokes').text()).split('');
		//console.log(scores[i]);
		counter++;
	}

	var nameString = '';

	$xml.find('name').each(function(){
		//console.log("we're inside the pars each function!");
		var counter = 0;
		var playerName = $(this).text() + ',';
		//console.log(nameString);
		nameString += playerName;
	});

	var nameArray = nameString.split(',');
	nameArray.pop();
	var strokesArray = ($xml.find('golf').find('scores').find('person').find('strokes').text()).split('');
	console.log(strokesArray);
	for (i = 0; i<strokesArray.length; i++){
		strokesArray[i]= Number(strokesArray[i]);
	}
	console.log(strokesArray);*/

	/*$xml.find('pars').each(function(){
		console.log("we're inside the pars each function!");
		var counter = 0;
		var holePar = $(this).text();
		parString += holePar;
		console.log(holePar);
		counter++;
	});

	console.log(parString);

	var parsArray = parString.split('		');
	console.log(parsArray);*/

	//console.log(nameString);
	
	var $par = $('#par');
	var parTotal = 0;

	$(document).ready(function(){
		//var total = 0;
		for (var i = 0; i < (parsArray.length); i++) {
			$par.append('<td>' + parsArray[i] + '</td>');
			parTotal += parsArray[i];
		}
		$par.append('<td>' + parTotal + '</td>');

		//For each player
		marginTotal = 0;
		scoreTotal = 0;

		for (i=0; i<nameArray.length; i++){

			//create a new row for each player in each of the tables
			var newRowScoreboard = document.createElement('tr');
			var newRowUpdate = document.createElement('tr');
			//add an id="player's name" to each of those rows - for scoreBoard Table:
			newRowScoreboard.id = nameArray[i];
			//add an id of playerUpdate to each of those rows - for update scoreboard table:
			newRowUpdate.id = nameArray[i] + 'Update';
			//append the row to the table body's both for the scoreBoard table and the update score table
			$('#scoreboardTable tbody').append(newRowScoreboard);
			$('#scoreFormTable tbody').append(newRowUpdate);
			//create a cell with the player's name in it
			var playerNameCell = '<td>' + nameArray[i] + '</td>';
			//append that cell to the player's row in each of the tables:
			newRowScoreboard.innerHTML += playerNameCell;
			newRowUpdate.innerHTML += playerNameCell;

			//create a table for total with the id of "playerName + 'Total';
			var scoreTotalCell = document.createElement('tr');
			scoreTotalCell.id = nameArray[i] + 'Total';

			//Initiating variables for the total columns so that they can be written in each hole's for loops
			var scoreTotal = 0;
			var marginTotal = 0;
			//Find the name of the player
			var name = nameArray[i];

			//For each hole
			for (var j = 0; j < 9; j++){

				var currentStroke = scores[i][j];

				//Checking whether current stroke actually exists ie: it's not to be played
				if(currentStroke){
					//For the update form table...
					//For each hole a cell with inputs inside of them for each hole, and a placeholder of the player's strokes for that hole

					var inputCell = '<td><input type="text" id="edit ' + i + '-' + j + '" value="' + scores[i][j] + '"'+ '</td>';
					$('#' +  name + 'Update').append(inputCell);

					//Figure out the player's margin for each hole by subtracking par for that hole from the player's stroke count for that hole
					var holeMargin = scores[i][j] - parsArray[j];

					//Append the player's row with the holeMargin for the j hole:

					$('#' +  name + '').append('<td id="view_'+ i + '-' + j+ '">'+ holeMargin + '</td>');

					//Update the player's total by adding the margin of that hole
					scoreTotal += Number(scores[i][j]);
					marginTotal += Number(holeMargin);
				}
				else{
					//For the ScoreBoard table create an empty cell to be inserted for the holes that the user doesn't yet have scores for: 
					var emptyTD = '<td id="view_'+ i + '-' + j+ '">'+'</td>';
					$('#' +  name + '').append(emptyTD);

					//For the update form table...
					//For each hole a cell with inputs inside of them for each hole, and an empty placeholder
					var inputCell = '<td><input id="edit ' + i + '-' + j + '" type="text" value="" </td>';
					$('#' +  name + 'Update').append(inputCell);
				}

			}

			//append player's total to the end of the row for each table:
			$('#' +  name + '').append('<td id="marginTotal'+ i +'">' + marginTotal + '</td>');
			$('#' +  name + 'Update').append('<td id="scoreTotal'+ i +'">' + scoreTotal + '</td>');

		}

	});

	//when the user changes/adds a value in the update scores table, it should update the values and totals in both tables
	$(this).on('change', 'input', function(){
		console.log("we're in the chagne fucntion");
		//console.log("this is this" + $(this.value));
		
		//get the value that the cell was changed to:
		var changedScore = this.value;
		var changedCellId = this.id;
		//console.log(changedScore);

		//split the id by space

		var splitted = changedCellId.split(' ');
		//console.log(splitted[1]);

		//second half of the string (which will be the same in the view form)
		var viewLocation = '#view_' + splitted[1];
		console.log(viewLocation);

		var viewCellFound = $(viewLocation);
		var targeted = splitted[1].split('-');

		var oldCellValue = viewCellFound.text();
		console.log("this was the old value of the cell: " + oldCellValue);


		//Update the totals for the appropriate rows on each table:
		
		//pinpoint where the cell is located in the table (so that I'll know which row's total needs to be changed and/or where to add the value into the total array)
		//column that viewCellFound is in
		var targetedCol = targeted[1];
		console.log(targetedCol);
		//row that the viewCellFound is in
		var targetedRow = targeted[0];
		console.log("row: " + targetedRow + "column: " + targetedCol);

		//Figure out the margin for that cell: par[] - changedScore:

		var newMargin = (changedScore - parsArray[targetedCol]);

		//place the new Margin into the #viewCell's cell 
		viewCellFound.text(newMargin);

		//Next Steps: Figure out the current total for that row OR player --> subtract the old value for the changed cell OldCellValue, add the new value changedScore
		var oldScoreTotal = parseInt($('#scoreTotal' + targeted[0]).text());
		var oldMarginTotal = parseInt($('#marginTotal' + targeted[0]).text());
		//console.log('oldScoreTotal: ' + oldScoreTotal);
		var valueChange = changedScore - oldCellValue;
		var newScoreTotal = oldScoreTotal + valueChange;
		var newMarginTotal = (oldMarginTotal - oldCellValue) + (changedScore - parsArray[targetedCol])
		console.log('new score total: ' + newScoreTotal);
		console.log('new margin total: ' + newMarginTotal);
	
		//insert that total into the final cell in the row of the updateScore table:
		$('#scoreTotal' + targeted[0]).text(newScoreTotal);
		$('#marginTotal'+ targeted[0]).text(newMarginTotal);
		
	});

	//when user clicks Show Form button, the Score Form table appears
	$('#showForm').on('click', function(){
		console.log('showform clicked');
		$('#scoreForm').show();
	});

	//user clicks on Update Scores button
	$('#updateScores').click(function(){
		//scoreForm is hidden
		$('#scoreForm').hide();
	});
});