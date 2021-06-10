const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint

var engine, world;
var box1, pig1;
var backgroundImg,platform;

var gamestate=1
var lives = 3

var score=0
function preload() {
    loading=loadImage("sprites/giphy.gif")
    star=loadImage("sprites/images.png")
    time()
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,100);
    
    connect=new Slingshot(bird.body,{
        x:200,y:50
    })
}

function draw(){
    if(backgroundImg){

    
    background(backgroundImg);
    } else{
        background(loading)
    }
    Engine.update(engine);
    fill("lime")
    textSize(25)
    text("Score: "+score,900,50)
    text("Lives: "+lives,900,100)

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.scoreboard()
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.scoreboard()
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    connect.display()

    if(lives<=0){
        if(score===200){
        image(star,300,100)
        image(star,600,100)
    } else if(score === 400){
        image(star,150,100)
        image(star,400,100) 
        image(star,700,100)
    }
    }


}
function mouseDragged(){
    if(gamestate===1 && mouseX>=0 && mouseX<200){
    Matter.Body.setPosition(bird.body,{
        x:mouseX,y:mouseY
    })
}
}

function mouseReleased(){
    connect.flying()
    gamestate=0
    lives=lives-1
}

function keyPressed(){
    if(keyCode===32 && lives>=1 ){
        Matter.Body.setPosition(bird.body,{
            x:200,y:50
        })
    connect.attach(bird.body)
    bird.arr=[]
    gamestate =1
    }
}

async function time(){
    var chek= await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var type=await chek.json()
    var dt= type.datetime
    var hour = dt.slice(11,13)
    console.log(hour)
    if(hour>=6&& hour<=18){
        bg= "sprites/bg.png"
    }
    else{
bg="sprites/bg2.jpg"
    }
    backgroundImg=loadImage(bg)
}