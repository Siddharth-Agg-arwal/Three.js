import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';



/**
 * Base
 */
// Debug
const gui = new dat.GUI()
console.log("hello")

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



// FONTS 
const loader = new FontLoader();

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

	const textgeometry = new TextGeometry( 'Hello three.js!', {
		font: font,
		size: 200,
		height: 5,
		curveSegments: 6,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 4
	} );
        const textMaterial = new THREE.MeshBasicMaterial()
        textMaterial.wireframe = true
        const text = new THREE.Mesh(textgeometry, textMaterial)
        text.scale.set(0.1, 0.1, 0.1); // Adjust the scale of the text
        scene.add(text)
        
        // textgeometry.computeBoundingBox();
        // textgeometry.translate(
        //     - textgeometry.boundingBox.max.x * 0.5,
        //     - textgeometry.boundingBox.max.y * 0.5,
        //     - textgeometry.boundingBox.max.z * 0.5
        // )

        textgeometry.center()
    },
)


const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)
// geometry.computeBoundingBox();
// geometry.computeBoundingBox()
// console.log(geometry.boundingBox)



// After computing the bounding box



/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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