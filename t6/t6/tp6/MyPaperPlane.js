/**
 * MyPaperPlane
 * @constructor
 */
 function MyPaperPlane(scene,x,y,z) {
 	CGFobject.call(this,scene);	

 	this.initBuffers();
 	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.rotZ = 0;
 	this.move = 0;
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {

   this.vertices=[
   -1 , -0.5, 0,
   0 , -0.5 , 0,
   0 , -1 , 0,
   0 , -0.5 , -0.75,
   0 , -0.5 , 0.75
   ];

   this.indices = [
   0, 1, 2,
   2, 1, 0,
   0, 1, 3,
   0, 3, 1,
   0, 1, 4,
   0, 4, 1
   ];

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyPaperPlane.prototype.update = function(currTime) {
     if(this.move == 1){
		this.rotZ = 90;
	}
	
	 if (this.x > 0.9) {
		this.x -= (currTime * (7/1000));
	}
	else if (this.y > 0.9 && this.move == 1) {
		this.y -= (currTime *(7/1000));
	}
	else{
		this.move = 1;
	}
 };