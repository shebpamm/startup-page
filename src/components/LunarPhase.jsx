import React from "react";
import * as THREE from "three";

import { ColorAverageEffect, SMAAEffect, EffectComposer, EffectPass, RenderPass, PixelationEffect, OutlineEffect, ColorDepthEffect, ShaderPass, OutlineMaterial, EdgeDetectionMaterial, BrightnessContrastEffect } from "postprocessing";
import { Moon } from "lunarphase-js";

import moonFilterVertex from '../assets/shader/sunVertex.glsl'
import moonFilterFragment from '../assets/shader/sunFragment.glsl'

var BACKGOUND = 0xffffff

class LunarPhase extends React.Component {
  constructor(props) {
    super(props);

    this.sceneRender = {
      camera: null,
      scene: null,
      renderer: null,
      stars: []
    }

    this.state = {
      orbit_angle: this.props.phase || 0,
    }

  }

  componentDidMount() {
    this.init()
    this.addLight()
    this.addBackground()
    this.addTexture()
  }

  setOrbit(deg) {
    const distance = 10000;
    const rad = deg * (Math.PI / 180);

    const light = this.sceneRender.light;

    const center = this.sceneRender.moon.position;
    const x = (center.x + distance) * Math.sin(-rad)
    const y = (center.z + distance) * Math.cos(rad)

    light.position.set(x, 0, y)
  }

  updateOrbit() {
    const distance = 1000;
    const speed = 2;

    const light = this.sceneRender.light;
    const center = this.sceneRender.moon.position;
    const time = this.sceneRender.clock.getElapsedTime();

    const x = (center.x + distance) * Math.sin(time * -speed)
    const y = (center.z + distance) * Math.cos(time * speed)

    light.position.set(x, 0, y)
  }

  renderCanvas() {
    window.requestAnimationFrame(this.renderCanvas.bind(this))

    // this.updateOrbit()

    this.sceneRender.renderer.render(this.sceneRender.scene, this.sceneRender.camera)
    this.sceneRender.composer.render();
  }

  addPass(effect) {
    this.sceneRender.composer.addPass(new EffectPass(this.sceneRender.camera, effect));
  }

  init() {
    const canvasContainer = document.querySelector('canvas')

    this.sceneRender.clock = new THREE.Clock();

    this.sceneRender.scene = new THREE.Scene();
    // this.sceneRender.scene.background = new THREE.Color(BACKGOUND);

    this.sceneRender.camera = new THREE.PerspectiveCamera(
      75,
      canvasContainer.offsetWidth / canvasContainer.offsetHeight,
      1,
      65536);

    this.sceneRender.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('canvas'),
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false,
      alpha: true,
    });

    this.sceneRender.renderer.setClearColor(0x000000, 0);

    this.sceneRender.filterShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
      },

      vertexShader: moonFilterVertex,
      fragmentShader: moonFilterFragment,
    })

    this.sceneRender.composer = new EffectComposer(this.sceneRender.renderer);
    this.sceneRender.composer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    this.sceneRender.composer.addPass(new RenderPass(this.sceneRender.scene, this.sceneRender.camera));

    // this.addPass(new ColorDepthEffect({ bits: 8}));
    this.addPass(new BrightnessContrastEffect({ brightness: 0, contrast: 0 }));
    this.addPass(new PixelationEffect(8));

    // this.sceneRender.composer.addPass(new EffectPass(this.sceneRender.camera, new SMAAEffect()));

    // this.sceneRender.composer.addPass(new EffectPass(this.sceneRender.camera, new ColorDepthEffect({ bits: 8 })));

    this.sceneRender.renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    this.sceneRender.renderer.setPixelRatio(window.devicePixelRatio);

    //this.sceneRender.renderer.setPixelRatio(window.devicePixelRatio);
    //this.sceneRender.renderer.setSize(326, 316);
    this.sceneRender.camera.position.set(0, 0, 15);
    this.sceneRender.camera.lookAt(0, 0, 0)
  }

  addTexture() {
    // const textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
    const textureURL = "src/assets/img/moon-minimal.jpg";

    let textureLoader = new THREE.TextureLoader();
    this.sceneRender.moonTexture = textureLoader.load(textureURL, this.addMoon.bind(this));
  }

  addMoon() {
    this.sceneRender.moonMaterial = new THREE.MeshPhongMaterial(
      {
        color: 0xffffff,
        map: this.sceneRender.moonTexture,
        reflectivity: 0,
        shininess: 0
      }

    );

    this.sceneRender.moon = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      this.sceneRender.moonMaterial,
    );
    this.sceneRender.moon.position.set(0, 0, 0);
    this.sceneRender.scene.add(this.sceneRender.moon);

    const lunarPercent = Moon.lunarAgePercent()

    const moonDegrees = 220 + 180 * lunarPercent * 1.5;

    this.setOrbit(moonDegrees);

    this.renderCanvas();
  }

  addLight() {
    this.sceneRender.light = new THREE.PointLight(0xffffff, 1, 0)
    this.sceneRender.light.position.set(0, 0, 0)
    this.sceneRender.scene.add(this.sceneRender.light);
  }

  addBackground() {
    const starGeo = new THREE.SphereGeometry(1, 1, 1);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    var starCluster = new THREE.InstancedMesh(
      starGeo,
      starMat,
      100,
    );

    this.sceneRender.scene.add(starCluster);

    var dummy = new THREE.Object3D();

    for ( var i = 0 ; i < 100 ; i ++ ) {

      const size = Math.random()*0.5+0.5;
      
      dummy.position.set(Math.random()*150-70 , Math.random()*150-70, -60 );
      dummy.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
      dummy.scale.set(size, size, size);
      dummy.updateMatrix();
      starCluster.setMatrixAt(i, dummy.matrix);
    }
    starCluster.instanceMatrix.needsUpdate = true;

    this.sceneRender.starCluster = starCluster;
  }

  render() {
    return (
      <>
        <canvas className="rounded-xl w-full h-full" id="canvas" />
      </>
    );
  }
}

export default LunarPhase
