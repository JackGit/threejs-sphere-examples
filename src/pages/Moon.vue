<template>
  <page>
    <texture-pre-loader :textures="['moon']" @complete="init()">
      <div ref="mountNode"></div>
    </texture-pre-loader>
  </page>
</template>

<script>
import TexturePreLoader from '@/components/TexturePreLoader'
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { createMoon } from '@/3d/creation'
import { MOON_DISTANCE } from '@/constants/earth'
import { Vector3, Object3D } from 'three'

export default {
  container3d: null,
  moon: null,
  moonParent: null,

  components: {
    Page,
    TexturePreLoader
  },

  methods: {
    init () {
      const container3d = new Container3D(this.$refs.mountNode)
      const moon = createMoon()
      const moonParent = new Object3D()

      this.$options.container3d = container3d
      this.$options.moon = moon
      this.$options.moonParent = moonParent

      // move camera a little bit far
      container3d.camera.position.z = 40

      // add moon
      moon.position.z = MOON_DISTANCE
      moonParent.add(moon)
      container3d.earthGroup.add(moonParent)

      container3d.onUpdate(() => {
        this.updateRotation()
        this.updateRevolution()
      })
    },
    updateRotation () {
      this.$options.moon.rotation.y += 0.01
    },
    updateRevolution () {
      const { moonParent } = this.$options
      // moonParent.rotation.x += 0.001
      moonParent.rotation.y += 0.01
    }
  }
}
</script>
