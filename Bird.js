class Bird extends BaseClass {
  constructor(x,y){
    super(x,y,50,50);
    this.image = loadImage("sprites/bird.png");
    this.smoke=loadImage("sprites/smoke.png")
    this.arr=[]
  }

  display() {
    super.display();
    //[[x1,y1],[x2,y2],[x3,y3],....]
if(this.body.position.x>200 && this.body.velocity.x>10){
    var position1=[this.body.position.x,this.body.position.y]
    this.arr.push(position1)
}
    for(var i=0;i<this.arr.length;i++){
      image(this.smoke,this.arr[i][0],this.arr[i][1])
    }
  }
}
