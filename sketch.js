var tower,towerImage,door,doorImage,doorsGroup,climbersGroup,invisibleblockGroup;
var climber,climberImage,Invisibleblock,InvisibleblockImage;
var ghost,ghostImage,spookySound,jumpSound;
var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
     towerImage=loadImage("tower.png");
     climberImage=loadImage("climber.png");
     doorImage=loadImage("door.png");
     ghostImage=loadImage("ghost-standing.png");
  
     spookySound=loadSound("Gamesound.wav");
     jumpSound=loadSound("jumpsound.wav");
}

function setup(){
     createCanvas(600,600);
    
     spookySound.loop();
     tower=createSprite(300,300);
     tower.addImage(towerImage);
     tower.velocityY=4;
  
     ghost=createSprite(200,200,50,50);
     ghost.addImage(ghostImage);
     ghost.scale=0.3;
  
     doorsGroup=new Group();
     climbersGroup=new Group();
     invisibleblockGroup=new Group();
     

}


function draw() {
     background(0);
  
     if(gameState===PLAY){
        if(tower.y>400){
           tower.y=300;
        } 
       
     if(keyDown("space")){
        ghost.velocityY=-9;
        jumpSound.play();
        } 
     ghost.velocityY=ghost.velocityY+0.7;
       
     if(keyDown("left_arrow")){
        ghost.x=ghost.x-3;
        } 
     if(keyDown("right_arrow")){
        ghost.x=ghost.x+3;
        } 
       
     if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
        ghost.destroy();
        gameState=END;       
      }
       if(climbersGroup.isTouching(ghost)){
           ghost.velocityY=0;
          }
       
     }
  
      if(gameState===END){
            stroke("yellow");
            textSize(30);
            fill("yellow");
            text("GameOver",230,230);
            doorsGroup.destroyEach();
            climbersGroup.destroyEach();
            invisibleblockGroup.destroyEach();
       
     }
      
      spawnDoors();
      drawSprites();
     
  
}


function spawnDoors(){
      if(frameCount%170==0){
         door=createSprite(200,-50);
         door.addImage(doorImage);
         door.velocityY=2;
         door.lifetime=300;
         
         door.x=Math.round(random(100,300));       
         
                 
         climber=createSprite(200,10);
         climber.addImage(climberImage);
         climber.velocityY=2;
         climber.x=door.x;
         climber.lifetime=300;
        
         
         invisibleblock=createSprite(200,15);
         invisibleblock.width=climber.width;
         invisibleblock.height=3;
         invisibleblock.velocityY=2;
         invisibleblock.x=climber.x;
         invisibleblock.lifetime=300;
        
         doorsGroup.add(door);
         climbersGroup.add(climber);
         invisibleblockGroup.add(invisibleblock);
        
        
         ghost.depth=door.depth;
         door.depth=door.depth+1;
               
      }

}