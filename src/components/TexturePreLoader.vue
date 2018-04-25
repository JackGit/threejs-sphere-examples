<template>
  <div>
    <div v-if="completed">
      <slot></slot>
    </div>
    <div v-else>
      {{progress}}
    </div>
  </div>
</template>

<script>
import ResourceLoader from 'resource-loader'

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

    this.textures.forEach(t => {
      loader.add(t, t)
    })

    loader.onProgress.add(() => {
      this.progress = loader.progress
    })

    loader.onComplete.add(() => {
      this.completed = true
      this.$emit('complete')
    })

    loader.load()
  }
}
</script>
