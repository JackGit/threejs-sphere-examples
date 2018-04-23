import * as THREE from 'three'
import { createAmbientLight, createSpotLight, createEarth, createCloud } from '@/3d/creation'
import { PAGE_WIDTH as WIDTH, PAGE_HEIGHT as HEIGHT } from '@/constants/page'
const OrbitControls = require('three-orbit-controls')(THREE)

export default class Earth {
  constructor (el) {
    this.container = typeof el === 'string' ? document.getElementById(el) : el

    this.width = WIDTH * 2
    this.height = HEIGHT * 2
    this.camera = null
    this.renderer = null
    this.orbitController = null

    this.scene = null
    this.earthGroup = null

    this.cloud = null
    this.cloudSpeed = -0.0003

    this.init()
  }

  init () {
    this.createRenderer()
    this.createScene()
    this.createCamera()
    this.createLight()
    this.createEarth()
    this.createCloud()
    this.createController()
    this.loop()
  }

  createRenderer () {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true
    })
    const container = this.container

    renderer.setClearColor(0x000000, 0)
    renderer.setSize(this.width, this.height)
    renderer.domElement.style.position = 'relative'
    renderer.domElement.style.width = this.width / 2 + 'px'
    renderer.domElement.style.height = this.height / 2 + 'px'
    container.appendChild(renderer.domElement)

    this.renderer = renderer
  }

  createScene () {
    this.scene = new THREE.Scene()
    this.earthGroup = new THREE.Group()
    this.scene.add(this.earthGroup)
  }

  createCamera () {
    const camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 1000)
    camera.position.set(0, 0, 28)
    this.scene.add(camera) // this is required cause there is a light under camera
    this.camera = camera
  }

  createLight () {
    this.scene.add(createAmbientLight())
    this.camera.add(createSpotLight())  // fixed light direction by adding it as child of camera
    createSpotLight()
  }

  createEarth () {
    const earth = createEarth()
    earth.name = 'earth'
    this.earthGroup.add(earth)
  }

  createCloud () {
    const cloud = createCloud()
    this.earthGroup.add(cloud)
    this.cloud = cloud
  }

  createController () {
    const controller = new OrbitControls(this.camera, this.renderer.domElement)
    controller.rotateSpeed = 0.2
    controller.autoRotateSpeed = 0.1
    controller.autoRotate = true
    controller.enableZoom = false
    controller.enablePan = true
    controller.enableDamping = true
    controller.dampingFactor = 0.21
    controller.enabled = true
    this.orbitController = controller
  }

  loop = () => {
    requestAnimationFrame(this.loop)
    this.animate()
    this.render()
  }

  animate () {
    this.cloud.rotation.y += this.cloudSpeed
    this.orbitController.update()
  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }
}
