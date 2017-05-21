/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene, size) 
{
	CGFobject.call(this, scene);

	this.ang = 0;
	this.size = size || 0.5;
	this.cylinder = new MyCylinder(this.scene, 4, 1);
	this.cylinder.initBuffers();
};
 MyClockHand.prototype = Object.create(CGFobject.prototype);
  MyClockHand.prototype.constructor =  MyClockHand;

  MyClockHand.prototype.display = function() { 	
 	
 	var degToRad = Math.PI / 180.0;
    this.scene.pushMatrix();
	this.scene.rotate((90 - this.ang) * degToRad, 0, 0, 1);
	this.scene.rotate(Math.PI / 4, 1, 0, 0);
	this.scene.rotate(Math.PI / 2, 0, 1, 0);
	this.scene.scale(0.015, 0.015, this.size);
	this.cylinder.display();
	this.scene.popMatrix();
 };

 MyClockHand.prototype.setAngle = function(ang){
    this.ang = ang;
};
