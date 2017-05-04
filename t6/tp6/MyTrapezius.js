/**
 * MyTrapezius
 * @constructor
 */
 function MyTrapezius(scene) {
 	CGFobject.call(this, scene);
 	this.quad = new MyUnitCubeQuad(this.scene);
 	this.triangular = new MyPyramide(this.scene);
 };

 MyTrapezius.prototype = Object.create(CGFobject.prototype);
 MyTrapezius.prototype.constructor = MyTrapezius;

 MyTrapezius.prototype.display = function() {
   //rectangular part
   this.scene.pushMatrix();
   this.scene.scale(2.5,0.7,0.05);
   this.quad.display();
   this.scene.popMatrix();
   //triangluar part
   this.scene.pushMatrix();
   this.scene.scale(1,1.3,0.5);
   this.scene.translate(1.25,-0.25,0);
   this.triangular.display();
   this.scene.popMatrix();
   this.scene.pushMatrix();
   this.scene.rotate(180* degToRad,0,1,0);
   this.scene.scale(1,1.3,0.5);
   this.scene.translate(1.25,-0.25,0);
   this.triangular.display();
   this.scene.popMatrix();
 	
 };
