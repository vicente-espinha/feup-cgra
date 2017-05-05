/**
 *MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    var s = 0;
	var t = 0;
	var sIter = 1/this.slices;
	var tIter = 1/this.stacks;
    var ang = Math.PI * 2 / this.slices;

    for (j = 0; j < this.stacks + 1; j++) {
        for (i = 0; i < this.slices; i++) {
            if(j == 0)
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 0);
            else
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), j/this.stacks);

            this.normals.push(Math.cos(i * ang), Math.sin(i * ang), 0);
            this.texCoords.push(s, t);
			s += sIter;
        }
        s = 0;
		t += tIter;
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
    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {
            if (i == this.slices - 1) {
                this.indices.push(0 + i + this.slices * (j + 1), 0 + this.slices * (j + 1),0 + this.slices * j );
                this.indices.push( 0 + i + this.slices * j, 0 + i + this.slices * (j + 1), 0 + this.slices * j);
            } else {
                this.indices.push(0 + i + this.slices * (j + 1), 1 + i + this.slices * j, 0 + i + this.slices * j);
                this.indices.push(0 + i + this.slices * (j + 1), 1 + i + this.slices * (j + 1),1 + i + this.slices * j );
            }
        }
    }

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
