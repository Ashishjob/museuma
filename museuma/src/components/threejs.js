import { useEffect, useRef } from "react";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

export default function ThreeJSPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    if (container) {
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
    }

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    // const loader = new THREE.TextureLoader();
    // loader.load("./homebg.svg", function (texture) {
    //   scene.background = texture;
    // });

    const camera = new THREE.PerspectiveCamera(
      75,
      (container?.clientWidth ?? 0) / (container?.clientHeight ?? 0),
      0.1,
      1000
    );
    camera.position.z = 4;

    const controls = new OrbitControls(camera, renderer.domElement);

    const redLight = new THREE.SpotLight(0xEFEDE5, 50);
    redLight.position.set(10, 5, 2.5);
    scene.add(redLight);

    const blueLight = new THREE.SpotLight(0xffffff, 50);
    blueLight.position.set(-10, -5, -2.5);
    scene.add(blueLight);

    const spotLight = new THREE.SpotLight(0xEFEDE5, 100);
    spotLight.position.set(10, 5, 2.5);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0;
    spotLight.decay = 2;
    spotLight.distance = 0;

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 10;
    spotLight.shadow.focus = 1;

    scene.add(spotLight);

    new PLYLoader().load(
      "./statue.ply",
      function (geometry) {
        const material = new THREE.MeshLambertMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.0028, 0.0028, 0.0028);
        mesh.rotation.x = -Math.PI / 2;
        mesh.rotation.z = Math.PI / 1;
        mesh.position.x = 2;
        mesh.position.y = -0.5;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        mesh.geometry.computeVertexNormals();
      },()=>{},
      function (error) {
        console.error("An error occurred while loading the model:", error);
      }
    );

    console.log("Camera position:", camera.position);

    const lightHelper = new THREE.SpotLightHelper(spotLight);
    const animate = function () {
      requestAnimationFrame(animate);
      spotLight.position.x = Math.cos(Date.now() / 3000) * 2.5;
      spotLight.position.z = Math.sin(Date.now() / 3000) * 2.5;
      lightHelper.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ 
        width: '33vw', 
        height: '100vh', 
        backgroundImage: `url(${'./homebg.svg'})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
    }}>
        <div id="info">
        </div>
    </div>
);
}
