var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

var FPS = 60;
var a= 0;
var m=0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    this.Light1 = true;
    this.Light2 = true;
    this.Light3 = true;
    this.Light4 = true;
    this.torpedoExists = false;
    this.torpedoCreated = false;
    
   this.delta=0;   
    this.enableClock = true;
    this.Clock = function() {
        if (this.enableClock) {
            this.enableClock = false;
        } else if(!this.enableClock){
            this.enableClock = true;
        }
    }
    ;
    this.speed = 0;
    this.up = false;
    this.down = false;
    this.Appearances = null;


    this.initCameras();

    this.initLights();

    this.gl.clearColor(0.173, 0.302, 0.514, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    /*this.table = new MyTable(this);
    this.wall = new Plane(this);
    this.floor = new MyQuad(this,0,0,10,12);
    this.prism = new MyPrism(this,8,20);
    this.cylinder = new MyCylinder(this,8,20);
    this.lamp = new MyLamp(this,8,20);
    this.wall2 = new MyQuad(this,-0.5,-0.5,1.5,1.5);
    this.clock = new MyClock(this,12,1);
    this.plane = new MyPaperPlane(this,5,5,8);*/
    this.quad = new MyUnitCubeQuad(this);
    this.submarine = new MySubmarine(this,8,1.17,8);
    this.undersea = new Plane(this,60,0,0,10,12);
    this.poste = new MyCylinder(this,20,20);
    this.clock = new MyClock(this,12,1);
    this.target = new MyTarget(this,0,4,0);
    this.secondTarget  = new MyTarget(this,2,0,0);
    
    

    //this.boardA = new Plane(this,BOARD_A_DIVISIONS);
    //this.boardB = new Plane(this,BOARD_B_DIVISIONS);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0, 0.2, 0.2, 1);
    this.materialA.setShininess(120);

    this.enableTextures(true);

    this.tableAppearance = new CGFappearance(this);
    this.tableAppearance.loadTexture("../images/table.png");
    //this.tableAppearence.setAmbient(0.6,0.6,0.6,1);
    //this.tableAppearence.setDiffuse(0.6,0.6,0.6,1);
    //this.tableAppearence.setSpecular(0.2,0.2,0.2,1);
    this.tableAppearance.setShininess(1000);

    this.pilarAppearance = new CGFappearance(this);
    this.pilarAppearance.loadTexture("../images/pilar.png");
    this.pilarAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.pilarAppearance.setDiffuse(0.6, 0.6, 0.6, 0.2);
    this.pilarAppearance.setSpecular(0.2, 0.2, 0.2, 0.5);
    this.pilarAppearance.setShininess(500);

    this.underseaAppearance = new CGFappearance(this);
    this.underseaAppearance.loadTexture("../images/undersea.png");
    this.underseaAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.underseaAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.underseaAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
    this.underseaAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.underseaAppearance.setShininess(1000);

    this.eder = new CGFappearance(this);
    this.eder.loadTexture("../images/flagt.png");
    this.eder.setAmbient(0.6, 0.6, 0.6, 1);
    this.eder.setDiffuse(0.6, 0.6, 0.6, 0.2);
    this.eder.setSpecular(0.2, 0.2, 0.2, 0.5);
    this.eder.setShininess(500);

    this.rustic = new CGFappearance(this);
    this.rustic.loadTexture("../images/subtex.png");
    this.rustic.setAmbient(0.6, 0.6, 0.6, 1);
    this.rustic.setDiffuse(0.6, 0.6, 0.6, 0.2);
    this.rustic.setSpecular(0.2, 0.2, 0.2, 0.5);
    this.rustic.setShininess(500);

    this.grass = new CGFappearance(this);
    this.grass.loadTexture("../images/grass.png");
    this.grass.setAmbient(0.6, 0.6, 0.6, 1);
    this.grass.setDiffuse(0.6, 0.6, 0.6, 0.2);
    this.grass.setSpecular(0.2, 0.2, 0.2, 0.5);
    this.grass.setShininess(500);

    this.fluorescent = new CGFappearance(this);
    this.fluorescent.loadTexture("../images/yellowsub.png");
    this.fluorescent.setAmbient(0.6, 0.6, 0.6, 1);
    this.fluorescent.setDiffuse(0.6, 0.6, 0.6, 0.2);
    this.fluorescent.setSpecular(0.2, 0.2, 0.2, 0.5);
    this.fluorescent.setShininess(500);
    
    this.explosionList=[];
    this.torpedoList = [];
    this.targetList = [
      this.target,
      this.secondTarget
    ];
  
   this.submarineAppearances =[
     this.eder,
     this.rustic,
     this.grass,
     this.fluorescent
    ];
    this.appearanceList={
        'Euro2016' :0,
        'Rusticsub' : 1,
        'Nature' : 2,
        'Shining':3
    }
    this.Appearances = 'Nature';
    console.log(this.Appearances);
   this.currAppearance = this.appearanceList[this.Appearances];

    this.setUpdatePeriod(1000 / FPS);
}
;

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
}
;

