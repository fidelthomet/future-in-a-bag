<template>
  <div class="three-scene" :class="{ 'non-interactive': nonInteractive }" ref="three"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @touchstart="onMouseDown"
    @touchend="onMouseUp">
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
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0, zoom: 1 })
    },
    nonInteractive: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scene: null,
      renderer: null,
      camera: null,
      container: null,
      controls: null,
      mouse: { x: 5000, y: 5000 },
      mouseDown: false,
      mouseMoved: false
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

    const { camera, renderer, scene, $refs, animate, container, nonInteractive } = this
    camera.position.set(0, 0, 1000)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.outputEncoding = THREE.sRGBEncoding
    const ambientLight = new THREE.AmbientLight(0xffffff, 3)
    const dirLight = new THREE.DirectionalLight(0xffffff, 3)
    dirLight.position.set(100, 500, 400)
    scene.add(dirLight, ambientLight)
    scene.add(container)
    $refs.three.appendChild(renderer.domElement)
    if (!nonInteractive) {
      this.controls = new MapControls(camera, renderer.domElement)
      this.controls.enableDamping = true
      this.controls.enableKeys = false
      this.controls.enableRotate = false
      // this.controls.enableZoom = false
      this.controls.dampingFactor = 0.2
      this.controls.screenSpacePanning = true

      this.controls.minDistance = 100
      this.controls.maxDistance = 500

      this.controls.minZoom = 0.25
      this.controls.maxZoom = 2

      this.controls.addEventListener('change', () => {
        this.onMouseMove()
      })

      this.controls.maxPolarAngle = Math.PI / 2
    }
    animate()
  },
  methods: {
    animate (t = 0) {
      const { animate, scene, camera, renderer, controls, nonInteractive, position } = this

      if (!nonInteractive) {
        controls.update()
        this.$emit('position', { x: -camera.position.x, y: camera.position.y, zoom: camera.zoom })
      } else {
        camera.position = new THREE.Vector3(-position.x, position.y, 500)
        camera.zoom = position.zoom
        // camera.updateMatrixWorld()
        camera.updateProjectionMatrix()
      }
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
    // onMouseMove (event) {
    //   this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    //   this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // },
    onMouseMove () {
      if (this.mouseDown) this.mouseMoved = true
    },
    onMouseDown () {
      this.mouseMoved = false
      this.mouseDown = true
    },
    onMouseUp (e) {
      if (!this.mouseMoved) this.$emit('click', e)
      // console.log(e.clientX || e.changedTouches[0].clientX)
      this.mouse = {
        x: ((e.clientX || e.changedTouches[0].clientX) / window.innerWidth) * 2 - 1,
        y: -((e.clientY || e.changedTouches[0].clientY) / window.innerHeight) * 2 + 1
      }
      this.mouseDown = false
      this.mouseMoved = false
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
    },
    clicked (e) {
      this.$emit('click', e)
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

  &.non-interactive {
    pointer-events: none;
  }
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
