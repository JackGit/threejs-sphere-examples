<template>
  <page>
    <texture-pre-loader :textures="['space']" @complete="init()">
      <div ref="mountNode"></div>
    </texture-pre-loader>
  </page>
</template>

<script>
import TexturePreLoader from '@/components/TexturePreLoader'
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { createDome } from '@/3d/creation'

export default {
  container3d: null,

  components: {
    Page,
    TexturePreLoader
  },

  methods: {
    init () {
      const container3d = new Container3D(this.$refs.mountNode)
      const dome = createDome()
      container3d.earthGroup.add(dome)
    }
  }
}
</script>
