$(document).ready(function(){

	detailsObject = new Object();

	$('#clear').on('click', function(){
		//detailsObject is emptied
		localStorage.clear()
		$('input:text').val(' ');
	});

	$('.clearInput').on('click', function(){
		var fieldId = this.dataset.localitem;
		$('#' + fieldId + '').val(' ');

		objectCreation();
		formFieldPopulation();
	});

	//This function...to be initiated when user clicks on update button...
		//field inputs are loaded into an object.
		//The object is then turned into a string and locally stored

	function objectCreation(){

		firstName = $('#firstname').val();
		detailsObject.firstname = firstName;
		
		lastName = $('#lastname').val();
		detailsObject.lastname = lastName;

		email = $('#email').val();
		detailsObject.email = email;

		phone = $('#phone').val();
		detailsObject.phone = phone;

		var localStorageString = JSON.stringify(detailsObject);
		localStorage.setItem('details', localStorageString);
	
	}

	//This function...(to be conducted when page is reloaded)
		//Locally stored string is turned into an object
		//form input fields are populated with object contents
	function formFieldPopulation(){
		var detailsObject = JSON.parse(localStorage.getItem('details'));
		if(detailsObject != null){
			console.log(detailsObject.firstname);
			$('#firstname').val(detailsObject.firstname);
			$('#lastname').val(detailsObject.lastname);
			$('#email').val(detailsObject.email);
			$('#phone').val(detailsObject.phone);
			console.log(detailsObject);
		}
	}

	function initLocalStorageControls(){
		var userMessage = '';
		if(Modernizr.localstorage){
			$('#data-dashboard form').show();
			userMessage = "Use the form below to add and display data";
			formFieldPopulation();
			$('#update-details').on('click', function(){
				objectCreation();
				//var detailsString = localStorage.getItem('details');
				//console.log(detailsString);
				
			});		
		}
		else{
			userMessage = "Sorry, local storage is not available";
			$('#data-dashboard form').hide();
		}

		$('.status-message').text(userMessage);
	}

	initLocalStorageControls();

});