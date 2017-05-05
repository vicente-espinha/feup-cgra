/**
 * MySubmarine
 * @constructor
 */
  function MySubmarine(scene,x,y,z) {
 	CGFobject.call(this,scene);
 	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.rotY = -180;

   // this.triangle = new MyTriangle(scene);
    this.mainBody = new MyCylinder(this.scene,20,1);
    this.frontAndBack = new MyLamp(this.scene, 150, 8);
    this.top = new MyCylinderWithTop(this.scene,500);
    this.fins = new MyTrapezius(this.scene);
    this.quad = new MyUnitCubeQuad(this.scene);
    this.test = new MyPyramide(this.scene);
 	this.initBuffers();

 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function() {


     //main body created
 	 this.scene.pushMatrix();
 	 this.scene.scale(0.7,1,4);
     this.mainBody.display();
     this.scene.popMatrix();

     //front
     this.scene.pushMatrix();
     this.scene.rotate(180 * degToRad, 0,1,0);
     this.scene.scale(0.7,1,1);
     this.frontAndBack.display();
     this.scene.popMatrix();

     //back
     this.scene.pushMatrix();
     this.scene.translate(0,0,4);
     this.scene.scale(0.7,1,1);
     this.frontAndBack.display();
     this.scene.popMatrix();

     //top
     this.scene.pushMatrix();
     this.scene.translate(0,1,0.7);
     this.top.display();
     this.scene.popMatrix();

     //periscope vertical
     this.scene.pushMatrix();
     this.scene.translate(0,1.5,2.8);
     this.scene.scale(0.1,2,0.1)
     this.top.display();
     this.scene.popMatrix();

     //periscope horizontal
     this.scene.pushMatrix();
     this.scene.translate(0,2.7,2.9);
     this.scene.scale(0.15,0.05,0.7);
     this.scene.rotate(90* degToRad,1,0,0);
     this.top.display();
     this.scene.popMatrix();

 
     //helices
     this.scene.pushMatrix();

     this.scene.translate(-2,0,0);
     this.scene.scale(0.25,0.25,0.25);
     this.scene.translate(4.8,-3,0);
     this.mainBody.display();
     this.scene.popMatrix();
     this.scene.pushMatrix();

     this.scene.translate(-2,0,0);
     this.scene.scale(0.25,0.25,0.25);
     this.scene.translate(11,-3,0);
     this.mainBody.display();
     this.scene.popMatrix();


     this.scene.pushMatrix();
     this.scene.translate(-0.8,-0.75,0.1);
     this.scene.scale(0.23,0.05,0.01);
     this.quad.display();
     this.scene.popMatrix();

      this.scene.pushMatrix();
     this.scene.translate(0.75,-0.75,0.1);
     this.scene.scale(0.23,0.05,0.01);
     this.quad.display();
     this.scene.popMatrix();


      this.scene.pushMatrix();
      this.scene.translate(0.8,-0.75,0);
      this.scene.scale(0.1,0.1,0.05);
      this.frontAndBack.display();
      this.scene.popMatrix();
      this.scene.pushMatrix();
      this.scene.translate(-0.8,-0.75,0);
      this.scene.scale(0.1,0.1,0.05);
       this.frontAndBack.display();
      this.scene.popMatrix();
    
    //side fins
    this.scene.pushMatrix();
    this.scene.rotate(90*degToRad,1,0,0);
    this.fins.display();
    this.scene.popMatrix();
    //vertical fin
    this.scene.pushMatrix();
    this.scene.scale(1,1.1,1);
    this.scene.rotate(90* degToRad,0,0,1);
    this.scene.rotate(90* degToRad,1,0,0);
    this.fins.display();
    this.scene.popMatrix();
    //top fin
    this.scene.pushMatrix();
    this.scene.rotate(-90*degToRad,1,0,0);
    this.scene.scale(0.6,1,1);
    this.scene.translate(0,-2.1,1.2);
    this.fins.display();
    this.scene.popMatrix();
    

   

 };

  MySubmarine.prototype.rotateLeft = function(speed) {
    this.rotY +=speed;
 };

   MySubmarine.prototype.rotateRight = function(speed) {
     this.rotY -=speed;
 };

   MySubmarine.prototype.moveForward = function(speed) {
    this.x += (speed / 20) * Math.sin(this.rotY * degToRad);
	this.z += (speed / 20) * Math.cos(this.rotY * degToRad);
 };

   MySubmarine.prototype.moveBack = function(speed) {
    this.x -= (speed / 40) * Math.sin(this.rotY * degToRad);
	this.z -= (speed / 40) * Math.cos(this.rotY * degToRad);
 };