LightingScene.prototype.update = function(currTime) {
    this.lastime = this.lastime || 0.0;
    this.deltatime = currTime - this.lastTime || 0.0;
    this.lastTime = currTime;
    if (this.enableClock) {
        this.clock.update(this.deltatime);
    }
    
 
 // for(var h=0; h < this.explosionList.length;h++){

      
   
  //}


//textues of submarine
    this.currAppearance = this.appearanceList[this.Appearances];
    
 
  console.log(this.torpedoCreated);
  if(this.torpedoCreated){
      for(var c = 0; c < this.torpedoList.length; c++){
           this.torpedoList[c].movement();
          

      }
  }

    

    //move up
    if(this.up == 1  && this.submarine.speed > 0){
        this.submarine.rotateUp();
        this.submarine.moveVertical(1);
    }else if(this.submarine.rotX != 0 && this.up == 2){  
        this.submarine.rotX = this.submarine.rotX + 0.5;
    }

     
  //move down
    if(this.up == -1 && this.submarine.speed > 0){
        this.submarine.rotateDown();
        this.submarine.moveVertical(0);
    }else if(this.submarine.rotX != 0 && this.up == -2){  
        this.submarine.rotX = this.submarine.rotX - 0.5;
    }

    
 //helices movement

this.submarine.rotateHelices();
 
//lights
    if (this.Light1)
        this.lights[0].enable();
    if (this.Light2)
        this.lights[1].enable();
    if (this.Light3)
        this.lights[2].enable();
    if (this.Light4)
        this.lights[3].enable();

    if (!this.Light1)
        this.lights[0].disable();
    if (!this.Light2)
        this.lights[1].disable();
    if (!this.Light3)
        this.lights[2].disable();
    if (!this.Light4)
        this.lights[3].disable();
}
;

