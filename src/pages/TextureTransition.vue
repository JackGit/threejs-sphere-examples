<template>
  <page>
    <div ref="mountNode"></div>
    <div class="c-pageTools">
      <button @click="handleClickTransite" :disabled="transitioning">Transite</button>
    </div>
  </page>
</template>

<script>
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import Animate from '@/3d/animate'

export default {
  components: {
    Page
  },

  data () {
    return {
      transitioning: false
    }
  },

  mounted () {
    this.container3d = new Container3D(this.$refs.mountNode)
    this.animate = new Animate(this.container3d)
  },

  methods: {
    handleClickTransite () {
      this.transitioning = true
      this.animate.transiteTexture().onComplete(() => this.transitioning = false)
    }
  }
}
</script>
