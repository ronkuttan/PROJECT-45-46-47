class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(displayWidth-1000,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
    console.log(car2.x)

    ob1 = createSprite(430,-400,410,250);
    ob1.debug = false;
    ob1.setCollider("rectangle",0,-10,ob1.width,ob1.height)
    ob1.addImage("obstacle1",obstacle1)
    ob1.scale = 0.65;

    ob2 = createSprite(650,-1400,390,10);
    ob2.addImage("obstacle2",obstacle2)
    ob2.scale = 0.8;
    ob2.debug = false;
    ob2.setCollider("rectangle",0,0,ob2.width,110)
 
    ob3 = createSprite(1100,-3000,40,100);
    ob3.addImage("obstacle3",obstacle3)
    ob3.scale = 0.5;
    ob3.debug = false;
    ob3.setCollider("rectangle",0,0,ob3.width,ob3.height)
 
    ob4 = createSprite(950,-5400,150,540);
    ob4.addImage("obstacle4",obstacle4);
    ob4.scale = 0.7;
    ob4.debug = false;
    ob4.setCollider("rectangle",0,0,450,200)

    ob5 = createSprite(630,-7800,350,150);
    ob5.addImage("obstacle5",obstacle1)
    ob5.scale = 0.65;
    ob5.debug = false;
    ob5.setCollider("rectangle",0,0,350,250)
 
    ob6 = createSprite(880,-10900,20,20);
    ob6.addImage("obstacle6",obstacle2)
    ob6.scale = 0.85;
    ob6.debug = false;
    ob6.setCollider("rectangle",0,0,280,130)
    
    ob7 = createSprite(880,-13400,20,20);
    ob7.addImage("obstacle7",obstacle3)
    ob7.scale = 0.6;
    ob7.debug = false;
    ob7.setCollider("rectangle",0,0,150,180)
 
    ob8 = createSprite(520,-9400,20,20);
    ob8.addImage("obstacle8",obstacle4);
    ob8.scale = 0.75;
    ob8.debug = false;
    ob8.setCollider("rectangle",0,0,460,200)
 
    ob9 = createSprite(900,-2000,20,20);
    ob9.addImage("obstacle9",obstacle3)
    ob9.scale = 0.6;
    ob9.debug = false;
    ob9.setCollider("rectangle",0,0,150,180)

    ob10 = createSprite(630,-14800,20,20);
    ob10.addImage("obstacle10",obstacle1)
    ob10.scale = 0.65;
    ob10.debug = false;
    ob10.setCollider("rectangle",0,0,350,250)

    ob11 = createSprite(1110,-16900,20,20);
    ob11.addImage("obstacle11",obstacle2)
    ob11.scale = 0.85;
    ob11.debug = false;
    ob11.setCollider("rectangle",0,0,280,130)
    
    ob12 = createSprite(600,-19400,20,20);
    ob12.addImage("obstacle12",obstacle3)
    ob12.scale = 0.6;
    ob12.debug = false;
    ob12.setCollider("rectangle",0,0,150,200)
    
    ob13 = createSprite(820,-21400,20,20);
    ob13.addImage("obstacle13",obstacle4);
    ob13.scale = 0.75;
    ob13.debug = false;
    ob13.setCollider("rectangle",0,0,460,200)
    
    ob14 = createSprite(900,-22500,20,20);
    ob14.addImage("obstacle14",obstacle3)
    ob14.scale = 0.65;
    ob14.debug = false;
    ob14.setCollider("rectangle",0,0,160,190)

    moveUp = createSprite(1400,700,10,10)
    moveUp.addImage("up",moveUp_img)
    moveUp.scale = 0.15
    moveLeft = createSprite(1355,700,10,10)
    moveLeft.addImage("up",moveLeft_img)
    moveLeft.scale = 0.15
    moveRight = createSprite(1445,700,10,10)
    moveRight.addImage("up",moveRight_img)
    moveRight.scale = 0.15

    ob15 = createSprite(300,-11000,10,24000);
    ob15.visible = false;

    bulletLeft = createSprite(100,100,20,20);
    bulletLeft.addImage("bleft",bulletLeft_img)
    bulletLeft.scale = 0.1;
    
    bulletRight = createSprite(100,100,20,20);
    bulletRight.addImage("bleft",bulletRight_img);
    bulletRight.scale = 0.1;
    
    bulletUp = createSprite(100,100,20,20);
    bulletUp.addImage("bleft",bulletUp_img);
    bulletUp.scale = 0.1;
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*28,displayWidth, displayHeight*30);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
      //x=x+200
        
      //use data form the database to display the cars in y direction
      x = 250 + (index * 200) + allPlayers[plr].positionX;
      y = displayHeight - allPlayers[plr].distance;
        
        cars[index-1].x = x;
        cars[index-1].y = y;

       

        if (index === player.index){
          stroke(10);
          fill("purple");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
           moveUp.y = camera.y+190
          moveLeft.y = camera.y+243
          moveRight.y = camera.y+243;
          bulletUp.x = cars[index-1].x;
          bulletUp.y = cars[index-1].y;

          bulletLeft.x = cars[index-1].x;
          bulletLeft.y = cars[index-1].y;

          bulletRight.x = cars[index-1].x;
          bulletRight.y = cars[index-1].y;
         
          if(keyCode === 32  && player.index !== null ){
            bulletUp.velocityY = -5;
          }


           if( cars[index - 1].isTouching(ob1)){
           console.log("end")
           cars[index - 1].bounceOff(ob1);
          yVel -= 10;
          
          } 
            if( cars[index - 1].isTouching(ob2)){
              console.log("end")
              cars[index - 1].bounceOff(ob2);
              yVel -= 10;
              
            }
            if( cars[index - 1].isTouching(ob3)){
            console.log("end")
            cars[index - 1].bounceOff(ob3);
            yVel -= 10;
            
            }
            if( cars[index - 1].isTouching(ob4)){
            console.log("end")
            cars[index - 1].bounceOff(ob4);
            yVel -= 10;
            
            }
            if( cars[index - 1].isTouching(ob5)){
            console.log("end")
            cars[index - 1].bounceOff(ob5);
            yVel -= 10;
            
          }  
          
          if( cars[index - 1].isTouching(ob6)){
            console.log("end")
            cars[index - 1].bounceOff(ob6);
            yVel -= 10;
            
          }
          if( cars[index - 1].isTouching(ob7)){
          console.log("end")
          cars[index - 1].bounceOff(ob7);
          yVel -= 10;
          
          }
          if( cars[index - 1].isTouching(ob8)){
          console.log("end")
          cars[index - 1].bounceOff(ob8);
          yVel -= 10;
          
          }
          if( cars[index - 1].isTouching(ob9)){
          console.log("end")
          cars[index - 1].bounceOff(ob9);
          yVel -= 10;
          
        }  
        
        if( cars[index - 1].isTouching(ob10)){
          console.log("end")
          cars[index - 1].bounceOff(ob10);
          yVel -= 10;
          
        }
        if( cars[index - 1].isTouching(ob11)){
        console.log("end")
        cars[index - 1].bounceOff(ob11);
        yVel -= 10;
        
        }
        if( cars[index - 1].isTouching(ob12)){
        console.log("end")
        cars[index - 1].bounceOff(ob12);
        yVel -= 10;
        
        }
        if( cars[index - 1].isTouching(ob13)){
        console.log("end")
        cars[index - 1].bounceOff(ob13);
        yVel -= 10;
        
      }  
      if( cars[index - 1].isTouching(ob14)){
        console.log("end")
        cars[index - 1].bounceOff(ob14);
        yVel -= 10;
        
      } 
      if( cars[index - 1].isTouching(ob15)){
        console.log("end")
        cars[index - 1].bounceOff(ob15);
        xVel += 8;
        
      }  
      
       
        
 
         
        } 
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
// 
   // bulletUp.positionX += bulletVelY;
   // bulletVelY *= 2;
    
  
    if(player.distance < 24500){
      if(keyIsDown(38) && player.index !== null || mousePressedOver(moveUp) && player.index !== null){
          yVel += 0.95;
          if(keyIsDown(37) || mousePressedOver(moveLeft)){
              xVel -= 0.6;
          }
          if(keyIsDown(39) || mousePressedOver(moveRight)){
              xVel += 0.6;
          }
      }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
          yVel -= 0.1;
          xVel *= 0.9;
      }else{
          yVel *= 0.95;
          xVel *= 0.9;
      }
    }
  
    console.log(player.positionX)

  //move the car
  player.distance += yVel;
  yVel *= 0.95;
  player.positionX += xVel;
  xVel *= 0.9;
  player.update();
  //display sprites
  drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
