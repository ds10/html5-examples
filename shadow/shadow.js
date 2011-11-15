var width = 320, 
	height = 500,
	gLoop,
	c = document.getElementById('c'), 
	ctx = c.getContext('2d');	
	c.width = width;
	c.height = height;
	var i =0;
var moves = [];	
var pastmoves = [];	
var shadows = [];	
var showshadow = false;

//clear screen every time? maybe not.	
var clear = function(){
	ctx.fillStyle= "rgba(255, 255, 0, 0.5)";  
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();
}
 
//player is a square ;)
var player = new (function(){
	var self = this;
	self.X = 200;
	self.Y = 200;	

	self.setPosition = function(x, y){
		self.X = x;
		self.Y = y;
	}

	self.draw = function(){
		 ctx.fillStyle = "rgba(0, 0, 255, 0.5)";  
		 ctx.fillRect (self.X, self.Y, 50, 50);  
	};
	
})();

var Shadow = function(){
	var self = this;
	self.X = 200;
	self.Y = 200;	

	self.setPosition = function(x, y){
		self.X = x;
		self.Y = y;
	}

	self.draw = function(){
		 ctx.fillStyle = "rgba(255, 0, 255, 0.5)";  
		 ctx.fillRect (self.X, self.Y, 50, 50);  
	};
	
	return self;
};




//Enable key actions
function setupKeys(){
    document.onkeypress=handleKeypress;
}

function handleKeypress(e){
    var unicode=e.keyCode? e.keyCode : e.charCode;
    var actualkey=String.fromCharCode(unicode)
    var x = player.X;
    var y = player.Y;
    //WASD move player up down left right
    if (actualkey == "w") y=y-10;
    if (actualkey == "w") moves[moves.length] = 'w';
    if (actualkey == "a") x=x-10;
    if (actualkey == "a") moves[moves.length] = 'a';
    if (actualkey == "s") y=y+10;
    if (actualkey == "s") moves[moves.length] = 's';
    if (actualkey == "d") x=x+10;
    if (actualkey == "d") moves[moves.length] = 'd';
    if (actualkey == "x") {
    	//reset doesnt work as its own function. god knows why.
    	x=200
    	y=200
    	showshadow = true;
    	i=0;
    	pastmoves[pastmoves.length]=moves;
    	moves= [];
    	shadows[shadows.length] = new Shadow();
	    for(l=0;l<shadows.length;l++) {
	        shadows[l].X = x;
	        shadows[l].Y = y;
	    }
	    
    }
   
    player.X = x;
    player.Y = y;
    
}

/* things that happen */
var GameLoop = function(){
	clear();
	player.draw(); 
	if (showshadow == true) {
		for(l=0;l<shadows.length;l++) {
			if (pastmoves[l][i] == "w") shadows[l].Y=shadows[l].Y-10;
		    if (pastmoves[l][i] == "a") shadows[l].X=shadows[l].X-10;
		    if (pastmoves[l][i] == "s") shadows[l].Y=shadows[l].Y+10;
		    if (pastmoves[l][i] == "d") shadows[l].X=shadows[l].X+10;
		    shadows[l].draw(); 
		}
	}
	gLoop = setTimeout(GameLoop, 1000 / 50);
	moves[moves.length] = "none";
	

i++
}

//put these in a init
setupKeys();
GameLoop();