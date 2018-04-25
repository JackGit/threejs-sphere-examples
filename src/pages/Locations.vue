<template>
  <page>
    <texture-pre-loader @complete="init()">
      <div ref="mountNode"></div>
      <div class="c-pageTools">
        <select @change="handleSelectChange">
          <option value="">Select a city</option>
          <option v-for="location in locations" :key="location.key" :value="location.key">{{location.name}}</option>
          <option value="any">- your place -</option>
        </select>
        <p v-if="selectedLocation">{{selectedLocation.lat}},{{selectedLocation.lng}}</p>
        <div v-if="selectedLocationKey === 'any'">
          <input :value="latlng" placeholder="lat,lng" @change="handleInputChange" />
        </div>
      </div>
    </texture-pre-loader>
  </page>
</template>

<script>
import TexturePreLoader from '@/components/TexturePreLoader'
import { ArrowHelper, Vector3 } from 'three'
import { coordinateToPosition } from '@/3d/utils'
import { RADIUS, ARROW_HELPER_LENGTH, LOCATIONS } from '@/constants/earth'
import { tweenPosition } from '@/3d/tween'
import Page from '@/components/Page'
import Container3D from '@/3d/container'

export default {
  container3d: null,
  animate: null,

  components: {
    Page,
    TexturePreLoader
  },

  data () {
    return {
      locations: [...LOCATIONS],
      selectedLocationKey: null,
      latlng: ''
    }
  },

  watch: {
    selectedLocationKey (value) {
      const location = this.locations.filter(l => l.key === value)[0]

      this.removeArrow()
      if (location) {
        this.markLocation(location.lat, location.lng)
      }
    }
  },

  computed: {
    selectedLocation () {
      return this.locations.filter(l => l.key === this.selectedLocationKey)[0]
    }
  },

  methods: {
    init () {
      this.$options.container3d = new Container3D(this.$refs.mountNode)
    },
    handleSelectChange (e) {
      this.selectedLocationKey = e.target.value
    },
    handleInputChange (e) {
      this.latlng = e.target.value
      const [lat, lng] = e.target.value.split(',')

      this.removeArrow()
      this.markLocation(new Number(lat), new Number(lng))
    },
    markLocation (lat, lng) {
      const { x, y, z } = coordinateToPosition(lat, lng, RADIUS)
      this.createArrow(new Vector3(x, y, z))
      this.moveCamera({ x, y, z })
    },
    moveCamera ({ x, y, z }) {
      const { container3d } = this.$options
      const { camera } = container3d
      const cameraHeight = camera.position.length()
      const targetPosition = new Vector3(x, y, z).multiplyScalar(cameraHeight / RADIUS)
      tweenPosition(camera, camera.position, targetPosition).start()
    },
    removeArrow () {
      const { scene } = this.$options.container3d
      const arrow = scene.getObjectByName('arrow')
      if (arrow) {
        scene.remove(arrow)
      }
    },
    createArrow (position) {
      const { scene, earthGroup } = this.$options.container3d
      const v = position.clone().sub(earthGroup.position)

      const direction = v.clone().negate().normalize() // points from target position to the center of the earth
      const origin = v.clone().multiplyScalar((RADIUS + ARROW_HELPER_LENGTH) / RADIUS)

      const arrowHelper = new ArrowHelper(direction, origin)
      arrowHelper.name = 'arrow'
      scene.add(arrowHelper)
    }
  }
}
</script>
