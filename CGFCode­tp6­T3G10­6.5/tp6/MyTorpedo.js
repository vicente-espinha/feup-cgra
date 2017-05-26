function MyTorpedo(scene, x, y, z, target) {
    CGFobject.call(this, scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.target = target;
    this.isCollided= false;
     this.t = 0;
    this.rotY = -180;
    this.rotX = 0;
    this.isMoving = 0;
    this.rotationVerticalFin = 90;
    this.rotationHorizontalFin = 90;
    this.rotateHelice = 0;
    this.periscope = 0;
    this.speed = 0;
    this.rotacaoY =0;
    this.rotacaoX =0;
   
this.bezierPoints = [];
     this.bezierPoints.push(this.x,this.y,this.z);
     this.bezierPoints.push(this.x,this.y,this.z-6);
     this.bezierPoints.push(this.x,this.y+3,this.z);
     this.bezierPoints.push(this.target.coordX,this.target.coordY,this.target.coordZ);
      
    // this.triangle = new MyTriangle(scene);
    this.mainBody = new MyCylinder(this.scene,20,1);
    this.frontAndBack = new MyLamp(this.scene,150,8);
   
    this.fins = new MyTrapezius(this.scene);
   
    this.initBuffers();

}
;MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.display = function() {
    
    this.scene.rotate(this.rotacaoY,0,1,0);
    this.scene.rotate(-this.rotacaoX,1,0,0);
  
    //main body created
    this.scene.pushMatrix();
    this.scene.scale(0.3, 0.3, 2.08);
    this.mainBody.display();
    this.scene.popMatrix();

    //front
    this.scene.pushMatrix();
    this.scene.rotate(180 * degToRad, 0, 1, 0);
    this.scene.scale(0.3, 0.3, 1);
    this.frontAndBack.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2.07);
    this.scene.scale(0.3, 0.3, 1);
    this.frontAndBack.display();
    this.scene.popMatrix();

    

   
    
    //side fins
    this.scene.pushMatrix();
    this.scene.scale(0.5,1,1);
    this.scene.rotate(this.rotationHorizontalFin * degToRad, 1, 0, 0);
    this.fins.display();
    this.scene.popMatrix();
    //vertical fin
    this.scene.pushMatrix();
    this.scene.scale(1, 0.5, 1);
    this.scene.rotate(90 * degToRad, 0, 0, 1);
    this.scene.rotate(this.rotationVerticalFin * degToRad, 1, 0, 0);
    this.fins.display();
    this.scene.popMatrix();
   
  
};


MyTorpedo.prototype.bezierFormula = function(t){
    this.xAntes = this.x;
    this.YAntes = this.y;
    this.ZAntes = this.z;

    this.x = Math.pow(1-t,3)*this.bezierPoints[0] + 3*t*Math.pow(1-t,2)*this.bezierPoints[3]+3*Math.pow(t,2)*(1-t)*this.bezierPoints[6]+Math.pow(t,3)*this.bezierPoints[9];
    this.y = Math.pow(1-t,3)*this.bezierPoints[1] + 3*t*Math.pow(1-t,2)*this.bezierPoints[4]+3*Math.pow(t,2)*(1-t)*this.bezierPoints[7]+Math.pow(t,3)*this.bezierPoints[10];
    this.z = Math.pow(1-t,3)*this.bezierPoints[2] + 3*t*Math.pow(1-t,2)*this.bezierPoints[5]+3*Math.pow(t,2)*(1-t)*this.bezierPoints[8]+Math.pow(t,3)*this.bezierPoints[11];
   // console.log(t);
    this.deltaX = this.x - this.xAntes;
     this.deltaY = this.y - this.YAntes;
      this.deltaZ = this.z - this.ZAntes;
      this.rotacaoY = Math.atan(this.deltaX/this.deltaZ);
      this.rotacaoX = Math.atan(this.deltaY/Math.sqrt(Math.pow(this.deltaX,2)+Math.pow(this.deltaY,2)+Math.pow(this.deltaZ,2)));
     console.log(this.deltaX);
};



MyTorpedo.prototype.movement = function(){

  if(this.t <=1){
  this.t = this.t + (this.incT);
  this.bezierFormula(this.t);
  }
 // if(this.y == this.target.coordY){
   //   console.log("hi");
    //}
  
};

MyTorpedo.prototype.distance = function(){
  this.dist = Math.sqrt(Math.pow(this.target.coordX-this.x,2)+(this.target.coordY-this.y,2),(this.target.coordZ-this.z,2));
  this.incT = (1/1000)*this.dist;
};