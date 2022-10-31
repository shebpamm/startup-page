import React from "react";
import * as THREE from "three";

import { SMAAEffect, EffectComposer, EffectPass, RenderPass, PixelationEffect } from "postprocessing";

var BACKGOUND = 0xffffff

class LunarPhase extends React.Component {
  constructor(props) {
    super(props);

    this.sceneRender = {
      camera: null,
      scene: null,
      renderer: null
    }

  }

  componentDidMount() {
    this.init()
    this.addLight()
    this.addTexture()
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

    this.updateOrbit()

    this.sceneRender.renderer.render(this.sceneRender.scene, this.sceneRender.camera)
    this.sceneRender.composer.render();
  }

  init() {
    const canvasContainer = document.querySelector('canvas')

    this.sceneRender.clock = new THREE.Clock();

    this.sceneRender.scene = new THREE.Scene();
    this.sceneRender.scene.background = new THREE.Color(BACKGOUND);

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
      depth: false
    })

    this.sceneRender.composer = new EffectComposer(this.sceneRender.renderer);
    this.sceneRender.composer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    this.sceneRender.composer.addPass(new RenderPass(this.sceneRender.scene, this.sceneRender.camera));
    // this.sceneRender.composer.addPass(new EffectPass(this.sceneRender.camera, new BloomEffect()));
    this.sceneRender.composer.addPass(new EffectPass(this.sceneRender.camera, new SMAAEffect()));
    this.sceneRender.composer.addPass(new EffectPass(this.sceneRender.camera, new PixelationEffect(10)));

    this.sceneRender.renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    this.sceneRender.renderer.setPixelRatio(window.devicePixelRatio);

    //this.sceneRender.renderer.setPixelRatio(window.devicePixelRatio);
    //this.sceneRender.renderer.setSize(326, 316);
    this.sceneRender.camera.position.set(0, 0, 15);
    this.sceneRender.camera.lookAt(0, 0, 0)
  }

  addTexture() {
    const textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
    const normalURL = "src/assets/img/moon-normal.jpg";

    let textureLoader = new THREE.TextureLoader();
    this.sceneRender.moonNormal = textureLoader.load(normalURL);
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

    this.renderCanvas();
  }

  addLight() {
    this.sceneRender.light = new THREE.PointLight(0xffffff, 1, 0)
    this.sceneRender.light.position.set(0, 0, 0)
    this.sceneRender.scene.add(this.sceneRender.light);
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
