// https://discourse.threejs.org/t/how-to-make-gradiant-fog-background-effect/55424

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


// general setup, boring, skip to the next comment

console.clear( );

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 30, innerWidth/innerHeight );
    camera.position.set( 0, 0, 10 );
    camera.lookAt( scene.position );

var renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( innerWidth, innerHeight );
		renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );
			
window.addEventListener( "resize", (event) => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
});

var controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
		controls.maxPolarAngle = 1.7;

var light = new THREE.SpotLight( 'white', 2000, 100, 1.2, 1, 2 );
    light.position.set( 0, 20, 0 );
    scene.add( light );

light = new THREE.SpotLight( 'white', 15000, 100, 1.2, 1, 2 );
    light.position.set( 0, -20, 0 );
    scene.add( light );

light = new THREE.SpotLight( 'white', 35000, 100, 0.15, 1, 2.7 );
		light.castShadow = true;
    light.position.set( 0, 20, 0 );
    scene.add( light );


// next comment

var ground = new THREE.Mesh(
			new THREE.PlaneGeometry( 100, 100 ),
	   	new THREE.MeshLambertMaterial( {
						color: 0x480048,
			} )
    );	
		ground.rotation.x = -Math.PI/2;
		ground.position.y = -2;
		ground.receiveShadow = true;
		scene.add( ground );


var background = new THREE.Mesh(
			new THREE.SphereGeometry( 50 ),
    	new THREE.MeshLambertMaterial( {
						color: 0x480048,
						side: THREE.BackSide,
			} )
    );	
		background.scale.y = 0.3;
		scene.add( background );


class Platon extends THREE.Mesh
{
	constructor( radius )
	{
		// main shape
		super(
			new THREE.TetrahedronGeometry( 1, 1 ),
			new THREE.MeshStandardMaterial( {
				color: 0x9040ff,
				metalness: 0.95,
				roughness: 0.05,
				flatShading: true
			} )
		);

		// first subshape
		var platon1 = new THREE.Mesh(
				new THREE.TetrahedronGeometry( 1, 2 ),
				new THREE.MeshStandardMaterial( {
						color: 0xffffff,
						metalness: 0.95,
						roughness: 0.05,
						flatShading: true
				} )
			 );
			platon1.scale.setScalar( 0.799 );
	
		// second subshape
		var platon2 = new THREE.Mesh(
				new THREE.OctahedronGeometry( 1, 4 ),
				new THREE.MeshStandardMaterial( {
						color: 0x000000,
						metalness: 0.95,
						roughness: 0.05,
						flatShading: true
				} )
			 );
			platon2.scale.setScalar( 0.713 );
	
		this.add( platon1, platon2 );
	} // Platon.constructor
} // Platon

var object = new Platon( 1 ); 
		object.castShadow = true;
		scene.add( object );


function animationLoop( t )
{
    object.rotation.x = 10*Math.sin( t/4100 );
    object.rotation.y = 7*Math.cos( t/3700 );

    controls.update( );
    renderer.render( scene, camera );
}

renderer.setAnimationLoop( animationLoop );