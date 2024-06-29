import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog
const fog = new THREE.Fog('#262837',1,30)
scene.fog = fog


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')


const brickColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const brickAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const brickNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const brickRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')


const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')


const graveColorTexture = textureLoader.load('/textures/graves/color.jpg')
const graveDisplacementTexture = textureLoader.load('/textures/graves/displacement.jpg')
const graveRoughnessTexture = textureLoader.load('/textures/graves/roughness.jpg')


const bushColorTexture = textureLoader.load('/textures/bush/color.jpg')
// const bushHeightTexture = textureLoader.load('/textures/bush/displacement.jpg')
const bushRoughnessTexture = textureLoader.load('/textures/bush/roughness.jpg')
const bushAmbientOcclusionTexture = textureLoader.load('/textures/bush/ambientOcclusion.jpg')
const bushNormalTexture = textureLoader.load('/textures/bush/normal.jpg')


const roofColorTexture = textureLoader.load('/textures/roof/color.jpg')
// const roofAlphaTexture = textureLoader.load('/textures/roof/alpha.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/height.jpg')
const roofMetalnessTexture = textureLoader.load('/textures/roof/metalness.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/roughness.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('/textures/roof/normal.jpg')




grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping



/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,3,4),
    new THREE.MeshStandardMaterial({
        map: brickColorTexture,
        aoMap: brickAmbientOcclusionTexture,
        roughnessMap: brickRoughnessTexture,
        normalMap: brickNormalTexture
    })
)

walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y = 3/2
house.add(walls)


//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map:roofColorTexture,
        aoMap:roofAmbientOcclusionTexture,
        roughnessMap:roofRoughnessTexture,
        normalMap:roofNormalTexture,
    })
)
roof.position.y = 3 + 0.75
roof.rotation.y = Math.PI/4

roof.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)
)

house.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75,2.25, 100,100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent:true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap:doorHeightTexture,
        displacementScale: 0.1,
        normalMap : doorNormalTexture,
        roughnessMap : doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture
    })

)

door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
house.add(door)
door.position.y = 1
door.position.z = 2 + 0.001


//bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushAmbientOcclusionTexture,
    // displacementMap: bushHeightTexture,
    // displacementScale: 0.1,
    normalMap: bushNormalTexture,
    roughnessMap: bushRoughnessTexture
})


const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.25, 0.25, 0.25)
bush1.position.set(0.8,0.2,2.1)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.4, 0.4, 0.4)
bush2.position.set(1.4,0.1,2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1.4,0.1,2.1)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.14, 0.14, 0.14)
bush4.position.set(-1,0.1,2.3)

bush1.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2)
)
bush2.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2)
)
bush3.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2)
)
bush4.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2)
)


house.add(bush1, bush2, bush3,bush4)


//graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2, 100,100)
const graveMaterial = new THREE.MeshStandardMaterial({
        map: graveColorTexture, 
        displacementMap: graveDisplacementTexture, 
        displacementScale: 0.1,
        roughnessMap: graveRoughnessTexture
    })

for(let i=0; i<50; i++){
    const angle = Math.random() * Math.PI * 2
    const radius = 5 + Math.random()*5
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x,0.4,z)
    grave.castShadow = true
    graves.add(grave)

}

// const grave1 = new THREE.Mesh(graveGeometry, graveMaterial)

// // Temporary sphere

// // const ball = new THREE.SphereGeometry()
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1,20,20),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// sphere.position.y = 1
// scene.add(sphere)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: grassColorTexture,
        aoMap : grassAmbientOcclusionTexture,
        normalMap : grassNormalTexture,
        roughnessMap : grassRoughnessTexture
    })
)

floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 5)
)

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//door light
const doorLight = new THREE.PointLight('#fee283', 10, 6)
doorLight.position.set(0,2.8,3)
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight('#ff00ff', 2,3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2,3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#66ff99', 2,3)
scene.add(ghost3)



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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

//shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = elapsedTime * 0.18
    ghost3.position.x = 3 + Math.cos(ghost3Angle) * (5 + Math.cos(elapsedTime * 2.5))
    ghost3.position.z = 3 + Math.sin(ghost3Angle) * (5 + Math.sin(elapsedTime * 2))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()