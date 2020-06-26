<template>
  <div class="three-scene" ref="three" @mousemove="onMouseMove">
    <slot/>
  </div>
</template>

<script>
import { MapControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
export default {
  name: 'three-scene',
  props: {
    width: {
      default: 768,
      type: Number
    },
    height: {
      default: 768,
      type: Number
    },
    step: {
      default: 0,
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
    z: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      scene: null,
      renderer: null,
      camera: null,
      container: null,
      controls: null,
      mouse: { x: 5000, y: 5000 }
    }
  },
  provide () {
    return {
      getContainer: this.getContainer,
      $mouse: () => this.mouse,
      $camera: () => this.camera,
      $renderer: () => this.renderer
    }
  },
  mounted () {
    const { width, height } = this
    this.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.container = new THREE.Group()

    const { camera, renderer, scene, $refs, animate, container } = this
    camera.position.set(0, 0, 1000)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = THREE.sRGBEncoding
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(100, 500, 400)
    scene.add(dirLight, ambientLight)
    scene.add(container)
    $refs.three.appendChild(renderer.domElement)

    this.controls = new MapControls(camera, renderer.domElement)
    this.controls.enableDamping = true
    this.controls.enableKeys = false
    this.controls.enableRotate = false
    this.controls.enableZoom = false
    this.controls.dampingFactor = 0.2
    this.controls.screenSpacePanning = true

    this.controls.minDistance = 100
    this.controls.maxDistance = 500

    this.controls.maxPolarAngle = Math.PI / 2
    animate()
  },
  methods: {
    animate (t = 0) {
      const { animate, scene, camera, renderer, controls } = this
      // camera.updateMatrixWorld()
      controls.update()
      this.$emit('position', { x: -camera.position.x, y: camera.position.y, zoom: camera.zoom })
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    },
    resize () {
      const { width, height, camera, renderer } = this
      camera.left = width / -2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = height / -2
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    },
    onMouseMove (event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    },
    getProp (prop) {
      return (found) => {
        const check = () => {
          if (this[prop]) {
            found(this[prop])
          } else {
            setTimeout(check, 50)
          }
        }
        check()
      }
    },
    getScene (found) {
      const check = () => {
        if (this.scene) {
          found(this.scene)
        } else {
          setTimeout(check, 50)
        }
      }
      check()
    },
    getContainer (found) {
      const check = () => {
        if (this.container) {
          found(this.container)
        } else {
          setTimeout(check, 50)
        }
      }
      check()
    }
  },
  watch: {
    width () {
      this.resize()
    },
    height () {
      this.resize()
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
.three-scene {
  width: 100vw;
  height: 100%;
}
</style>
<style lang="scss">
.three-scene {
  position: absolute;
  canvas {
    display: block
  }
}
</style>
