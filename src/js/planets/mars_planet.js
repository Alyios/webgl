import * as THREE from 'three'
/**************************************************************************************************************
 *                                                  PLANET    TEXTURE
 **************************************************************************************************************/
/******************************************************
 *                         Mars
 ******************************************************/
import globeDiffuseSource from '../../images/textures/planet/globe/mars/mars_diffuse.jpg'
import globeNormalSource from '../../images/textures/planet/globe/mars/mars_normal.jpg'
import globeRoughnessSource from '../../images/textures/planet/globe/mars/mars_roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
import cloudsAlphaSource from '../../images/textures/planet/clouds/alpha.jpg'
import rockDiffuseAlphaSource from '../../images/textures/planet/rock/diffuse-alpha.png'

export class Planet_mars
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)
        this.container = new THREE.Object3D()
        
        this.setGlobe()
        this.setClouds()
        this.setAnimation()
    }

    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(0.55, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(globeDiffuseSource),
            normalMap: this.textureLoader.load(globeNormalSource),
            roughnessMap: this.textureLoader.load(globeRoughnessSource),
            metalnessMap: this.textureLoader.load(globeRoughnessSource)
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.container.add(this.globe.mesh)
    }

    setClouds()
    {
        this.clouds = {}
        this.clouds.geometry = new THREE.SphereBufferGeometry(0.56, 45, 45)
        this.clouds.material = new THREE.MeshStandardMaterial({
            alphaMap: this.textureLoader.load(cloudsAlphaSource),
            transparent: true
        })
        this.clouds.mesh = new THREE.Mesh(this.clouds.geometry, this.clouds.material)
        this.container.add(this.clouds.mesh)
    }
    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            this.globe.mesh.rotation.y += 0.001
            this.clouds.mesh.rotation.y += 0.0008
        }
        loop()
    }
}

