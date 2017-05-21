/**
 * MyPyramide
 * @constructor
 */
 function MyPyramide(scene) {
 	CGFobject.call(this, scene);
    this.sides = new MyQuad(this.scene);
 	this.pyramide = new MyTriangle(this.scene);
 };

 MyPyramide.prototype = Object.create(CGFobject.prototype);
 MyPyramide.prototype.constructor = MyPyramide;

 MyPyramide.prototype.display = function() {
 	

   this.scene.pushMatrix();
   this.pyramide.display();
   this.scene.popMatrix();
   this.scene.pushMatrix();
  this.scene.translate(0,0,-1);
   this.pyramide.display();
   this.scene.popMatrix();


   this.scene.pushMatrix();
   this.scene.rotate(90* degToRad,0,1,0);
   this.scene.rotate(-45* degToRad,1,0,0);
   this.scene.scale(0.52,0.7,1);
  this.scene.translate(0.95,0,0.72);
   this.sides.display();
   this.scene.popMatrix();

     this.scene.pushMatrix();
   this.scene.rotate(90* degToRad,0,1,0);
   this.scene.rotate(-45* degToRad,1,0,0);
   this.scene.rotate(-180* degToRad,1,0,0);
   this.scene.scale(0.52,0.7,1);
  this.scene.translate(0.95,0,-0.72);
   this.sides.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(90*degToRad,1,0,0);
    this.scene.translate(0.5,-0.5,0);
   this.scene.scale(0.5,0.5,1);
  
   this.sides.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(90*degToRad,1,0,0);
   this.scene.scale(0.5,0.5,1);
   this.scene.translate(1,-0.9,0);
   this.scene.rotate(-180* degToRad,1,0,0);
   this.sides.display();
   this.scene.popMatrix();

   this.scene.pushMatrix();
   this.scene.rotate(90*degToRad,0,1,0);
   this.scene.rotate(-180*degToRad,0,1,0);
    this.scene.translate(-0.5,0.5,0);
   this.scene.scale(0.5,0.5,1);
  
   this.sides.display();
   this.scene.popMatrix();

 };
