import * as THREE from 'three'
/**************************************************************************************************************
 *                                                  PLANET    TEXTURE
 **************************************************************************************************************/
/******************************************************
 *                         Mercury
 ******************************************************/
import globeDiffuseSource from '../../images/textures/planet/globe/mercury/mercury_diffuse.jpg'
import globeNormalSource from '../../images/textures/planet/globe/mercury/mercury_normal.jpg'
import globeRoughnessSource from '../../images/textures/planet/globe/mercury/mercury_roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.

export class Planet_mercury
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)
        this.container = new THREE.Object3D()
        
        this.setGlobe()
        this.setAnimation()
    }

    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(0.75, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(globeDiffuseSource),
            normalMap: this.textureLoader.load(globeNormalSource),
            roughnessMap: this.textureLoader.load(globeRoughnessSource),
            metalnessMap: this.textureLoader.load(globeRoughnessSource)
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.container.add(this.globe.mesh)
    }
    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            this.globe.mesh.rotation.y += 0.004
        }
        loop()
    }
}

