/**
 * MyQuad
 * @constructor
 */
 var minS,minT,maxS,maxT;
  function MyQuad(scene,miS,miT,maS,maT) {
 	CGFobject.call(this,scene);

 	minS = miS || 0.0;
 	minT = miT || 0.0;
 	maxS = maS || 1.0;
 	maxT = maT || 1.0;


 	this.initBuffers();
 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;

 MyQuad.prototype.initBuffers = function() {
 	this.vertices = [
 	-0.5, -0.5, 0,
 	0.5, -0.5, 0,
 	-0.5, 0.5, 0,
 	0.5, 0.5, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1,
 	];

 	this.normals = [
 	0,0,1,
 	0,0,1,
 	0,0,1,
 	0,0,1,
 	];

 	this.texCoords = [
        minS,maxT,
        maxS,maxT,
        minS,minT,
        maxS,minT
    ];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
