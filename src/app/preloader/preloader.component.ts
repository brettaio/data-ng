import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-preloader',
  template: '<div #webglCanvas></div>',
  styleUrls: ['./preloader.component.scss'],
})
export class PreloaderComponent implements OnInit {
  @ViewChild('webglCanvas', { static: true }) webglCanvas!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private frameId!: number;

  constructor() {}

  ngOnInit(): void {
    this.initScene();
    this.createCamera();
    this.createRenderer();
    this.createCube();
    this.animate();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private createCamera(): void {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.z = 5;
  }

  private createRenderer(): void {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.webglCanvas.nativeElement.appendChild(this.renderer.domElement);
  }

  private createCube(): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Load your SVG images here for cube sides
    const materials = [
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('launch-2023.svg'),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('launch-2023.svg'),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('launch-2023.svg'),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('launch-2023.svg'),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('launch-2023.svg'),
      }),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('launch-2023.svg'),
      }),
    ];

    this.cube = new THREE.Mesh(geometry, materials);
    this.scene.add(this.cube);
  }

  private animate(): void {
    this.frameId = requestAnimationFrame(() => {
      this.animate();
    });

    // Rotate the cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}
