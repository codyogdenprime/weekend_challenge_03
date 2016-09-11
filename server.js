var express = require( 'express' );
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/normalize.css'));
app.use(express.static('public'));


app.set('port', (process.env.PORT || 5000));

//var calc = require( './modules/calc.js' );

var calc = require( './calc.js' );

console.log( "Number:", calc.add( 2, 2 ) );

result = {
	total: calc.add( 2, 2 )
};

app.get('/', function(req, res) {
	console.log( "app.get" );
	res.send("public/index.html");
});

app.post( '/', function( req, res ) {
	console.log( "app.post" );
});


app.post( '/calc/sum', function( req, res ) {
	console.log( "Body:", req.body );
	var num = Number( req.body.x ) + Number( req.body.y );
	res.send( { result: String( num ) } );
} );

app.post( '/calc/sub', function( req, res ) {
	console.log( "Body:", req.body );
	var num = Number( req.body.x ) - Number( req.body.y );
	res.send( { result: String( num ) } );
} );

app.post( '/calc/div', function( req, res ) {
	console.log( Number( req.body.x ) / Number( req.body.y ) );
	var num = Number( req.body.x ) / Number( req.body.y );
	console.log( "Num:", String( num ) );
	res.send( { result: String( num ) } );
} );

app.post( '/calc/mul', function( req, res ) {
	console.log( "Body:", req.body );
	var num = Number( req.body.x ) * Number( req.body.y );
	res.send( { result: String( num ) } );
} );

app.listen(app.get('port'), function() {
    console.log('server is listening');
});