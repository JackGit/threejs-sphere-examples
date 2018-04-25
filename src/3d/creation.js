import {
  Mesh, SphereGeometry, AdditiveBlending,
  MeshPhongMaterial, MeshBasicMaterial,
  AmbientLight, SpotLight, DirectionalLight, TextureLoader,
  BackSide
} from 'three'
import { RADIUS, MOON_RADIUS, DOME_RADIUS } from '@/constants/earth'
import TEXTURE from '@/constants/texture'

const getTexture = (texture) => {
  return new TextureLoader().load(texture)
}

export function createCloud () {
  return new Mesh(
    new SphereGeometry(5.1, 40, 40),
    new MeshPhongMaterial({
      map: getTexture(TEXTURE.earthCloud),
      transparent: true,
      opacity: 1,
      blending: AdditiveBlending
    })
  )
}

export function createEarth () {
  return new Mesh(
    new SphereGeometry(RADIUS, 32, 32),
    new MeshPhongMaterial({
      map: getTexture(TEXTURE.earth),
      bumpMap: getTexture(TEXTURE.earthBump),
      bumpScale: 0.15,
      specularMap: getTexture(TEXTURE.earthSpec),
      specular: 0x909090,
      shininess: 4,
      transparent: true
    })
  )
}

export function createNightEarth () {
  return new Mesh(
    new SphereGeometry(RADIUS, 32, 32),
    new MeshPhongMaterial({
      map: getTexture(TEXTURE.earthNight),
      bumpMap: getTexture(TEXTURE.earthBump),
      bumpScale: 0.15,
      specularMap: getTexture(TEXTURE.earthSpec),
      specular: 0x909090,
      shininess: 4,
      transparent: true
    })
  )
}

export function createMoon () {
  return new Mesh(
    new SphereGeometry(MOON_RADIUS, 32, 32),
    new MeshPhongMaterial({
      map: getTexture(TEXTURE.moon),
    })
  )
}

export function createDome () {
  // have to use basic material, otherwise will have light effects
  const material = new MeshBasicMaterial({
    map: getTexture(TEXTURE.space),
  })
  // need set as backside
  material.side = BackSide
  return new Mesh(
    new SphereGeometry(DOME_RADIUS, 32, 32),
    material
  )
}

export function createAmbientLight () {
  return new AmbientLight(0x393939, 0.5)
}

export function createSpotLight () {
  const spotLight = new SpotLight(0xffffff, 1.2)
  spotLight.position.set(-12, 12, 6)
  spotLight.angle = 0.2
  spotLight.castShadow = false
  spotLight.penumbra = 0.4
  spotLight.distance = 124
  spotLight.decay = 1
  spotLight.shadow.camera.near = 50
  spotLight.shadow.camera.far = 200
  spotLight.shadow.camera.fov = 35
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.mapSize.width = 1024
  return spotLight
}

export function createDirectionalLight () {
  const light = new DirectionalLight(0xffffff, 1)
  light.position.set(5, 3, 5)
  return light
}
