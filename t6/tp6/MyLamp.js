/**
 *MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    var ang = Math.PI * 2 / this.slices;
    
    for (j = 0; j < this.stacks + 1; j++) {
    	var x = Math.sqrt(1-(((j+1)/this.stacks)*(j+1)/this.stacks));
        for (i = 0; i < this.slices; i++) {
            if(j == 0)
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 0);
            else
                this.vertices.push(x*Math.cos(i * ang), x*Math.sin(i * ang), (j+1)/this.stacks);

            this.normals.push(Math.cos(i * ang), Math.sin(i * ang), 0);
        }
    }

    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {
            if (i == this.slices - 1) {
                this.indices.push(0 + this.slices * j, 0 + this.slices * (j + 1), 0 + i + this.slices * (j + 1));
                this.indices.push(0 + this.slices * j, 0 + i + this.slices * (j + 1), 0 + i + this.slices * j);
            } else {
                this.indices.push(0 + i + this.slices * j, 1 + i + this.slices * j, 0 + i + this.slices * (j + 1));
                this.indices.push(1 + i + this.slices * j, 1 + i + this.slices * (j + 1), 0 + i + this.slices * (j + 1));
            }
        }
    }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };