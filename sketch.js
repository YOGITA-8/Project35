var bgImage;
var balloon,balloonAnimation,balloonImage;
var database,position;



function preload(){

  //loading image for bgImage
  bgImage = loadImage("Hot Air Ballon-01.png");
  //loading image gor balloonImage
  balloonImage = loadImage("Hot Air Ballon-02.png");
  //loading animation for balloon
  balloonAnimation= loadAnimation("Hot Air Ballon-02.png",
  "Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}



function setup() {

  createCanvas(950,600);

  database = firebase.database();

  var balloonPosition = database.ref("balloon/positions");
  balloonPosition.on ("value",readPosition,showError);

  balloon = createSprite(90,460);
  balloon.addImage("balloon",balloonImage);
  balloon.addAnimation("ballloon",balloonAnimation);
  balloon.scale = 0.5;
}



function draw() {

  background(bgImage);  

  if (keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    balloon.changeAnimation("ballloon",balloonAnimation);
    //balloon.x = balloon.x - 10;
  }
  else if (keyDown(RIGHT_ARROW)){
    updatePosition(10,0);
    balloon.changeAnimation("ballloon",balloonAnimation);
    //balloon.x = balloon.x + 10;
  }
  else if (keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.changeAnimation("ballloon",balloonAnimation);
    balloon.scale = balloon.scale - 0.01;
    //balloon.y = balloon.y - 10;
  }
  else if (keyDown(DOWN_ARROW)){
    updatePosition(0,10);
    balloon.changeAnimation("ballloon",balloonAnimation);
    balloon.scale = balloon.scale + 0.01;
    //balloon.y = balloon.y + 10;
  }
 
  //text...........
  stroke ("purple");
  fill("purple");
  textFont("Bradley Hand ITC");
  textSize(25);
  text("Press arrow keys to move Hot Air Balloon!",20,20);

  drawSprites();
}



function updatePosition(x,y){
  database.ref("balloon/positions").set({
    'x' : balloon.x + x , 
    'y' : balloon.y + y
  });
}



function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}



function showError(){
  console.log("Error in writing to the database");
}