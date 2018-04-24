import TWEEN from '@tweenjs/tween.js'
const { Tween } = TWEEN

export const tweenMaterial = (sourceMaterial, targetMaterial) => {
  return new Tween({
    opacity: 0
  }).to({
    opacity: 1
  }).onUpdate(({ opacity }) => {
    sourceMaterial.opacity = 1 - opacity
    targetMaterial.opacity = opacity
  })
}

export const tweenPosition = (obj, sourcePosition, targetPosition) => {
  return new Tween({
    x: sourcePosition.x,
    y: sourcePosition.y,
    z: sourcePosition.z
  }).to({
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z
  }).onUpdate(({ x, y, z }) => {
    obj.position.set(x, y, z)
  })
}
