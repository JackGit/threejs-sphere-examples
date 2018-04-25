<template>
  <page>
    <texture-pre-loader :textures="['earthNight']" @complete="init()">
      <div ref="mountNode"></div>
      <div class="c-pageTools">
        <button @click="handleClickTransite" :disabled="transitioning">Transite</button>
      </div>
    </texture-pre-loader>
  </page>
</template>

<script>
import TexturePreLoader from '@/components/TexturePreLoader'
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { createNightEarth } from '@/3d/creation'
import { tweenMaterial } from '@/3d/tween'

export default {
  container3d: null,
  nightEarth: null,

  components: {
    Page,
    TexturePreLoader
  },

  data () {
    return {
      transitioning: false,
      isNight: false
    }
  },

  methods: {
    init () {
      const container3d = new Container3D(this.$refs.mountNode)
      const nightEarth = createNightEarth()

      nightEarth.material.opacity = 0
      container3d.earthGroup.add(nightEarth)

      this.$options.container3d = container3d
      this.$options.nightEarth = nightEarth
    },
    tweenTexture () {
      const { container3d, nightEarth } = this.$options
      let sMaterial, tMaterial

      if (!this.isNight) {
        sMaterial = container3d.earth.material
        tMaterial = nightEarth.material
      } else {
        sMaterial = nightEarth.material
        tMaterial = container3d.earth.material
      }
      const t = tweenMaterial(sMaterial, tMaterial)

      t.onComplete(() => {
        this.isNight = !this.isNight
        this.transitioning = false
      }).start()

      this.transitioning = true
    },
    handleClickTransite () {
      this.tweenTexture()
    }
  }
}
</script>
