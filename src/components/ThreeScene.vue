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
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.container = new THREE.Group()

    const { camera, renderer, scene, $refs, animate, container } = this
    camera.position.set(0, 0, 1000)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(1, 5, 4)
    scene.add(dirLight)
    scene.add(container)
    scene.background = new THREE.Color(0x020212)
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

    var geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    geometry.translate(0, 0.5, 0)
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true })

    for (var i = 0; i < 500; i++) {
      var mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = Math.random() * 1600 - 800
      mesh.position.y = Math.random() * 1600 - 800
      mesh.position.z = 0
      mesh.scale.x = 20
      mesh.scale.y = 20
      mesh.scale.z = 20
      mesh.updateMatrix()
      mesh.matrixAutoUpdate = false
      scene.add(mesh)
    }

    animate()
  },
  methods: {
    animate (t = 0) {
      const { animate, scene, camera, renderer, controls } = this
      // camera.updateMatrixWorld()
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    },
    resize () {
      const { width, height, camera, renderer } = this
      console.log(camera.position.x, camera.position.y, camera.position.z)
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
  canvas {
    display: block
  }
}
</style>
