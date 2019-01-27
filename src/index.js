import './css/style.styl'
import './css/main.css'
import * as THREE from 'three'
import { Planet_mercury } from './js/planets/mercury_planet.js'
import { Planet_venus } from './js/planets/venus_planet.js'
import { Planet_earth } from './js/planets/earth_planet.js'
import { Planet_mars } from './js/planets/mars_planet.js'
import { Planet_jupiter } from './js/planets/jupiter_planet.js'
import { Planet_saturne } from './js/planets/saturn_planet.js'
import { Planet_uranus } from './js/planets/uranus_planet.js'
import { Planet_neptune } from './js/planets/neptune_planet.js'
/*************************************************************************
 *                              const
*************************************************************************/
// button

const callbackMapper = {
    "mercury":mercuryButtonCallback,
    "venus":venusButtonCallback,
    "earth":earthButtonCallback,
    "mars":marsButtonCallback,
    "jupiter":jupiterButtonCallback,
    "saturn":saturnButtonCallback,
    "uranus":uranusButtonCallback,
    "neptune":neptuneButtonCallback,
}

const mercuryButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_mercury({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const venusButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_venus({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const earthButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_earth({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const marsButtonCallback = (_event) =>
{
     _event.preventDefault()
    
    var planet = new Planet_mars({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const jupiterButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_jupiter({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const saturnButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_saturn({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const uranusButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_uranus({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
const neptuneButtonCallback = (_event) =>
{
    _event.preventDefault()
    
    var planet = new Planet_neptune({
        textureLoader: textureLoader
    })
    scene.add(planet.container)
}
// planet autoSettings
const textureLoader = new THREE.TextureLoader()
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
/*************************************************************************
 *                       button creation/interaction
*************************************************************************/


const initplanet = require("./metadata/planets.json")
function drawButtons(_planets)
{
    const $container = document.createElement('div')
    $container.classList.add('planetSelector')
    document.body.appendChild($container)

    for(const _planet of _planets)
    {
        const $button = document.createElement('button')
        $button.classList.add('button')
        $button.addEventListener('mousedown', ()=>{callbackMapper[_planet.callbackName]})
        $button.addEventListener('touchstart', callbackMapper[_planet.callbackName])
        $container.appendChild($button)
        const $title = document.createElement('div')
        $title.classList.add('title')
        $title.textContent = _planet.title
        $button.appendChild($title)
        console.log('test')
    }
}

drawButtons(initplanet)







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
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (_event) =>
{
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Planet
 */
var planet = new Planet_earth({
    textureLoader: textureLoader
})
scene.add(planet.container)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.0)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 0.8)
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
sunLight.castShadow = true
sunLight.shadow.camera.top = 1.20
sunLight.shadow.camera.right = 1.20
sunLight.shadow.camera.bottom = - 1.20
sunLight.shadow.camera.left = - 1.20
scene.add(sunLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)
/*********************************************************************
 *                          Caméra update Loop
 ********************************************************************/
const loop = () =>
{
    window.requestAnimationFrame(loop)
    // Update camera
    camera.position.x = cursor.x * 5
    camera.position.y = - cursor.y * 5
    camera.lookAt(new THREE.Vector3())

    // Renderer
    renderer.render(scene, camera)
}
loop()
