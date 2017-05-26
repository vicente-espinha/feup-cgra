/**
 * MyFish
 * @constructor
 */
 function MyFish(scene,x,y,z) {
 	CGFobject.call(this, scene);

 	this.myUnitCubeQuad = new MyQuad(this.scene);
 	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.rotY = 0;
 	this.rotZ = 0;
 	this.move = 0;
 };

 MyFish.prototype = Object.create(CGFobject.prototype);
 MyFish.prototype.constructor = MyFish;

 MyFish.prototype.display = function() { 	
    this.scene.pushMatrix();
    this.scene.translate(2,2,2);
    this.scene.fish1.apply();
    this.scene.scale(2,1,2);
    this.myUnitCubeQuad.display(); 
    this.scene.rotate(Math.PI,0,1,0);
    this.scene.fish2.apply();
    this.myUnitCubeQuad.display();
    this.scene.popMatrix();
 };

  MyFish.prototype.move2 = function(currTime) {
     /* var l = Math.floor(Math.random() * 2);	

      if(l == 0){
       this.rotY +=90;
       for(var i = 0; i < 45; i++){*/
       if(this.move == 0){
           this.move3(currTime);
       }else if(this.move == 1){
           this.move4(currTime);
       }else if (this.move == 2){
           this.move5(currTime);
       }else if (this.move == 3){
           this.move6(currTime);
       }       /*  }

      }else if(l == 1){
          this.rotY -= 90;
        for(var i = 0; i < 45; i++){
          this.moveLeft(currTime);
          }
      }*/
 };

 MyFish.prototype.move3 = function(currTime) {

     if(this.move == 1){
		this.rotZ = 90;
	}
	
	 if (this.x > 0.9) {
		this.x -= (currTime * (7/1000));
	}
	else{
		this.move = 1;
		this.rotZ = 90;
	}
 };
 MyFish.prototype.move4 = function(currTime) {

     if(this.move == 2){
		this.rotZ += 90;
	}
	
	 if (this.y > 0.9 && this.move == 1) {
		this.y -= (currTime *(7/1000));
	}
	else{
		this.move = 2;
		this.rotZ = 0;
		this.rotY = 180;
	}
 };
 
 MyFish.prototype.move5 = function(currTime) {

     if(this.move == 3){
		this.rotZ += 90;
	}
	
	 if (this.x < 15 && this.move == 2){
	    this.x += (currTime * (7/1000));
	}
	else{
		this.move = 3;
		this.rotZ = -90;
		this.rotY = -180;
	}
 };
 MyFish.prototype.move6 = function(currTime) {

     if(this.move == 0){
		this.rotZ += 90;
	}
	
	if (this.y < 13 && this.move == 3) {
		this.y += (currTime *(7/1000));
	}
	else{
		this.move = 0;
		this.rotZ = 0;
		this.rotY = 0;
	}
 };
