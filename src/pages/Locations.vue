<template>
  <page>
    <div ref="mountNode"></div>
    <div class="c-tools">
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
  </page>
</template>

<script>
import { ArrowHelper, Vector3 } from 'three'
import Page from '@/components/Page'
import Container3D from '@/3d/container'
import { coordinateToPosition } from '@/3d/utils'
import { RADIUS, ARROW_HELPER_LENGTH, LOCATIONS } from '@/constants/earth'

export default {
  container3d: null,

  components: {
    Page
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

  mounted () {
    this.container3d = new Container3D(this.$refs.mountNode)
  },

  methods: {
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
    },
    removeArrow () {
      const { scene } = this.container3d
      const arrow = scene.getObjectByName('arrow')
      if (arrow) {
        scene.remove(arrow)
      }
    },
    createArrow (position) {
      const { scene, earthGroup } = this.container3d
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

<style scoped>
.c-tools {
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  color: #fff;
}
</style>
