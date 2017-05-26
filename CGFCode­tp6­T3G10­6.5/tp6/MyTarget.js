/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, coordX, coordY, coordZ) {
 	CGFobject.call(this, scene);
    this.coordX = coordX;
    this.coordY = coordY;
    this.coordZ = coordZ;
    this.collision= false;
 	this.quad = new MyQuad(this.scene);
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function() {
     this.scene.translate(this.coordX, this.coordY, this.coordZ);
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0,1 );
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(180 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 1);
 	this.quad.display();
 	this.scene.popMatrix();
 };
