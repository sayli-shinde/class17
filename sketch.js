var PLAY = 1;
var END =0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score,survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(50,340,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15
  
  ground = createSprite(200,390,600,10);
  
  
  score=0;
  survivalTime=0;
  FoodsGroup= new Group();
  obstaclesGroup = new Group();
  
  
}


function draw() {
  background("white");
  
  text("Score:"+score,500,50);
  text("Survival Time= "+survivalTime,50,50);
  
  
  if(gameState===PLAY){
    ground.velocityX=-4;
    survivalTime=Math.ceil(frameCount/frameRate());
    if(monkey.isTouching(FoodsGroup)){
      FoodsGroup.destroyEach();
      score=score+1;
    }
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
    }
     
    if(ground.x<300){
      ground.x = ground.width/2;
    }
  
 
    if(keyDown("space") && monkey.y>=330){
      monkey.velocityY = -12;
    }
    monkey.velocityY=monkey.velocityY+0.3  
    spawnObstacles();
    spawnBananas();
    
  }
  else if (gameState=== END){
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    FoodsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodsGroup.setLifetimeEach(-1);
  }
  
  
  monkey.collide(ground);
  drawSprites();
  
}

function spawnObstacles(){
  if(frameCount % 300 ===0){
    obstacle = createSprite(600,340);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    obstacle.velocityX = -3 
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas(){
  if(frameCount % 150 ===0){
    banana = createSprite(600,200);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    
    banana.scale=0.1;
    banana.velocityX =-3;
    banana.lifetime=300;
    FoodsGroup.add(banana);
  }
  
  
}






