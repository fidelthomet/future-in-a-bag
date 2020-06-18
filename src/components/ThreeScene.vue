<template>
  <div class="three-scene" ref="three" @mousemove="onMouseMove">
    <slot/>
  </div>
</template>

<script>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Scene, WebGLRenderer, OrthographicCamera, Color, Group, DirectionalLight, Vector3 } from 'three'
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
      size: 1000,
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
    const { size, width, height } = this
    const aspect = width / height
    this.camera = new OrthographicCamera(size * aspect / -2, size * aspect / 2, size / 2, size / -2, 1, size * 2)
    this.scene = new Scene()
    this.renderer = new WebGLRenderer({ antialias: true })
    this.container = new Group()

    const { camera, renderer, scene, $refs, animate, container } = this
    camera.position.x = size
    camera.position.y = size / 4
    camera.lookAt(new Vector3(0, 0, 0))
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    const dirLight = new DirectionalLight(0xffffff, 1)
    dirLight.position.set(1, 5, 4)
    scene.add(dirLight)
    scene.add(container)
    scene.background = new Color(0x020212)
    $refs.three.appendChild(renderer.domElement)

    this.controls = new OrbitControls(this.camera, renderer.domElement)
    this.controls.minZoom = 1
    this.controls.maxZoom = 10
    this.controls.enablePan = false

    animate()
  },
  methods: {
    animate (t = 0) {
      const { animate, scene, camera, renderer, controls } = this
      camera.updateMatrixWorld()
      controls.rotateSpeed = 1 / this.camera.zoom
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    },
    resize () {
      const { width, height, camera, renderer, size } = this
      const aspect = window.innerWidth / window.innerHeight
      camera.left = -size * aspect / 2
      camera.right = size * aspect / 2
      camera.top = size / 2
      camera.bottom = -size / 2
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
  canvas {
    display: block
  }
}
</style>
