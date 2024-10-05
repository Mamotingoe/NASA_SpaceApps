// Import necessary libraries for 3D rendering, e.g., Three.js or any other
// Assuming Three.js is included in your HTML

function load3DModel(modelPath) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new THREE.GLTFLoader();
  loader.load(modelPath, function(gltf) {
      scene.add(gltf.scene);
      animate();
  }, undefined, function(error) {
      console.error(error);
  });

  function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
  }
}

// Call this function with the model path when you want to render it
load3DModel('static/3d_models/model1.glb'); // Adjust the path as necessary
