var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, stopingmonkey, monkey_running, invisibleGround;
var bananaGroup, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, banana, bananaImage, survialTime=20, SurvialTime;
var life = 5;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 stopingmonkey = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png","obstacle.png");
}

function setup() {
  createCanvas(500, 500);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
  
  monkey=createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("stopped", stopingmonkey);
  monkey.scale=0.1;
  
  


 ground=createSprite(400, 350, 500, 10);
 ground.velocitX=-4;
 ground.x=ground.width/2;
  console.log(ground.x)
  
  
  

 
}
function draw() {
background("lightblue");
  text("life: "+ life , 250,50); 
  
  
   monkey.velocityY = monkey.velocityY + 0.8;      
  
 
  monkey.collide(ground);     
  
 
  
  if(monkey.isTouching(bananaGroup)){
      SurvialTime = survialTime+3;
      
  }
  
  if(gameState === PLAY){
    
     SurvialTime = SurvialTime + 3;
    
   if(monkey.isTouching(obstacleGroup)){
     life = life - 1;
    reset();
   } 
    
    if(life === 0){
      gameState = END;
    }
    
   spawnbanana();
  spawnobstacle();
    
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12 ;
    }
     stroke("black");
  textSize(20);
  fill("black");
  survialTime=Math.ceil(frameCount/frameRate())
  text("Survial Time: "+ survialTime, 100, 50);
    
     if(monkey.isTouching(obstacleGroup)){
        gameState = END;
        
     }
    
  }
   if(gameState === END){
     
     ground.velocityX = 0;
    monkey.velocityY = 0;
     
      monkey.changeAnimation("stopped", stopingmonkey);
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);   
     
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     }
  
  drawSprites();
}

function reset(){
  
 gameState=PLAY;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);
  
  
}
  

function spawnbanana(){
  if (frameCount % 100 === 0) {
    var banana = createSprite(400,250,40,10);
    banana.y = Math.round(random(200,260));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
               
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}
function spawnobstacle(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(340,310,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -3;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}
