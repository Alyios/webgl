import * as THREE from 'three'
/**************************************************************************************************************
 *                                                  PLANET    TEXTURE
 **************************************************************************************************************/
/******************************************************

 /******************************************************
  *                         Neptune
 ******************************************************/
 import globeDiffuseSource from '../../images/textures/planet/globe/neptune/neptune_diffuse.jpg'
 import cloudsAlphaSource from '../../images/textures/planet/clouds/alpha.jpg'
 import rockDiffuseAlphaSource from '../../images/textures/planet/rock/diffuse-alpha.png'

export class Planet_neptune
{
    constructor(_options)
    {
        this.textureLoader = _options.textureLoader
        console.log(this.textureLoader)
        this.container = new THREE.Object3D()
        
        this.setGlobe()
        // this.setClouds()
        this.setBelt()
        this.setAnimation()
    }

    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(1.55, 45, 45)
        this.globe.material = new THREE.MeshStandardMaterial({
            map: this.textureLoader.load(globeDiffuseSource),
        })
        this.globe.mesh = new THREE.Mesh(this.globe.geometry, this.globe.material)
        this.container.add(this.globe.mesh)
    }

    setClouds()
    {
        this.clouds = {}
        this.clouds.geometry = new THREE.SphereBufferGeometry(1.56, 45, 45)
        this.clouds.material = new THREE.MeshStandardMaterial({
            alphaMap: this.textureLoader.load(cloudsAlphaSource),
            transparent: true
        })
        this.clouds.mesh = new THREE.Mesh(this.clouds.geometry, this.clouds.material)
        this.container.add(this.clouds.mesh)
    }

    setBelt()
    {
        this.belt = {}
        this.belt.geometry = new THREE.Geometry()
        
        for(let i = 0; i < 10000; i++)
        {
            const vertice = new THREE.Vector3()
            
            const angle = Math.random() * Math.PI * 2
            const distance = 2 + Math.random() * 0.5

            vertice.x = Math.sin(angle) * distance
            vertice.y = (Math.random() - 0.5) * 0.02
            vertice.z = Math.cos(angle) * distance

            this.belt.geometry.vertices.push(vertice)
        }
        this.belt.material = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true,
            map: this.textureLoader.load(rockDiffuseAlphaSource),
            transparent: true
        })
        this.belt.points = new THREE.Points(this.belt.geometry, this.belt.material)
        this.container.add(this.belt.points)
    }

    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            this.globe.mesh.rotation.y += 0.001
            // this.clouds.mesh.rotation.y += 0.0008
            this.belt.points.rotation.y += 0.0005
        }
        loop()
    }
}

