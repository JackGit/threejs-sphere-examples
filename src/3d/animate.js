import TWEEN from '@tweenjs/tween.js'
import { Vector3 } from 'three'
import { RADIUS } from '@/constants/earth'
const { Tween } = TWEEN

export default class Animate {
  constructor (container) {
    this.container = container
    this.loop()
  }

  loop = () => {
    requestAnimationFrame(this.loop)
    TWEEN.update()
  }

  moveCameraToTheTopOfLocation (position) {
    const { camera, earthGroup } = this.container
    const cameraHeight = camera.position.length()
    const v = new Vector3(position.x, position.y, position.z).multiplyScalar(cameraHeight / RADIUS)

    return new Tween({
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    }).to({
      x: v.x,
      y: v.y,
      z: v.z
    }).onUpdate(({ x, y, z }) => {
      camera.position.set(x, y, z)
    }).start()
  }

  transiteTexture () {
    const { earth, nightEarth } = this.container
    const isNight = nightEarth.material.opacity === 1
    return new Tween({
      opacity: isNight ? 0 : 1
    }).to({
      opacity: isNight ? 1 : 0
    }).onUpdate(({ opacity }) => {
      earth.material.opacity = opacity
      nightEarth.material.opacity = 1 - opacity
    }).start()
  }
}
