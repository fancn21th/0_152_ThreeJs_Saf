let scene, camera, renderer, box;
const add = 0.01;

const render = function () {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("skyblue"),
  });
  box = new THREE.Mesh(geometry, material);
  scene.add(box);
};

// set up the environment -
// initialize scene, camera, objects and renderer
const init = function () {
  // create the scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00000);

  // create an locate the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 10;

  // axes helper
  let axes = new THREE.AxesHelper(15);
  scene.add(axes);

  render();

  // create light
  const light = new THREE.DirectionalLight();
  light.position.set(0, 1, 2);
  scene.add(light);

  // create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Observe a scene or a renderer
  if (typeof __THREE_DEVTOOLS__ !== "undefined") {
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: scene })
    );
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent("observe", { detail: renderer })
    );
  }
};

const animate = function () {
  box.rotation.y += add;
};

// main animation loop - calls 50-60 in a second.
const mainLoop = function () {
  animate();
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
};

///////////////////////////////////////////////
init();
mainLoop();
