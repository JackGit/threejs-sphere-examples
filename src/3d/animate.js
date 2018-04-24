import TWEEN from '@tweenjs/tween.js'

class Animate {
  constructor () {
    this.loop()
  }

  loop = () => {
    requestAnimationFrame(this.loop)
    TWEEN.update()
  }
}

let instance = null
export const run = () => {
  if (instance) {
    return instance
  } else {
    return instance = new Animate()
  }
}
