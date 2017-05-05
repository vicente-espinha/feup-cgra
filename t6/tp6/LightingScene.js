var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    this.Light1 = true;
    this.Light2 = false;
    this.Light3 = false;
    this.Light4 = false;
    this.Clock = false;
    this.speed = 3;

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
    this.submarine = new MySubmarine(this,8,1.2,8);
    this.undersea = new Plane(this,60,0,0,10,12);
    this.poste = new MyCylinder(this,20,20);
    this.clock = new MyClock(this,12,1);
    this.test = new MyPyramide(this);

    //this.boardA = new Plane(this,BOARD_A_DIVISIONS);
    //this.boardB = new Plane(this,BOARD_B_DIVISIONS);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialA.setSpecular(0, 0.2, 0.2, 1);
    this.materialA.setShininess(120);

    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);

    this.materialWall = new CGFappearance(this);
    this.materialWall.setAmbient(0, 1, 0, 0);
    this.materialWall.setDiffuse(0, 1, 0, 0);
    this.materialWall.setSpecular(0, 1, 0, 0.1);

    this.materialWall2 = new CGFappearance(this);
    this.materialWall2.setAmbient(0.1, 0.1, 0.6, 0);
    this.materialWall2.setDiffuse(0.1, 0.1, 0.6, 0);
    this.materialWall2.setSpecular(0.1, 0.1, 0.6, 0.1);

    this.materialFloor = new CGFappearance(this);
    this.materialFloor.setAmbient(0, 0, 1, 0);
    this.materialFloor.setDiffuse(0, 0, 1, 0);
    this.materialFloor.setSpecular(0, 0, 1, 0.1);

    this.materialPlane = new CGFappearance(this);
    this.materialPlane.setAmbient(1, 1, 1, 1);
    this.materialPlane.setDiffuse(1, 1, 1, 1);
    this.materialPlane.setSpecular(1, 1, 1, 1);

    this.enableTextures(true);

    this.tableAppearance = new CGFappearance(this);
    this.tableAppearance.loadTexture("../images/table.png");
    //this.tableAppearence.setAmbient(0.6,0.6,0.6,1);
    //this.tableAppearence.setDiffuse(0.6,0.6,0.6,1);
    //this.tableAppearence.setSpecular(0.2,0.2,0.2,1);
    this.tableAppearance.setShininess(1000);

    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.loadTexture("../images/floor.png");
    this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.floorAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.floorAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
    this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.floorAppearance.setShininess(1000);

    this.windowAppearance = new CGFappearance(this);
    this.windowAppearance.loadTexture("../images/window.png");
    this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    this.windowAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.windowAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
    this.windowAppearance.setSpecular(0.2, 0.2, 0.2, 1);
    this.windowAppearance.setShininess(1000);

    this.slidesAppearance = new CGFappearance(this);
    this.slidesAppearance.loadTexture("../images/slides.png");
    this.slidesAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.slidesAppearance.setDiffuse(0.6, 0.6, 0.6, 1);
    this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 0.2);
    this.slidesAppearance.setShininess(500);

    this.boardAppearance = new CGFappearance(this);
    this.boardAppearance.loadTexture("../images/board.png");
    this.boardAppearance.setAmbient(0.6, 0.6, 0.6, 1);
    this.boardAppearance.setDiffuse(0.6, 0.6, 0.6, 0.2);
    this.boardAppearance.setSpecular(0.2, 0.2, 0.2, 0.5);
    this.boardAppearance.setShininess(20);

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

  /*  this.submarineAppearances =[
     eder
    ];*/

    this.setUpdatePeriod(1000 / 60);



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
    if(!this.Clock){
    this.clock.update(this.deltatime);
    }
    //this.plane.update(this.deltatime);

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

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1, 1, 1, 1);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1, 1, 1, 1);
    this.lights[2].setQuadraticAttenuation(0);
    this.lights[2].setLinearAttenuation(1);
    this.lights[2].setConstantAttenuation(0);
    this.lights[2].enable();

    this.lights[3].setAmbient(0, 0, 0, 1);
    this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[3].setSpecular(1, 1, 1, 1);
    this.lights[3].setQuadraticAttenuation(1);
    this.lights[3].setLinearAttenuation(0);
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

    // Floor
    /*
    this.pushMatrix();
    this.translate(7.5, 0, 7.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(15, 15, 0.2);
    this.floorAppearance.apply();
    this.floor.display();
    this.popMatrix();

    // Left Wall
    this.pushMatrix();
    this.translate(0, 4, 7.5);
    this.rotate(90 * degToRad, 0, 1, 0);
    this.scale(15, 8, 0.2);
    this.windowAppearance.apply();
    this.wall2.display();
    this.popMatrix();

    // Plane Wall
    this.pushMatrix();
    this.translate(7.5, 4, 0);
    this.scale(15, 8, 0.2);
    this.materialWall2.apply();
    this.wall.display();
    this.popMatrix();

    // First Table
    this.pushMatrix();
    this.translate(5, 0, 8);
    this.table.display();
    this.popMatrix();

    // Second Table
    this.pushMatrix();
    this.translate(12, 0, 8);
    this.table.display();
    this.popMatrix();

    // Board A
    this.pushMatrix();
    this.translate(4, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    this.slidesAppearance.apply();
    this.boardA.display();
    this.popMatrix();

    // Board B
    this.pushMatrix();
    this.translate(10.5, 4.5, 0.2);
    this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
    this.boardAppearance.apply();
    this.boardB.display();
    this.popMatrix();

    // Prism
    this.pushMatrix();
    this.translate(3, 0, 14);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(1, 1, 8);
    //this.pilarAppearance.apply();
    //this.prism.display();
    this.popMatrix();

    // Cylinder
    this.pushMatrix();
    this.translate(1, 0, 14);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.scale(1, 1, 8);
    this.pilarAppearance.apply();
    this.cylinder.display();
    this.popMatrix();

    //Lamp
    this.pushMatrix();
    this.translate(7, 8, 8);
    this.rotate(Math.PI / 2, 1, 0, 0);
    this.lamp.display();
    this.popMatrix();

    //clock
    this.pushMatrix();
    this.translate(7.2, 7.3, 0);
    this.scale(0.75, 0.75, 0.3);
    this.clock.display();
    this.popMatrix();

    //paperplane
    this.pushMatrix();
    this.translate(this.plane.x, this.plane.y, this.plane.z);
    this.rotate(this.plane.rotZ * degToRad, 0, 0, 1);
    //this.rotate(this.plane.rotX * degToRad, 1, 0, 0);
    this.materialPlane.apply();
    this.plane.display();
    this.popMatrix();*/

    //submarine
    this.pushMatrix();
    this.translate(this.submarine.x, this.submarine.y, this.submarine.z);
    this.rotate(this.submarine.rotY * degToRad, 0, 1, 0);
    this.eder.apply();    
    this.submarine.display();
    this.popMatrix();

    //floor
    this.pushMatrix();
    this.translate(8, 0, 8)
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.scale(16, 16, 0.2);
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
