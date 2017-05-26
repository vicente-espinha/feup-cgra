/**
 * MyExplosion
 * @constructor
 */
 function MyExplosion(scene, x, y, z) {
 	CGFobject.call(this, scene);
 	      this.exploded = false;
          this.x = x;
          this.y= y;
          this.z = z;
          this.b=0;
          this.explodirComTempo=0;
          this.aumentar=false;
 	    this.frontAndBack = new MyLamp(this.scene,150,8);
        
 };

  MyExplosion.prototype = Object.create(CGFobject.prototype);
  MyExplosion.prototype.constructor =  MyExplosion;

  MyExplosion.prototype.display = function() {
      
    
     if(this.exploded == true &&  this.b < 100){
      
 	// front face
 	this.scene.pushMatrix();
    this.frontAndBack.display();
    this.scene.popMatrix();

    //backface
    this.scene.pushMatrix();
    this.scene.rotate(-180*degToRad,0,1,0);
    this.frontAndBack.display();
    this.scene.popMatrix();
    
   
     }else{
       this.aumentar=true;
     }

 };

MyExplosion.prototype.existence = function(){
   this.exploded= true;
   

};

MyExplosion.prototype.update = function(){
  if(this.explodirComTempo < 30){
    console.log(this.explodirComTempo);
   this.scene.scale(1+this.explodirComTempo/10,1+this.explodirComTempo/10,1+this.explodirComTempo/10);   
  }else{
    this.aumentar=true;
  }
};