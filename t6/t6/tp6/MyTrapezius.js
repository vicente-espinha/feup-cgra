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
 
   this.scene.scale(1,0.3,0.05);
   this.quad.display();

   this.scene.scale(1,2,2);
   this.scene.translate(0.95,-0.5,0.5);
   this.triangular.display();
 
   
   this.scene.scale(1,1,1);
    this.scene.rotate(180* degToRad,1,0,0);
   this.scene.rotate(180* degToRad,0,0,1);
   this.scene.translate(1.9,0,1);
   this.triangular.display();

 	
 };
