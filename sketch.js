
var PLAY = 1;
var END = 0;
var gameState =1;

var knife, knifeImage;

var  fruit, fruit1, fruit2, fruit3, fruit4, fruitGroup ;

var score;

var monster,  enemyGroup, monsterImage;

var gameover,gameoverImage;

var sound , sound1;

var p,q;

function preload(){

sound = loadSound("knifeSwooshSound.mp3");
sound1 = loadSound("gameover.mp3");
  
knifeImage=loadImage("sword.png") ;
  
gameoverImage=loadImage("gameover.png");
  
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
  
monsterImage = loadAnimation("alien1.png","alien2.png");
}

function setup(){
 createCanvas(600,600);
 
 // creating kinfe 
  knife = createSprite(40,200,20,20); 
  knife.addImage("sword.png", knifeImage);
  knife.scale = 0.7;
   
  knife.setCollider("circle",0,0,50);
  //knife.debug=false;
  
  score = 0;
  
  gameover =createSprite(300,300);
  gameover.addImage("gameover.png",gameoverImage)
  gameover.scale=1;
  
  fruitGroup = createGroup();
  
  enemyGroup = createGroup();
}


function draw(){
  background("lightblue");
  fill("black");
 text("Score: "+ score, 500,50);
  
  fill("red");
  textSize(30);
  text("*FRUIT NINJA*", 190,50);
  
  if(gameState===PLAY){
     
    gameover.visible=false;
    
    //Call fruits and Enemy function
    spawn_fruit();
    spawn_enemy();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+1;
      sound.play();
    }
    if(enemyGroup.isTouching(knife)){     
    sound1.play();    
         
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
     gameState=END;   
        
    }
    
     if(gameState===END){ 
        
        gameover.visible=true;
        
        
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.changeImage(gameoverImage);
        knife.x=200;
        knife.y=200;
      }
     
  }
  drawSprites();
}


function spawn_fruit(){
  if(World.frameCount%90===0){
    fruit= createSprite(600,200,20,20);
    fruit.scale=0.2;
 
var rand=Math.round(random(1,4));
  switch(rand){
 case 1: fruit.addImage(fruit1);
         break;
 case 2: fruit.addImage(fruit2);
      break;
 case 3: fruit.addImage(fruit3);
      break;
 case 4: fruit.addImage(fruit4);
      break;
 default: break; 
  }
 fruit.y=Math.round(random(50,340));
    
    p=Math.round(random(1,2));
    
    if(p===1){
    fruit.velocityX=-(7+Math.round(score/4));
      fruit.x=600;
    }
    else if (p===2){
     fruit.velocityX=(7+Math.round(score/4));
      fruit.x=0;
    }
   
    fruit.setLifetime=100;
    
   fruitGroup.add(fruit);
  }
}

function spawn_enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    
    monster.setLifetime=50;
    
     q=Math.round(random(1,2));
    
    if(q===1){
    monster.velocityX=-(8+Math.round(score/10));
      monster.x=600;
    }
    else if (q===2){
    monster.velocityX=(8+Math.round(score/10)); 
      monster.x=0;
    }
    
    enemyGroup.add(monster);
  }
}