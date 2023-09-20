import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Objects 
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff00f0})
)
cube1.position.x = 2


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0fff})
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff00ff})
)
cube3.position.x = -2

group.add(cube1)
group.add(cube2)
group.add(cube3)

// /**
//  * Objects
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 'blue' })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.x = 0.5
// // mesh.position.y = -0.4
// // mesh.position.z = 1
// scene.add(mesh)

// //change all three coordinates at once
// mesh.position.set(5,0,4,1)

// mesh.position.normalize()
// console.log(mesh.position.length())

// //Scale
// // mesh.scale.x = 0.8
// // mesh.scale.y = 1.5
// // mesh.scale.z = 1
// mesh.scale.set(0.8,1.5,1)

// //Rotation
// // mesh.rotation.reorder('YXZ')
// // mesh.rotation.y = Math.PI
// // mesh.rotation.x = Math.PI * 0.1



//Axes helper
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

//Sizes
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3.2
scene.add(camera)

//look at
//camera.lookAt(new THREE.Vector3(3,0,0))
// camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position))
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)