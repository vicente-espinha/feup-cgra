/**
 * MyCylinderWithTop
 * @constructor
 */
 function MyCylinderWithTop(scene, slices) {
 	CGFobject.call(this, scene);
    this.slices = slices;
 	this.cylinder = new MyCylinder(this.scene, this.slices, 1);
 	
 	this.circle = new MyCircle(this.scene, this.slices);

 };

 MyCylinderWithTop.prototype = Object.create(CGFobject.prototype);
 MyCylinderWithTop.prototype.constructor = MyCylinderWithTop;

 MyCylinderWithTop.prototype.display = function() {

     //body
     
     this.scene.translate(0,0,1.8);
     this.scene.scale(0.5,0.57,0.88);
     this.scene.rotate(-90*  degToRad,1,0,0);
     this.cylinder.display();
     

   //  //top
     this.scene.pushMatrix();
     this.scene.translate(0,0,1);
    // this.scene.rotate(-90* degToRad,1,0,0);
     this.circle.display();
    this.scene.popMatrix();

 	
 };
