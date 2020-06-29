<script>
import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import colors from '@/assets/style/global.scss'
export default {
  name: 'scenario-bubble',
  inject: ['getContainer', '$mouse', '$camera'],
  props: {
    size: {
      default: 128,
      type: Number
    },
    x: {
      default: 0,
      type: Number
    },
    y: {
      default: 0,
      type: Number
    },
    dumb: {
      type: Object,
      default: null
    },
    smart: {
      type: Object,
      default: null
    },
    axis: {
      type: Object,
      default: () => new THREE.Vector3(0, 0, 1)
    },
    id: {
      default: null
    }
  },
  data () {
    return {
      container: new THREE.Group(),
      map: new THREE.MeshBasicMaterial(),
      group: new THREE.Group(),
      sphere: null,
      raycaster: new THREE.Raycaster()
    }
  },
  computed: {
    mouse () {
      return this.$mouse()
    },
    camera () {
      return this.$camera()
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.getContainer(c => {
      c.remove(this.container)
    })
  },
  render (h) {
    return null
  },
  methods: {
    init () {
      const { size, animate, getTexture } = this
      const geometry = new THREE.CircleBufferGeometry(size, 64, 64)
      const sphere = new THREE.SphereBufferGeometry(size, 64, 64)
      const matDumb = new THREE.MeshLambertMaterial({ color: colors.dumb })
      const matSmart = new THREE.MeshLambertMaterial({ color: colors.smart })
      // new MeshBasicMaterial({  })
      const matSphere = new THREE.MeshBasicMaterial({ map: getTexture(), transparent: true, opacity: 0.4 })
      matSphere.blending = THREE.AdditiveBlending
      const meshDumb = new THREE.Mesh(geometry, matDumb)
      const meshSmart = new THREE.Mesh(geometry, matSmart)
      this.sphere = new THREE.Mesh(sphere, matSphere)
      meshSmart.rotateX(Math.PI)
      this.group.add(meshDumb, meshSmart, this.sphere)
      this.setPosition()
      this.container.add(this.group)

      // var loader = new GLTFLoader()

      // loader.load(`./models/${this.smart}`, gltf => {
      //   const model = gltf.scene
      //   model.scale.set(400, 400, 400)
      //   model.translateZ(-40)
      //   model.rotateX(Math.PI / -2)
      //   this.group.add(model)
      // }, undefined, function (error) {
      //   console.error(error)
      // })

      // loader.load(`./models/${this.dumb}`, gltf => {
      //   const model = gltf.scene
      //   model.scale.set(400, 400, 400)
      //   model.translateZ(48)
      //   model.rotateX(Math.PI / 2)
      this.group.add(new THREE.Object3D().copy(this.smart))
      this.group.add(new THREE.Object3D().copy(this.dumb))
      this.group.visible = false
      // this.group.add(this.dumb.copy())
      // }, undefined, function (error) {
      //   console.error(error)
      // })

      requestAnimationFrame(animate)

      this.getContainer(c => {
        c.add(this.container)
      })
    },
    getTexture () {
      const color = new Uint8Array(12)
      color[0] = parseInt(colors.dumb.slice(1, 3), 16)
      color[1] = parseInt(colors.dumb.slice(3, 5), 16)
      color[2] = parseInt(colors.dumb.slice(5, 7), 16)
      color[3] = parseInt(colors.smart.slice(1, 3), 16)
      color[4] = parseInt(colors.smart.slice(3, 5), 16)
      color[5] = parseInt(colors.smart.slice(5, 7), 16)
      color[6] = parseInt(colors.dumb.slice(1, 3), 16)
      color[7] = parseInt(colors.dumb.slice(3, 5), 16)
      color[8] = parseInt(colors.dumb.slice(5, 7), 16)
      color[9] = parseInt(colors.smart.slice(1, 3), 16)
      color[10] = parseInt(colors.smart.slice(3, 5), 16)
      color[11] = parseInt(colors.smart.slice(5, 7), 16)
      return new THREE.DataTexture(color, 2, 2, THREE.RGBFormat)
    },
    animate (t = 0) {
      const { animate, group, axis } = this
      this.group.visible = true
      group.setRotationFromAxisAngle(axis, t * 0.001)
      requestAnimationFrame(animate)
    },
    setPosition () {
      this.group.position.set(this.x, this.y, 0)
    },
    hitTest (mouse) {
      const { camera, raycaster, sphere } = this
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects([sphere])
      if (intersects.length > 0) {
        this.$parent.$emit('detail', this.id)
      }
    }
  },
  watch: {
    x () {
      this.setPosition()
    },
    y () {
      this.setPosition()
    },
    mouse (mouse) {
      this.hitTest(mouse)
    }
  }
}
</script>
