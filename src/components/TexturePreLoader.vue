<template>
  <div>
    <div v-if="completed">
      <slot></slot>
    </div>
    <div v-else class="c-progress">
      loading {{progress}}%
    </div>
  </div>
</template>

<script>
import ResourceLoader from 'resource-loader'
import TEXTURES from '@/constants/texture'

export default {
  props: {
    textures: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      progress: 0,
      completed: false
    }
  },

  created () {
    const loader = new ResourceLoader()
    ;[
      ...this.textures, 'earth', 'earthBump', 'earthSpec'
    ].map(t => TEXTURES[t]).forEach(t => loader.add(t, t))

    loader.onProgress.add(() => {
      this.progress = Math.round(loader.progress)
    })

    loader.onComplete.add(() => {
      this.completed = true
      this.$nextTick(() => this.$emit('complete'))
    })

    loader.load()
  }
}
</script>

<style scoped>
.c-progress {
  text-align: center;
}
</style>
