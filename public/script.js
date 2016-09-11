var total = 0;
var op;
var display = "";
var lastBtn;
var numx;
var numy;
var oldop;

// Possible inputs
var actions = [ "sum", "sub", "mul", "div" ];
var numbs = ["1","2","3","4","5","6","7","8","9","0","."];

// A console logging helper function
var logit = function( message ) {
	console.log( message );
	console.log( "op:", op );
	console.log( "numx:", numx );
	console.log( "numy:", numy );
	console.log( "display:", display );
};

// The 'brains' of the calculator's button logic
var calc = function( btn ) {

	var input = $("#display-input");

	if ( btn === "AC" ) {
		op = undefined;
		display = "";
		numx = undefined;
		numy = undefined;
		lastBtn = undefined;
		input.val( "0" );
	}

	if( actions.indexOf( btn ) >= 0 && actions.indexOf( lastBtn ) >= 0 ) {
		op = btn;
		lastBtn = btn;
		console.log( op );
		return false;
	}

	if( numbs.indexOf( btn ) >= 0 ) {
		display += btn;
		input.val( display );
		lastBtn = btn;
		console.log( display );
	} else 

	if( actions.indexOf( btn ) >= 0 && numx === undefined ) {
		numx = display;
		display = "";
		op = btn;
		lastBtn = btn;
		console.log( op );
	} else

	if ( actions.indexOf( btn ) >= 0 && numx !== undefined && display !== "" ) {
		test( op, numx, display );
		op = btn;
		display = "";
	} else

	if ( btn === "=" ) {
		if( numy === undefined ) {
			numy = display;
		}
		test( op, numx, numy );
		display = "";
	}


};


$( document ).ready( function() {
	// Whenever a button is clicked, collect its data-value and send it along to the brains
	$("button").on("click", function() {

		var btn = $( this ).data("value");

		calc( String( btn ) );

	});

	// If you hover over the solar cell too long, the calc will reset
	// Skeuomorphism at its best
	$(".solar-cell").hover(function() {
		var input = $( ".container-input > input" );
		input.stop().clearQueue();
		$( ".container-input > input" ).animate({opacity:0.0}, 3000, function() {
			$(".all-clear").trigger( "click" );
		});
	}, function() {
		var input = $( ".container-input > input" );
		input.stop().clearQueue();
		input.animate({opacity:1}, 1200);
	});
});

// AJAX Handler
var test = function( action, thex, they ) {
	logit("Before ajax");
	$.ajax({
	url: '/calc/' + action,
	type: 'post',
	dataType: 'json',
	data: { x: thex, y: they },
	success: function( data ) {
		console.log( "Data Received:", data );
		numx = data.result;
		$("#display-input").val( data.result );
	}
});
};