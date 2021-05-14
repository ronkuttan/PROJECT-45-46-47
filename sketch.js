var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var positionX = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;
var obstacleGroup;
var obstacle1,obstacle2,obstacle3,obstacle4;
var ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8,ob9,ob10,ob11,ob12,ob13,ob14,ob15,ob16;
var moveUp ,moveRight ,moveLeft;
var moveUp_img, moveRight_img, moveLeft_img;
var bulletUp,  bulletLeft , bulletRight;
var bulletUp_img, bulletLeft_img, bulletRight_img;

function preload(){
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/car1.png");
  car2_img = loadImage("../images/car2.png");
  car3_img = loadImage("../images/car3.png");
  car4_img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");
  obstacle1 = loadImage("../images/obstacle1.png")
  obstacle2 = loadImage("../images/obstacle2.png")
  obstacle3 = loadImage("../images/obstacle3.png")
  obstacle4 = loadImage("../images/obstacle4.png")
  moveUp_img = loadImage("../images/up_arrow.png");
  moveLeft_img = loadImage("../images/left_arrow.png");
  moveRight_img = loadImage("../images/right_arrow.png");
  bulletLeft_img = loadImage("../images/bullet_left.png")
  bulletUp_img = loadImage("../images/bullet_up.png")
  bulletRight_img = loadImage("../images/bullet_right.png")

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  yVel = 0;
  xVel = 0;

  bulletVelY =0;
  bulletVelX = 0;

  xSet = false;
  obstacleGroup = new Group();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }

  
}
