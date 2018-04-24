<template>
  <page>
    <div ref="mountNode"></div>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { createMoon } from '@/3d/creation'
import { MOON_DISTANCE } from '@/constants/earth'
import { Vector3, Spherical } from 'three'

export default {
  container3d: null,
  moon: null,
  spherical: new Spherical(),

  components: {
    Page
  },

  mounted () {
    const container3d = new Container3D(this.$refs.mountNode)
    const moon = createMoon()

    this.$options.container3d = container3d
    this.$options.moon = moon

    // move camera a little bit far
    container3d.camera.position.z = 40

    // add moon
    moon.position.z = MOON_DISTANCE
    container3d.earthGroup.add(moon)

    container3d.onUpdate(() => {
      this.updateRotation()
      this.updateRevolution()
    })
  },

  methods: {
    updateRotation () {
      this.$options.moon.rotation.y += 0.01
    },
    updateRevolution () {
      const { moon, spherical } = this.$options
      spherical.setFromVector3(moon.position)
      spherical.phi += 0.01
      spherical.theta += 0.01
      spherical.makeSafe()
      moon.position.setFromSpherical(spherical)
    }
  }
}
</script>
