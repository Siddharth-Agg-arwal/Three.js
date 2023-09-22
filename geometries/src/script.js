import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BufferGeometry(1, 1, 1,3,3,3)
// Define the vertices for the cube
const vertices = new Float32Array([
    -1, -1, -1,  // Vertex 0
     1, -1, -1,  // Vertex 1
     1,  1, -1,  // Vertex 2
    -1,  1, -1,  // Vertex 3
    -1, -1,  1,  // Vertex 4
     1, -1,  1,  // Vertex 5
     1,  1,  1,  // Vertex 6
    -1,  1,  1,  // Vertex 7
  ]);
  
  // Define the indices to connect the vertices to form triangles
  const indices = new Uint16Array([
    0, 1, 2,  0, 2, 3,  // Front face
    4, 5, 6,  4, 6, 7,  // Back face
    0, 4, 7,  0, 7, 3,  // Left face
    1, 5, 6,  1, 6, 2,  // Right face
    0, 1, 5,  0, 5, 4,  // Bottom face
    2, 3, 7,  2, 7, 6   // Top face
  ]);
  
  // Create a BufferGeometry and set its attributes
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)); // 3 components per vertex
  geometry.setIndex(new THREE.BufferAttribute(indices, 1)); // 1 component per index
  

// const geometry = new THREE.BufferGeometry()

// const vertices = []
// const vertex1 = new THREE.Vector3(0,0,0)
// //geometry.vertices.push(vertex1)
// const vertex2 = new THREE.Vector3(0,1,0)
// //geometry.vertices.push(vertex2)
// const vertex3 = new THREE.Vector3(1,0,0)
// //geometry.vertices.push(vertex3)
// vertices.push(vertex1, vertex2, vertex3)

// geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3))

// const face = new THREE.Face3(0,1,2)
// geometry.faces.push(face)

const material = new THREE.MeshBasicMaterial({ 
    wireframe:true,
    color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()