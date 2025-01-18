import React from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { ColorAverageEffect, SMAAEffect, EffectComposer, EffectPass, RenderPass, PixelationEffect, OutlineEffect, ColorDepthEffect, ShaderPass, OutlineMaterial, EdgeDetectionMaterial, BrightnessContrastEffect } from "postprocessing";
import { Moon } from "lunarphase-js";

import moonTextureImage from '../assets/img/moon-minimal.jpg?url';

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

    const controls = new OrbitControls(this.sceneRender.camera, this.sceneRender.renderer.domElement);

    //this.sceneRender.renderer.setPixelRatio(window.devicePixelRatio);
    //this.sceneRender.renderer.setSize(326, 316);
    this.sceneRender.camera.position.set(0, 0, 15);
    this.sceneRender.camera.lookAt(0, 0, 0)
    controls.update();

  }

  addTexture() {
    let textureLoader = new THREE.TextureLoader();
    this.sceneRender.moonTexture = textureLoader.load(moonTextureImage, this.addMoon.bind(this));
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
      200,
    );

    this.sceneRender.scene.add(starCluster);

    var dummy = new THREE.Object3D();

    const radius = 70; // Fixed distance from the center point

    for (var i = 0; i < 200; i++) {
      const size = Math.random() * 0.5 + 0.5;

      // Generate random spherical coordinates
      const theta = Math.random() * Math.PI * 2; // Azimuthal angle [0, 2π]
      const phi = Math.acos(2 * Math.random() - 1); // Polar angle [0, π]

      // Convert spherical coordinates to Cartesian coordinates
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
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
