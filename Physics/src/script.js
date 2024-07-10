import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import CANNON from 'cannon'
// import { debug } from 'webpack'


// console.log(CANNON)
/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {}
const debugObject2 = {}

debugObject.createSphere = () => {
    createSphere(
        Math.random() * 0.5,
        {
            x : (Math.random() - 0.5) * 3,
            y : 3,
            z: (Math.random() - 0.5) * 3,
        }
    )
}

debugObject.reset = () => {
    for(const object of objectsToUpdate){
        //remove object
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)

        //remove mesh
        scene.remove(object.mesh)
    }
}

gui.add(debugObject, 'reset')

debugObject2.createBox = () => {
    createBox(
        Math.random() * 0.5,
        {
            x: (Math.random() - 0.5) * 3,
            y: 4,
            z: (Math.random() - 0.5 ) * 3
        }
    )
}

gui.add(debugObject, 'createSphere')
gui.add(debugObject2, 'createBox')

//popular physics libraries :
//3d: Ammo.js, Cannon.js, Oimo.js
//2d: Matter.js, P2.js, Planck.js, Box2D.js


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Sounds
const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = (collision) => {

    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    if(impactStrength > 1.5){
        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
    }
    
}


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

// Physics
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true //lets an object off animation consider for collisions
world.gravity.set(0, -9.82, 0)


//Materials
// const concreteMaterial = new CANNON.Material('concrete')
// const plasticMaterial = new CANNON.Material('plastic')

// const concretePlasticContactMaterial = new CANNON.ContactMaterial(
//     concreteMaterial,
//     plasticMaterial,
//     {
//         friction: 0.1,
//         restitution: 0.5
//     }
// )

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction:0.1,
        restitution:0.7
    }
)

// world.addContactMaterial(concretePlasticContactMaterial)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

//Sphere
// const sphereShape = new CANNON.Sphere(0.5)
// const sphereBody = new CANNON.Body({
//     mass:1,
//     position: new CANNON.Vec3(0, 3, 0),
//     shape:sphereShape,
//     // material: defaultMaterial
// })

// sphereBody.applyLocalForce(new CANNON.Vec3(70, 0, 0), new CANNON.Vec3(0,0,0))

// world.addBody(sphereBody)

//floor

const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1,0,0),
    Math.PI * 0.5
)
// floorBody.material = defaultMaterial 

world.addBody(floorBody)


/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)



/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Utils

const SphereGeometry = new THREE.SphereGeometry(1,20,20)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture
})

const objectsToUpdate = []

const createSphere = (radius, position) => {
    const mesh = new THREE.Mesh(SphereGeometry, sphereMaterial)
    mesh.scale.set(radius, radius, radius)
    scene.add(mesh)

    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape:shape,
        material: defaultContactMaterial
    })

    body.position.copy(position)
    world.addBody(body)
    body.addEventListener('collide', playHitSound)


    //save in object to update
    objectsToUpdate.push({
        mesh,
        body
    })
}

createSphere(0.5, {x:0, y:3, z:0})
// createSphere(0.5, {x:2, y:3, z:0})
// createSphere(0.5, {x:6, y:3, z:0})

const boxGeometry = new THREE.BoxGeometry(1,1,1)
const boxMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.2,
    metalness: 0.8,
    envMap: environmentMapTexture
})

const createBox = (side, position) => {
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
    mesh.scale.set(side, side, side)
    mesh.position.copy(position)
    mesh.castShadow = true,
    scene.add(mesh)

    //cannon
    const shape = new CANNON.Box(new CANNON.Vec3(side * 0.5, side * 0.5, side * 0.5))
    const body = new CANNON.Body({
        mass: 1,
        material: defaultContactMaterial,
        shape:shape,
        position: new CANNON.Vec3(0,3,0)
    })

    body.position.copy(position)
    world.addBody(body)
    body.addEventListener('collide', playHitSound)
    objectsToUpdate.push({
        mesh,
        body
    })
}

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime
    
    //update physics world
    // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position)
    world.step(1/60, deltaTime, 3)


    // sphere.position.copy(sphereBody.position)
    // sphere.position.x = sphereBody.position.x
    // sphere.position.y = sphereBody.position.y
    // sphere.position.z = sphereBody.position.z

    for(const object of objectsToUpdate){
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()