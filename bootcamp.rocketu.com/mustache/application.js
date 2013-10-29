$(document).ready(function(){

	$("#Exercise1").on('click', function(){
		var exerciseName = '<h2> Exercise 1 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise1($('#exercise-content'));
	});

	$('#Exercise2').on('click', function(){
		var exerciseName = '<h2> Exercise 2 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise2();
		
	});

	$('#Exercise3').on('click', function(){
		var exerciseName = '<h2> Exercise 3 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise3();
	});

	$('#Exercise4').on('click', function(){
		var exerciseName = '<h2> Exercise 4 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise4();
	});

	$('#Exercise5').on('click', function(){
		var exerciseName = '<h2> Exercise 5 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise5();
	});

	$('#Exercise6').on('click', function(){
		var exerciseName = '<h2> Exercise 6 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise6();
	});

		$('#Exercise7').on('click', function(){
		var exerciseName = '<h2> Exercise 7 </h2>';
		$('#exercise-content').append(exerciseName);
		renderExercise7();
	})

	function renderExercise1(htmlElement){

		var person = {
			fname: "Mike",
			lname: "Smith",
			cellnum: "01234 56789"
		}

		var nameTemplate = "<h3>{{fname}} {{lname}}</h3>";
		var cellTemplate = "<p> Cell: {{cellnum}}";
		var template = "<p>My best friend's name is {{fname}} {{lname}}. His cell phone number is {{cellnum}}. Feel free to give him a call if you're bored.</p>"
		
		var html1 = Mustache.render(nameTemplate, person);
		var html2 = Mustache.render(cellTemplate, person);
		
		htmlElement.append(html1 + html2);

	}

	function renderExercise2(htmlElement){

		var person = {
			fname: "Joe",
			lname: "Smith",
			cellnum: "07123 456789"
		}

		var template = $("#exercise2-template").html();
		var html = Mustache.render(template, person);
		$('#exercise-content').append(html);

	}

	function renderExercise3(){
		var person = {
			fname: "Joe",
			lname: "Smith",
			cellnum: "07123 456789",
			skills: ["PHP", "Python", "jQuery", "CSS"]
		};

		var template = $('#exercise3-template').html();
		var html = Mustache.render(template, person);
		$('#exercise-content').append(html);
	}

	function renderExercise4(){
		var data = {
			employees: [
			{
				"name": "Fred Smith", 
				"skills": ["PHP", "MySQL", "Python"],
				"cellnum": "07590 538686",				
				"email": "fred@smith.com"
			},
			{
				"name": "Mike Jones",
				"skills": ["Java", "jQuery", "HTML"],
				"cellnum": "1234 567890",
				"email": "mike@jones.com"
			},
			{
				"name": "Mary Green",
				"skills": ["Design", "Photoshop", "CSS"],
				"cellnum": "9876 543218",
				"email": "mary@green.com"
			}
			]
		};

		var template = $('#exercise4-template').html();
		var html = Mustache.render(template, data);
		$('#exercise-content').append(html);
	}

	function renderExercise5(){
			var data = {
			employees: [
			{
				"name": "Fred Smith", 
				"skills": ["PHP", "MySQL", "Python"],
				"contact" : {"cellnum": "07590 538686", "email": "fred@smith.com"}
			},
			{
				"name": "Mike Jones",
				"skills": ["Java", "jQuery", "HTML"],
				"contact" : {"cellnum": "1234 567890", "email": "mike@jones.com"}
			},
			{
				"name": "Mary Green",
				"skills": ["Design", "Photoshop", "CSS"],
				"contact" : {"cellnum": "9876 543218", "email": "mary@green.com"}
			}
			]
		};
		var template = $('#exercise5-template').html();
		var html = Mustache.render(template, data);
		$('#exercise-content').append(html);
	}

	function renderExercise6(){
			var data = {
			employees: [
			{
				"name": "Fred Smith", 
				"skills": ["PHP", "MySQL", "Python"],
				"contact" : {"cellnum": "07590 538686", "email": "fred@smith.com"}
			},
			{
				"name": "Mike Jones",
				"skills": ["Java", "jQuery", "HTML"],
				"contact" : {"cellnum": "1234 567890", "email": "mike@jones.com"}
			},
			{
				"name": "Mary Green",
				"skills": ["Design", "Photoshop", "CSS"],
				"contact" : {"cellnum": "9876 543218", "email": "mary@green.com"}
			}
			]
		};
		var template = $('#exercise6-template').html();
		var html = Mustache.render(template, data);
		$('#exercise-content').append(html);
	}

	function renderExercise7(){
			var data = {
			employees: [
			{
				"name": "Fred Smith", 
				"skills": ["PHP", "MySQL", "Python"],
				"contact" : {"cellnum": "07590 538686", "email": "fred@smith.com"}
			},
			{
				"name": "Mike Jones",
				"skills": ["Java", "jQuery", "HTML"],
				"contact" : {"cellnum": "1234 567890", "email": "mike@jones.com"}
			},
			{
				"name": "Mary Green",
				"skills": ["Design", "Photoshop", "CSS"],
				"contact" : {"cellnum": "9876 543218", "email": "mary@green.com"}
			}
			]
			};

			var template = $('#exercise7-template').html();
			var partialTemplate = $('#employee-partial-template').html();
			var partials = {listitem: partialTemplate};
			var html = Mustache.render(template, data, partials);
			$('#exercise-content').append(html);
	}

});