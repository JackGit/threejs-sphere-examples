<template>
  <page>
    <texture-pre-loader @complete="init()">
      <div ref="mountNode"></div>
    </texture-pre-loader>
  </page>
</template>

<script>
import TexturePreLoader from '@/components/TexturePreLoader'
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { Tween, Easing } from '@tweenjs/tween.js'

export default {
  components: {
    Page,
    TexturePreLoader
  },

  methods: {
    init () {
      const container3d = new Container3D(this.$refs.mountNode)
      const { camera, earth, earthGroup } = container3d
      const z = camera.position.z

      camera.position.z = 200
      earth.material.opacity = 0

      const t = new Tween({
        z: camera.position.z,
        opacity: 0,
        r: Math.PI * 4
      }).to({
        z,
        opacity: 1,
        r: 0
      }).easing(
        Easing.Cubic.Out
      ).onUpdate(({ z, opacity, r }) => {
        camera.position.z = z
        earth.material.opacity = opacity
        earthGroup.rotation.y = r
      })

      setTimeout(() => t.start(), 500)
    }
  }
}
</script>
