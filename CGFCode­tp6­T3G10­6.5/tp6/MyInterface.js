/**
 * MyInterface
 * @constructor
 */

function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}
;MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a button:
    // the first parameter is the object that is being controlled (in this case the scene)
    // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
    // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

    this.gui.add(this.scene, 'doSomething');

    this.gui.add(this.scene,'Clock');

    var listener = this.gui.add(this.scene, 'Appearances', [ 'Euro2016', 'Rusticsub', 'Nature','Shining' ] );
    listener.onChange(function(){
        console.log("working");
    })

    // add a group of controls (and open/expand by defult)

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    group.add(this.scene, 'Light1');
    group.add(this.scene, 'Light2');
    group.add(this.scene, 'Light3');
    group.add(this.scene, 'Light4');

    // add a slider
    // must be a numeric variable of the scene, initialized in scene.init e.g.
    // this.speed=3;
    // min and max values can be specified as parameters

    this.gui.add(this.scene, 'speed', -5, 5);

    return true;
}
;

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyboard.call(this, event);

    // Check key codes e.g. here: http://www.asciitable.com/
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    if(event.keyCode == 65 || event.keyCode == 97 ){
        this.scene.submarine.rotateLeft();
        this.scene.submarine.VerticalFin(1);
        console.log("Key 'A' pressed");
    }
    else if(event.keyCode == 68 || event.keyCode == 100){
         this.scene.submarine.rotateRight();
         this.scene.submarine.VerticalFin(0);
        console.log("key 'D' pressed");
    }
    else if(event.keyCode == 83 || event.keyCode == 115){
         this.scene.submarine.movement(2);
        console.log("Key 'S' pressed");
    }      
    else if(event.keyCode == 87 || event.keyCode == 119){
         this.scene.submarine.movement(1);
        console.log("key 'W' pressed");
    }
    else if(event.keyCode == 81 || event.keyCode == 113){
        this.scene.submarine.rotateUp();
        this.scene.submarine.HoritonzalFin(1);
        console.log("key 'Q' pressed");
    }
    else if(event.keyCode == 69 || event.keyCode == 101){
        this.scene.submarine.rotateDown();
        this.scene.submarine.HoritonzalFin(0);
        console.log("key 'E' pressed");
    }
    else if(event.keyCode == 80 || event.keyCode == 112){
        this.scene.submarine.PeriscopeMovement(1);
        console.log("key 'P' pressed");
    }
    else if(event.keyCode == 76 || event.keyCode == 108){
        this.scene.submarine.PeriscopeMovement(0);
        console.log("key 'L' pressed");
    }else if(event.keyCode ==  70 || event.keyCode == 102){
         this.scene.torpedoExists = true;       
         console.log("Key 'F' pressed");
     }

};

//processes if key up
MyInterface.prototype.processKeyUp = function(event)
{
	CGFinterface.prototype.processKeyDown.call(this, event);

	if(event.keyCode == 65 || event.keyCode == 97 ){
       this.scene.submarine.VerticalFin(2);
       console.log("Key 'A' released");
    }
    else if(event.keyCode == 68 || event.keyCode == 100){
         this.scene.submarine.VerticalFin(2);
         console.log("key 'D' released");
    }
    else if(event.keyCode == 81 || event.keyCode == 113){
        this.scene.submarine.HoritonzalFin(2);
        console.log("key 'Q' released");
    }
    else if(event.keyCode == 69 || event.keyCode == 101){
        this.scene.submarine.HoritonzalFin(2);
        console.log("key 'E' released");
    }
};
