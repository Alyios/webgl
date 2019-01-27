import * as THREE from 'three' // il n'y aura pas deux fois threejs, faites confiance au bunding ;)
/**************************************************************************************************************
 *                                                  PLANET    TEXTURE
 **************************************************************************************************************/
/******************************************************
 *                         Mercury
 ******************************************************/
// import globeDiffuseSource from '../images/textures/planet/globe/mercury/mercury_diffuse.jpg'
// import globeNormalSource from '../images/textures/planet/globe/mercury/mercury_normal.jpg'
// import globeRoughnessSource from '../images/textures/planet/globe/mercury/mercury_roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
// import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
// import rockDiffuseAlphaSource from '../images/textures/planet/rock/diffuse-alpha.png'
/******************************************************
 *                         Venus
 ******************************************************/
// import globeDiffuseSource from '../images/textures/planet/globe/diffuse.jpg'
// import globeNormalSource from '../images/textures/planet/globe/normal.jpg'
// import globeRoughnessSource from '../images/textures/planet/globe/roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
// import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
// import rockDiffuseAlphaSource from '../images/textures/planet/rock/diffuse-alpha.png'
/******************************************************
 *                         earth
 ******************************************************/
import globeDiffuseSource from '../../images/textures/planet/globe/diffuse.jpg'
import globeNormalSource from '../../images/textures/planet/globe/normal.jpg'
import globeRoughnessSource from '../../images/textures/planet/globe/roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
import cloudsAlphaSource from '../../images/textures/planet/clouds/alpha.jpg'
// import rockDiffuseAlphaSource from '../images/textures/planet/rock/diffuse-alpha.png'
/******************************************************
 *                         Mars
 ******************************************************/
// import globeDiffuseSource from '../images/textures/planet/globe/diffuse.jpg'
// import globeNormalSource from '../images/textures/planet/globe/normal.jpg'
// import globeRoughnessSource from '../images/textures/planet/globe/roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
// import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
// import rockDiffuseAlphaSource from '../images/textures/planet/rock/diffuse-alpha.png'
/******************************************************
 *                         Jupiter
 ******************************************************/
// import globeDiffuseSource from '../images/textures/planet/globe/jupiter/jupiter_diffuse.jpg'
// import globeRoughnessSource from '../images/textures/planet/globe/roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
// import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
/******************************************************
 *                         Saturne
 ******************************************************/
// import globeDiffuseSource from '../images/textures/planet/globe/diffuse.jpg'
// import globeNormalSource from '../images/textures/planet/globe/normal.jpg'
// import globeRoughnessSource from '../images/textures/planet/globe/roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
// import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
// import rockDiffuseAlphaSource from '../images/textures/planet/rock/diffuse-alpha.png'
/******************************************************
 *                         Uranus
 ******************************************************/
// import globeDiffuseSource from '../images/textures/planet/globe/diffuse.jpg'
// import globeNormalSource from '../images/textures/planet/globe/normal.jpg'
// import globeRoughnessSource from '../images/textures/planet/globe/roughness.jpg' // définit si la lumiere va peu ou bcp se diffuser sur la texture.
// import cloudsAlphaSource from '../images/textures/planet/clouds/alpha.jpg'
// import rockDiffuseAlphaSource from '../images/textures/planet/rock/diffuse-alpha.png'
/******************************************************
 *                         Neptune
 ******************************************************/

export class Planet
{
    constructor(_options) //le prof met des underscore aux paramètres
    {
        this.textureLoader = _options.textureLoader
        // on peut aussi mettre du scale dans les paramètres, ça serait fun !
        console.log(this.textureLoader)
        this.container = new THREE.Object3D()
        
        this.setGlobe()
        this.setClouds()
        // this.setBelt()
        this.setAnimation()
    }

    setGlobe()
    {
        this.globe = {}
        this.globe.geometry = new THREE.SphereBufferGeometry(1.5, 45, 45)
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
        this.clouds.geometry = new THREE.SphereBufferGeometry(1.51, 45, 45)
        // this.clouds.material = new THREE.MeshBasicMaterial // le prof conseille de toujours commencer avec celui-là
        // this.clouds.material = new THREE.MeshNormalMaterial() // ça nous montre la Normal, c'est trop coool !
        this.clouds.material = new THREE.MeshStandardMaterial({
            alphaMap: this.textureLoader.load(cloudsAlphaSource),
            transparent: true
        })
        this.clouds.mesh = new THREE.Mesh(this.clouds.geometry, this.clouds.material)
        this.container.add(this.clouds.mesh)
    }

    // setBelt()
    // {
    //     // les particules s'appellent maintenant les points dans THREEjs
    //     this.belt = {}
    //     this.belt.geometry = new THREE.Geometry() // on pourrait tout aussi bien importer un model 3D, et faire de toutes ses vertices des particules.
        
    //     for(let i = 0; i < 20000; i++)
    //     {
    //         const vertice = new THREE.Vector3()
            
    //         const angle = Math.random() * Math.PI * 2
    //         const distance = 1.5 + Math.random() * 1.5

    //         vertice.x = Math.sin(angle) * distance
    //         vertice.y = (Math.random() - 0.5) * 0.2
    //         vertice.z = Math.cos(angle) * distance

    //         this.belt.geometry.vertices.push(vertice) // quand on crée new Geometry, il y a dedans un objet qui s'appelle vertices
    //     }

        // this.belt.material = new THREE.MeshBasicMaterial() // ce n'est pas un material adapté pour les points, il faut utiliser la suivante.
    //     this.belt.material = new THREE.PointsMaterial({ // ça fait apparaitre des gros carrés blancs en guise de particules.
    //         size: 0.01, // taille en pixel
    //         sizeAttenuation: true, // ça permet de rendre les particules plus grandes quand elles sont pres de la cam. si on met sur true, conseil : divise par 5 le nombre de particule, car ça consomme ! ne pas utiliser si pas pertinent.
    //         map: this.textureLoader.load(rockDiffuseAlphaSource),
    //         transparent: true
    //     })
    //     this.belt.points = new THREE.Points(this.belt.geometry, this.belt.material)
    //     this.container.add(this.belt.points)
    // }

    setAnimation()
    {
        const loop = () =>
        {
            window.requestAnimationFrame(loop)

            this.globe.mesh.rotation.y += 0.0008
            this.clouds.mesh.rotation.y += 0.001
            // this.belt.points.rotation.y += 0.0005
        }
        loop()
    }
}

