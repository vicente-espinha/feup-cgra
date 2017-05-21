/**
 * MyCylinderWithToys
 * @constructor
 */
 function MyCylinderWithToys(scene,slices,stacks) {
 	CGFobject.call(this, scene);

 	this.slices = slices;
 	this.stacks = stacks;

 	this.mycylinder = new MyCylinder(this.scene,this.slices,this.stacks);
 	this.mycylinder.initBuffers();

 	this.mycircle = new MyCircle(this.scene,this.slices);
 	this.mycircle.initBuffers();

 	this.clockAppearence = new CGFappearance(this.scene);
	this.clockAppearence.loadTexture("../images/clock.png");
	this.clockAppearence.setAmbient(0.24,0.24,0.24,1);
	this.clockAppearence.setDiffuse(0.24,0.24,0.24,1);
	this.clockAppearence.setSpecular(0.5,0.5,0.5,1);	
	this.clockAppearence.setShininess(5);
 };

  MyCylinderWithToys.prototype = Object.create(CGFobject.prototype);
  MyCylinderWithToys.prototype.constructor =  MyCylinderWithToys;

  MyCylinderWithToys.prototype.display = function() { 	
 	

 	this.mycylinder.display();
    this.scene.pushMatrix();
 	this.scene.translate(0,0,1);
 	this.clockAppearence.apply();
 	this.mycircle.display();
 	this.scene.popMatrix();
 }