LightingScene.prototype.initLights = function() {
    this.setGlobalAmbientLight(0, 0, 0, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true);
    // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true);
    // show marker on light position (different from enabled)

    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    this.lights[2].setVisible(true);
    // show marker on light position (different from enabled)
    this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    this.lights[3].setVisible(true);
    // show marker on light position (different from enabled)
    //this.lights[4].setPosition(3.5, 6.0, 10.0, 1.0);
    // this.lights[4].setVisible(true);
    // show marker on light position (different from enabled)
    //this.lights[5].setPosition(15.4, 6.0, 6.0, 1.0);
    // this.lights[5].setVisible(true);
    // show marker on light position (different from enabled)
    //this.lights[6].setPosition(6.0, 6.0, 15.4, 1.0);
    // this.lights[6].setVisible(true);
    // show marker on light position (different from enabled)
    // this.lights[7].setPosition(7.0, 7.0, 8.0, 1.0);
    // this.lights[7].setVisible(true);
    // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0.5, 0.5, 0.5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1, 1, 1, 1);
    this.lights[0].enable();

    this.lights[1].setAmbient(1, 1, 1, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1, 1, 1, 1);
    this.lights[2].setQuadraticAttenuation(0);
    this.lights[2].setLinearAttenuation(1);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].enable();

    this.lights[3].setAmbient(1, 1, 1, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1, 1, 1, 1);
    this.lights[3].setQuadraticAttenuation(0);
    this.lights[3].setLinearAttenuation(1);
    this.lights[3].setConstantAttenuation(0);
    this.lights[3].enable();

    /*this.lights[4].setAmbient(0, 0, 0, 1);
    this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[4].setSpecular(1, 1, 0, 1);
    this.lights[4].setQuadraticAttenuation(0);
    this.lights[4].setLinearAttenuation(1);
    this.lights[4].setConstantAttenuation(1);
    this.lights[4].enable();

    this.lights[5].setAmbient(0, 0, 0, 1);
    this.lights[5].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[5].setSpecular(1, 1, 1, 1);
    this.lights[5].enable();

    this.lights[6].setAmbient(0, 0, 0, 1);
    this.lights[6].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[6].setSpecular(1, 1, 1, 1);
    this.lights[6].enable();

    this.lights[7].setAmbient(1, 1, 0, 1);
    this.lights[7].setDiffuse(1.0, 1.0, 0.0, 1.0);
    this.lights[7].setSpecular(1, 1, 0, 1);
    this.lights[7].setQuadraticAttenuation(0);
    this.lights[7].setLinearAttenuation(1);
    this.lights[7].setConstantAttenuation(1);
    this.lights[7].enable();*/
}
;

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup

    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section

    // ---- BEGIN Primitive drawing section

    //submarine
    this.pushMatrix();
    this.translate(this.submarine.x, this.submarine.y, this.submarine.z);
    this.rotate(this.submarine.rotY * degToRad, 0, 1, 0);
    this.rotate(this.submarine.rotX * degToRad, 1, 0, 0);
    this.submarineAppearances[this.currAppearance].apply();
    this.submarine.display();
    this.popMatrix();
    
    //torpedo
      this.delta = this.currTime - this.delta;

     if(this.torpedoExists == true && a < this.targetList.length ){
        this.torpedo = new MyTorpedo(this, this.submarine.x ,this.submarine.y-2,this.submarine.z- this.submarine.z/6, this.targetList[a]);
        this.torpedo.distance();
        this.torpedoList.push(this.torpedo);
        a++;
        this.torpedoCreated = true;
       
     }
       if(this.torpedoCreated){
         for(var b =0; b < this.torpedoList.length; b++){
        this.pushMatrix();
        this.translate(this.torpedoList[b].x, this.torpedoList[b].y, this.torpedoList[b].z);
        this.rotate(this.torpedoList[b].rotY * degToRad, 0, 1, 0);
        this.rotate(this.torpedoList[b].rotX * degToRad, 1, 0, 0);
         if(Math.round(this.torpedoList[b].x) == this.torpedoList[b].target.coordX && Math.round(this.torpedoList[b].y)==this.torpedoList[b].target.coordY && Math.round(this.torpedoList[b].z) == this.torpedoList[b].target.coordZ && this.torpedoList[b].isCollided == false){
               this.explosion = new MyExplosion(this,0,0,0);
               this.torpedoList[b].target.collision = true;
               this.torpedoList[b].isCollided=true;
               this.explosionList.push(this.explosion);


           }   for(var l =0; l < this.explosionList.length; l++){
               console.log(this.explosionList.length);
               if(this.torpedoList[b].isCollided){
               this.pushMatrix();
               this.translate(this.explosionList[l].x, this.explosionList[l].y,this.explosionList[l].z);
               this.explosionList[l].existence();
               
               this.fluorescent.apply();
                this.explosionList[l].b++;
                this.explosionList[l].update();
          this.explosionList[l].explodirComTempo++;
                if(this.explosionList[l].aumentar == false){
               this.explosionList[l].display();

                }else{
                    this.explosionList.shift();
                ;
                    this.torpedoList.shift();
                }
              
               this.popMatrix();       
           }
           } 
              console.log(this.explosionList.length);
           this.submarineAppearances[this.currAppearance].apply();
          if(this.torpedoList.length>0){ 
           if(this.torpedoList[b].target.collision == false){
        this.torpedoList[b].display();
           }
          }
        this.popMatrix();
        this.torpedoExists =false;
         }
    }

            
        
   
    //target
    for(var i=0; i < this.targetList.length; i++){
       if(this.targetList[i].collision == false){
    this.pushMatrix();
    this.materialA.apply();
    this.targetList[i].display();
    this.popMatrix();
       }
        
    }
    //floor
    this.pushMatrix();
    this.translate(8, 0, 8)
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(100, 100, 0.2);
    this.underseaAppearance.apply();
    this.undersea.display();
    this.popMatrix();

    //poste
    this.pushMatrix();
    this.translate(8, 0, 0);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(0.1, 0.1, 5);
    this.materialA.apply();
    this.poste.display();
    this.popMatrix();

    //clock
    this.pushMatrix();
    this.translate(8, 5, 0);
    this.scale(0.75, 0.75, 0.3);
    this.clock.display();
    this.popMatrix();
    
    


    // ---- END Primitive drawing section
}
;

LightingScene.prototype.doSomething = function() {
    console.log("Doing something...");
}
;
