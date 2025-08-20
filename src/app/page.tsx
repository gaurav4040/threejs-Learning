"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const paneContainer = document.createElement('div');
  //   paneContainer.style.position = 'absolute';
  //   paneContainer.style.top = '20px';
  //   paneContainer.style.right = '20px';
  //   paneContainer.style.zIndex = '9999';
  //   document.body.appendChild(paneContainer);

  useEffect(() => {
    if (!canvasRef.current) return;

    (async function () {
      const pane = new Pane();

      //*creating scene ANCHOR
      const scene = new THREE.Scene();

      //*custom Geometry ANCHOR
      const vertices = new Float32Array([0, 0, 1, 0, 2, 0, 2, 0, 0]);
      const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
      const triangleGeometry = new THREE.BufferGeometry();
      triangleGeometry.setAttribute("position", bufferAttribute);

      //*Axis helper ANCHOR
      // const axisHelper = new THREE.AxesHelper(2);
      // scene.add(axisHelper);

      //*TEXTURE LOADER ANCHOR
      const textureLoader = new THREE.TextureLoader();

      //*INITIALIZE TEXTURE ANCHOR
      const spaceNormal = textureLoader.load(
        "/textures/space/space/space-cruiser-panels2_normal-ogl.png"
      );
      const spaceAo = textureLoader.load(
        "/textures/space/space/space-cruiser-panels2_ao.png"
      );
      const spaceAlbedo = textureLoader.load(
        "/textures/space/space/space-cruiser-panels2_albedo.png"
      );
      const spaceHeight = textureLoader.load(
        "/textures/space/space/space-cruiser-panels2_height.png"
      );
      const spaceMetal = textureLoader.load(
        "/textures/space/space/space-cruiser-panels2_metallic.png"
      );
      const spaceRoughness = textureLoader.load(
        "/textures/space/space/space-cruiser-panels2_roughness.png"
      );
      // spaceAo.repeat.set(4,2);
      // spaceAo.wrapT = THREE.RepeatWrapping;
      // spaceAo.wrapS = THREE.RepeatWrapping;

      // spacePreview.wrapT = THREE.MirroredRepeatWrapping
      // spacePreview.wrapS = THREE.MirroredRepeatWrapping
      //*creating Geometry and Material ANCHOR
      // const cubeGeometry = new THREE.BoxGeometry(1,1,1,2,2,2);
      // const cubeMaterial =  new THREE.MeshBasicMaterial({color:"green",wireframe:true});
      const sphereGeometry = new THREE.SphereGeometry(1, 66, 66);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        wireframe: false,
      });
      const torusGeometry1 = new THREE.TorusGeometry(10, 1, 30, 200);
      const torusGeometry2 = new THREE.TorusGeometry(10, 1, 30, 200);
      const torusMaterial = new THREE.MeshStandardMaterial({
        color:0xffd700,
        wireframe: false,
      });

      //*FOG ANCHOR
      const fog = new THREE.Fog("white", 20, 70);
      scene.fog = fog;

      //*SCENE BACKGROUND ANCHOR
      scene.background = new THREE.Color("black");

      //*changing material properties
      torusMaterial.side = 2;
      sphereMaterial.side = 2;
      torusMaterial.roughness = 0.3;
      torusMaterial.metalness = 1.08;
      
      sphereMaterial.map = spaceAlbedo;
      sphereMaterial.aoMap = spaceAo;
      sphereMaterial.displacementMap = spaceHeight;
      sphereMaterial.normalMap = spaceNormal;
      sphereMaterial.metalnessMap = spaceMetal;
      sphereMaterial.roughnessMap = spaceRoughness;
      sphereMaterial.metalness = 1;
      sphereMaterial.displacementBias = 5;

      //! PANE USAGE
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spherePane = (pane as any).addFolder({
        title: "Sphere Material",
        expanded: true,
      });
      spherePane.addBinding(sphereMaterial, "roughness", {
        min: 0,
        max: 3,
        step: 0.0000001,
      });
      spherePane.addBinding(sphereMaterial, "displacementBias", {
        min: 0,
        max: 10,
        step: 0.001,
      });
      spherePane.addBinding(sphereMaterial, "metalness", {
        min: 0,
        max: 2,
        step: 0.000001,
      });
      
      //! PANE USAGE
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const torusPane = (pane as any).addFolder({
        title: "Torus Material",
        expanded: true,
      }); 
      torusPane.addBinding(torusMaterial, "roughness", {
        min: 0,
        max: 3,
        step: 0.0000001,
      });
      torusPane.addBinding(torusMaterial, "color");
      torusPane.addBinding(torusMaterial, "metalness", {
        min: 0,
        max: 2,
        step: 0.000001,
      });


      //*creating Mesh
      // const cubeMesh = new THREE.Mesh(
      //   cubeGeometry,//ANCHOR
      //   // triangleGeometry,//ANCHOR
      //   cubeMaterial
      // );

      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const torusMesh1 = new THREE.Mesh(torusGeometry1, torusMaterial);
      const torusMesh2 = new THREE.Mesh(torusGeometry2, torusMaterial);
      sphereMesh.rotation.x = THREE.MathUtils.degToRad(90);
      torusMesh2.rotation.x = THREE.MathUtils.degToRad(90);
      //*LIGHT ANCHOR
      const light = new THREE.AmbientLight("0xffffff", 2);
      scene.add(light);

      const pointLight1 = new THREE.PointLight("0xffffff", 20);
      const pointLight2 = new THREE.PointLight("0xffffff", 20);
      const pointLight3 = new THREE.PointLight("0xffffff", 20);
      const pointLight4 = new THREE.PointLight("0xffffff", 20);
      const pointLight5 = new THREE.PointLight("0xffffff", 20);
      const pointLight6 = new THREE.PointLight("0xffffff", 20);
      const pointLight7 = new THREE.PointLight("0xffffff", 20);
      const pointLight8 = new THREE.PointLight("0xffffff", 20);
      pointLight1.position.set(8, 8, 8);
      pointLight2.position.set(-8, 8, 8);
      pointLight3.position.set(8, -8, 8);
      pointLight4.position.set(8, 8, -8);
      pointLight5.position.set(8, -8, -8);
      pointLight6.position.set(-8, -8, 8);
      pointLight7.position.set(-8, 8, -8);
      pointLight8.position.set(-8, -8, -8);
      scene.add(pointLight1);
      scene.add(pointLight2);
      scene.add(pointLight3);
      scene.add(pointLight4);
      scene.add(pointLight5);
      scene.add(pointLight6);
      scene.add(pointLight7);
      scene.add(pointLight8);
      // const axisHelper2 = new THREE.AxesHelper(2);//ANCHOR
      // cubeMesh.add(axisHelper2);//ANCHOR

      // cubeMesh.position.set(0,1,0);//ANCHOR

      //* adding mesh to scene ANCHOR
      // scene.add(cubeMesh);//ANCHOR
      scene.add(sphereMesh);
      scene.add(torusMesh1, torusMesh2);

      //*creating perspective Camera ANCHOR
      const camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      //*creating perspective Camera ANCHOR
      // const aspectRatio = window.innerWidth/window.innerHeight;TODO:
      // const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,200)TODO:

      //*position of camera ANCHOR
      camera.position.z = 20;
      camera.position.y = 1;

      //?  scene.add(camera)  ANCHOR we can also do it for object POV

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current ? canvasRef.current : undefined,
        antialias: true,
      });

      //* orbitControl ANCHOR
      const controls = new OrbitControls(camera, canvasRef.current);
      controls.enableDamping = true;
      controls.autoRotate = true; // ANCHOR auto rotation OF full scene

      //* RESOLVING PROBLEM OF PIXELS
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      //*EventListener ANCHOR
      window.addEventListener("resize", () => {
        //* changing aspectRation of camera for handling dynamic window view ANCHOR
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        //* setting size of render graphics ANCHOR
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      //* Initialize clock ANCHOR
      // const clock = new THREE.Clock();ANCHOR
      // let prevTime=0;ANCHOR

      const renderLoop = () => {
        // const currTime = clock.getElapsedTime(); ANCHOR
        // const delta = currTime-prevTime;ANCHOR
        // prevTime=currTime;ANCHOR
        // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1)*delta*100;ANCHOR

        controls.update();
        //* Rendering  graphics  ANCHOR
        renderer.render(scene, camera);
        //*loop render for animation frame to match device frame rate ANCHOR
        window.requestAnimationFrame(renderLoop);
      };
      renderLoop();
    })();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="threejs w-full h-screen"></canvas>
      {/* <div className="absolute select-none left-1/2 top-1/4 -translate-x-1/2   z-50">
        <div className='flex flex-row justify-center w-[50vw] h-[50vh] bg-gradient-to-br from-black/30 via-black/30 to-black/30 p-6 rounded-4xl'>
        <h1 className="  text-3xl font-bold  text-transparent bg-gradient-to-br from-white via-red-600 to-white bg-clip-text ">
          This is Awesome
        </h1>

        </div>

      </div> */}
    </div>
  );
}
