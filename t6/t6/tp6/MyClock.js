/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	this.handAppearence = new CGFappearance(this.scene);
	this.handAppearence.setAmbient(0,0,0,0);
	this.handAppearence.setDiffuse(0,0,0,0);
	this.handAppearence.setSpecular(0,0,0,0);	
	this.handAppearence.setShininess(0);	

	this.clock = new MyCylinderWithToys(this.scene, this.slices, this.stacks);
	this.clock.initBuffers();

	this.seconds = new MyClockHand(this.scene, 0.8);
	this.seconds.initBuffers();
	this.seconds.setAngle(270);
	this.minutes = new MyClockHand(this.scene,0.7);
	this.minutes.initBuffers();
	this.minutes.setAngle(180);
	this.hours = new MyClockHand(this.scene, 0.4);
	this.hours.initBuffers();
	this.hours.setAngle(90);
	
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
 	
 	var ToRad = Math.PI / 180.0;

    this.scene.pushMatrix();    
	this.clock.display();	
    this.scene.popMatrix();

    this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1);
	this.handAppearence.apply();
	this.seconds.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1);
	this.handAppearence.apply();
	this.minutes.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.0, 0.0, 1);
	this.handAppearence.apply();
	this.hours.display();
	this.scene.popMatrix();
	
};

MyClock.prototype.update = function(currTime) {
    var inc = currTime * (360 / (60 * 1000));
	this.seconds.setAngle(this.seconds.ang + inc);
	this.minutes.setAngle(this.minutes.ang + inc / 60);
	this.hours.setAngle(this.hours.ang + inc / 3600);
	
};