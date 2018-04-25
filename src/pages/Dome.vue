<template>
  <page>
    <div ref="mountNode"></div>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { createDome } from '@/3d/creation'

export default {
  container3d: null,

  components: {
    Page
  },

  mounted () {
    const container3d = new Container3D(this.$refs.mountNode)
    const dome = createDome()
    container3d.earthGroup.add(dome)
  }
}
</script>
