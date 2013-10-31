$(document).ready(function(){


	var hello = ' '

	var firstName = new Array();
	var randomAddresses = new Array();

	for (i = 0; i<10; i++){
		console.log("inside for loop")
		firstName[i] = Faker.Name.firstName();
		//var prettifiedName = prettyPrint(fakerName);
		//console.log(fakerName);
		/*console.log(prettifiedName);*/
		randomAddresses[i] = Faker.Address.streetAddress() + ', ' + Faker.Address.streetName() + ', ' + Faker.Address.city() + ', ' + Faker.Address.usState();
		console.log(randomAddresses[i]);
		hello += '<li> Hi, my name is ' + firstName[i] + '. I live at ' + randomAddresses[i] + '</li><br>';
	}

	$('#nameUl').append(hello);

});