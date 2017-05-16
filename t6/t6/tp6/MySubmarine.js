/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene, x, y, z) {
    CGFobject.call(this, scene);
    this.x = x;
    this.y = y;
    this.z = z;
    this.rotY = -180;
    this.rotX = 0;
    this.isMoving = 0;
    this.rotationVerticalFin = 90;
    this.rotationHorizontalFin = 90;
    this.rotateHelice = 0;
    this.periscope = 0;
    this.speed = 0;

    // this.triangle = new MyTriangle(scene);
    this.mainBody = new MyCylinder(this.scene,20,1);
    this.frontAndBack = new MyLamp(this.scene,150,8);
    this.top = new MyCylinderWithTop(this.scene,500);
    this.fins = new MyTrapezius(this.scene);
    this.quad = new MyUnitCubeQuad(this.scene);
    this.initBuffers();

}
;MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.display = function() {
    //makes the submarine move
    this.move();
    // this.VerticalFin(2);

    // confirms if it is moving
    if (this.speed != 0) {
        this.isMoving = 1;
    } else {
        this.isMoving = 0;
    }

    //main body created
    this.scene.pushMatrix();
    this.scene.scale(0.73, 1, 4.08);
    this.mainBody.display();
    this.scene.popMatrix();

    //front
    this.scene.pushMatrix();
    this.scene.rotate(180 * degToRad, 0, 1, 0);
    this.scene.scale(0.73, 1, 1);
    this.frontAndBack.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 4.07);
    this.scene.scale(0.73, 1, 1);
    this.frontAndBack.display();
    this.scene.popMatrix();

    //top
    this.scene.pushMatrix();
    this.scene.translate(0, 1, 0.7);
    this.top.display();
    this.scene.popMatrix();

    //periscope vertical
    this.scene.pushMatrix();
    this.scene.translate(0, 1.5 + this.periscope, 2.8);
    this.scene.scale(0.1, 2, 0.1)
    this.top.display();
    this.scene.popMatrix();

    //periscope horizontal
    this.scene.pushMatrix();
    this.scene.translate(0, 2.7 + this.periscope, 2.9);
    this.scene.scale(0.15, 0.05, 0.7);
    this.scene.rotate(90 * degToRad, 1, 0, 0);
    this.top.display();
    this.scene.popMatrix();

    //helices
    this.scene.pushMatrix();

    this.scene.translate(-2, 0, 0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.scene.translate(4.8, -3, 0);
    this.mainBody.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();

    this.scene.translate(-2, 0, 0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.scene.translate(11, -3, 0);
    this.mainBody.display();
    this.scene.popMatrix();

    
    this.scene.pushMatrix();
    this.scene.translate(-0.8, -0.75, 0.1);
    this.scene.scale(0.2, 0.05, 0.1);
    this.scene.rotate( this.rotateHelice  * this.speed, 0, 0, 1);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.75, -0.75, 0.1);
    this.scene.scale(0.2, 0.05, 0.1);
    this.scene.rotate( this.rotateHelice  * this.speed, 0, 0, 1);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0.8, -0.75, 0);
    this.scene.scale(0.1, 0.1, 0.05);
    this.frontAndBack.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
    this.scene.translate(-0.8, -0.75, 0);
    this.scene.scale(0.1, 0.1, 0.05);
    this.frontAndBack.display();
    this.scene.popMatrix();

    //side fins
    this.scene.pushMatrix();
    this.scene.rotate(this.rotationHorizontalFin * degToRad, 1, 0, 0);
    this.fins.display();
    this.scene.popMatrix();
    //vertical fin
    this.scene.pushMatrix();
    this.scene.scale(1, 1.1, 1);
    this.scene.rotate(90 * degToRad, 0, 0, 1);
    this.scene.rotate(this.rotationVerticalFin * degToRad, 1, 0, 0);
    this.fins.display();
    this.scene.popMatrix();
    //top fin
    this.scene.pushMatrix();
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
    this.scene.scale(0.6, 1, 1);
    this.scene.translate(0, -2.1, 1.2);
    this.fins.display();
    this.scene.popMatrix();
}
;

MySubmarine.prototype.movement = function(speed) {
    if (speed == 1) {
        this.speed = this.speed + 0.5;
    } else if (speed == 2) {
        this.speed = this.speed - 0.5;
    }
}
;

MySubmarine.prototype.rotateLeft = function() {
    if (this.speed < 0) {
        this.rotY -= this.speed;
    } else {
        this.rotY += this.speed;
    }
}
;

MySubmarine.prototype.rotateRight = function() {
    if (this.speed < 0) {
        this.rotY += this.speed;
    } else {
        this.rotY -= this.speed;
    }
}
;

MySubmarine.prototype.rotateHelices = function() {
   if (this.speed != 0) {
             this.rotateHelice = this.rotateHelice + Math.PI/10;
    }
}
;

MySubmarine.prototype.rotateUp = function() {
   if (this.rotX >= -35) {
            this.rotX -= this.speed; 
    }
}
;

MySubmarine.prototype.rotateDown = function() {
    if (this.rotX <= 35) {
            this.rotX += this.speed;
    }
}
;

MySubmarine.prototype.move = function() {
    this.x += (this.speed / 20) * Math.sin(this.rotY * degToRad);
    this.z += (this.speed / 20) * Math.cos(this.rotY * degToRad);
}
;

MySubmarine.prototype.moveVertical = function(up) {
  
    if(up == 1){
    this.y += (this.speed / 20) * Math.sin(-this.rotX * degToRad);
    this.z += (this.speed / 20) * Math.cos(-this.rotX * degToRad);
    }else if (up == 0){
    this.y -= (this.speed / 20) * Math.sin(this.rotX * degToRad);
    this.z -= (this.speed / 20) * Math.cos(this.rotX * degToRad);
    }
}
;

MySubmarine.prototype.VerticalFin = function(side) {

    if (side == 0 && this.isMoving == 1) {
        this.rotationVerticalFin = 120;
    } else if (side == 1 && this.isMoving == 1) {
        this.rotationVerticalFin = 60;
    } else {
        this.rotationVerticalFin = 90;
    }
}
;

MySubmarine.prototype.HoritonzalFin = function(side) {

    if (side == 0 && this.isMoving == 1) {
        this.rotationHorizontalFin  = 120;
    } else if (side == 1 && this.isMoving == 1) {
        this.rotationHorizontalFin  = 60;
    } else {
        this.rotationHorizontalFin  = 90;
    }
}
;

MySubmarine.prototype.PeriscopeMovement = function(direction) {

    console.log(this.periscope);
    if (direction == 1 && this.periscope < 0){
        this.periscope += 0.05;

    }else if( direction == 0 && this.periscope > -0.6){
        this.periscope -= 0.05;
    }
}
;
