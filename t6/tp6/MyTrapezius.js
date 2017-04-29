/**
 * MyUnitCubeQuad
 * @constructor
 */
 function MyTrapezius(scene) {
 	CGFobject.call(this, scene);
 	this.quad = new MyUnitCubeQuad(this.scene);
 };

 MyTrapezius.prototype = Object.create(CGFobject.prototype);
 MyTrapezius.prototype.constructor = MyTrapezius;

 MyTrapezius.prototype.display = function() {

   this.scene.pushMatrix();
   this.scene.scale(2.5,0.7,0.05);
   this.quad.display();
   this.scene.popMatrix();
 	
 	
 };
