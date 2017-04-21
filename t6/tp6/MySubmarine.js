/**
 * MySubmarine
 * @constructor
 */
  function MySubmarine(scene,x,y,z) {
 	CGFobject.call(this,scene);
 	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.rotY = -180;

    this.triangle = new MyTriangle(scene);
 	this.initBuffers();
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.display = function() {
     this.triangle.display();
 };

  MySubmarine.prototype.rotateLeft = function(speed) {
    this.rotY +=speed;
 };

   MySubmarine.prototype.rotateRight = function(speed) {
     this.rotY -=speed;
 };

   MySubmarine.prototype.moveForward = function(speed) {
    this.x += (speed / 20) * Math.sin(this.rotY * degToRad);
	this.z += (speed / 20) * Math.cos(this.rotY * degToRad);
 };

   MySubmarine.prototype.moveBack = function(speed) {
    this.x -= (speed / 40) * Math.sin(this.rotY * degToRad);
	this.z -= (speed / 40) * Math.cos(this.rotY * degToRad);
 };
