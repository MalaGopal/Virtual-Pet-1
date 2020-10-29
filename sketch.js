var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg

function preload()
{
  dogImg = loadImage("/images/dogImg.png");
  happyDogImg = loadImage("/images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.3

foodStock = database.ref("Food");
foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);
  if(keyDown(UP_ARROW)){
  
    writeStock(foodS);
    dog.addImage(happyDogImg);
    dog.scale = 0.3
  }
  
  drawSprites();
  //add styles here
  textSize(10);
  fill("yellow")
text("Press up arrow to feed Drago some milk",250,20);
text("Food Remaining:"+foodS,200,250)
}
function readStock(data){
  foodS = data.val()
}
function writeStock(x){
  if(x <= 0){
    x = 0;
  }
    else{
      x= x-1;
    }
  
  database.ref("/").update({
    Food:x
  })
}

