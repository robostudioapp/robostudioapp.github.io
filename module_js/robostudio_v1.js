/*
 * @Author: lcl 2907652732@qq.com
 * @Date: 2024-08-16 11:50:31
 * @LastEditors: lcl 2907652732@qq.com
 * @LastEditTime: 2024-08-17 17:04:00
 * @FilePath: \Robostudio-ghpages\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Create a Three.JS Scene
const scene = new THREE.Scene();
const container = document.getElementById('Robostudio_v1');
const window_width = 800;
const window_height = 600;

//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera( 75, window_width / window_height, 0.1, 100000);

//Keep track of the mouse ·position, so we can make the eye move
let mouseX = window_width /2;
let mouseY = window_height /2;

//Keep the 3D object on a global variable so we can access it later
let object;
//OrbitControls allow the camera to move around the scene
let controls;

let objToRender = "robostudio_v1";

const loader = new GLTFLoader();


//Load the file
loader.load(
    `./static/meshes_gltf/${objToRender}/model.gltf`,
    function(gltf){
        //If the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object);
    },
    undefined, function ( error ) {
        console.error( error );
    }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xADD8E6);
renderer.setSize(window_width, window_height);

container.appendChild( renderer.domElement );

//Set how far the camera will be from the 3D model
camera.position.z = objToRender ? 2 : 10;

// Add a DirectionalLight
const directionalLight_u = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
directionalLight_u.position.set(0, 0, 50); // Positioning the light source
scene.add(directionalLight_u);

const directionalLight_d = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
directionalLight_d.position.set(0, 0, -50); // Positioning the light source
scene.add(directionalLight_d);

const directionalLight_f = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
directionalLight_f.position.set(50, 0, 0); // Positioning the light source
scene.add(directionalLight_f);

const directionalLight_b = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
directionalLight_b.position.set(-50, 0, 0); // Positioning the light source
scene.add(directionalLight_b);

const directionalLight_l = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
directionalLight_l.position.set(0, 50, 0); // Positioning the light source
scene.add(directionalLight_l);

const directionalLight_r = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
directionalLight_r.position.set(0, -50, 0); // Positioning the light source
scene.add(directionalLight_r);

//This adds controls to the camera,so we can rotate / zoom it with the mouse
controls = new OrbitControls(camera, renderer.domElement);


//Render the scene
function animate(){
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement

    //Make the eye move
    if(object && objToRender){
        //I've played with the constants here until it looked·good
        object.rotation.y= -3 + mouseX/window_width * 3;
        object.rotation.x= -1.2 + mouseY * 2.5/window_height;
    }
    renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function() {
    camera.aspect=window_width /window_height;
    camera.updateProjectionMatrix();
    renderer.setSize(window_width, window_height);
});

animate();
