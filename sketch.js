var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg,zombieImg1;
var bullet, bulletImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;
var bulletGroup;

var score = 0;
var life = 3;
var bullets = 70;

var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;
var restart, restartImg;
 
function preload(){
  
  heart1Img = loadImage("assets/h1.png")
  heart2Img = loadImage("assets/h2.png")
  heart3Img = loadImage("assets/h3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bulletImg = loadImage("assets/bullet.png");

  zombieImg = loadAnimation("assets/1.png","assets/2.png","assets/3.png","assets/4.png")
  
  bgImg = loadImage("assets/bg1.jpg")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")
  restartImg=loadImage("assets/restart.png")


   
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
 player = createSprite(100,100,100,100)
 player.addImage("silas",shooterImg);
 player.addImage("shooting",shooter_shooting);
 player.scale=0.35;
 
 


 zombieGroup = new Group();
 bulletGroup = new Group();
 
 heart1 = createSprite(windowWidth-100,50,10,10)
 heart1.addImage("d",heart1Img);
 heart1.visible=false
 heart1.scale=0.2

 heart2 = createSprite(windowWidth-100,50,10,10)
 heart2.addImage("d",heart2Img);
 heart2.visible=false;
 heart2.scale=0.2
 
 heart3 = createSprite(windowWidth-100,50,10,10)
 heart3.addImage("e",heart3Img);
 heart3.scale=0.2

 restart=createSprite(windowWidth/2,windowHeight-200)
 restart.addImage("f",restartImg)
 
 restart.visible=false;

}
function draw() {
  background(bgImg); 
  textSize(20)
  fill("red")
  text("bullets:"+bullets,windowWidth-130,20)
  text("score:"+score,windowWidth-250,20)
  if(gameState =="fight"){

  
  if (keyWentDown("space")&& bullets>0){
  bullets=bullets-1;
  player.changeImage("shooting");
  spawnbullets();
  }
   else if(keyWentUp("space")){
    player.changeImage("silas")
   }


  if(bulletGroup.isTouching(zombieGroup)){
    score=score+2
    zombieGroup.destroyEach();
    winning.play()
    if(score%10==0){
     bullets=bullets+5
    }
    if(life==1||life==2&&score%50==0){
    life=life+1
    }
  }
 
  
  
  
  if(life===3){
  heart3.visible=true;
  heart2.visible=false
  heart1.visible=false
  }
  else if(life===2){
  heart2.visible=true
  heart3.visible=false
  heart1.visible=false
  }
  else if(life===1){
  heart1.visible=true;
  heart2.visible=false
  heart3.visible=false
  }
  else {
    heart1.visible=false;
  heart2.visible=false
  heart3.visible=false
  }

 spawnzombies()
 if(keyDown("DOWN_ARROW")){
  player.y=player.y+30;
 }

 if(keyDown("UP_ARROW")){
  player.y=player.y-30;
 }

 if(keyDown("RIGHT_ARROW")){
  player.x=player.x+30;
 }

 if(keyDown("LEFT_ARROW")){
  player.x=player.x-30;
 }

  

  if(keyDown("space")){
    explosionSound.play()
   }
   if ( bullets<=0){
  
    gameState = "end"
    life=0;
    }
    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching){
          zombieGroup[i].destroy()
        }
      }
      life=life-1
      if(life==0){
        gameState="end"
      }
    }
  }
  if(gameState=="end"){
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
    player.visible=false;
    textSize(50)
    text("GAMEOVER",windowWidth/2,windowHeight/2)
    restart.visible=true
    lose.play()
    gameState="restart"
    }
    if(mousePressedOver(restart)&& gameState=="restart"){
     
      gameState = "fight";
      life=3;
      bullets=70;
      score=0;
      restart.visible=false;
      player.visible=true
      player.changeImage("silas")
    }
  
  drawSprites();

}

function spawnzombies(){
  if (frameCount % 100 == 0){
    var r = Math.round(random(300,500))
    zombie = createSprite(windowWidth, r, 20, 50)
    zombie.addAnimation("v", zombieImg)
    zombie.velocityX = -50;
    zombie.scale = 0.5;
    zombie.lifetime = windowWidth/5
    zombieGroup.add(zombie)

  }
}

function spawnbullets(){

    bullet = createSprite(10,10, 20, 50)
    bullet.x=player.x
    bullet.y=player.y
    bullet.addImage("e",  bulletImg)
    bullet.velocityX = +50;
    bullet.scale = 0.10;
    bullet.lifetime = windowWidth-200;
    bulletGroup.add( bullet)
    

  
}

