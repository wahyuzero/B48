/**
 * 🌟 2026 Interactive 3D WebGL Fluid & Kinetic Choreography
 * Powered by Three.js & Modern GPU Shaders
 */

document.addEventListener("DOMContentLoaded", () => {
  init3DFluidBackground();
  init3DHeroModel();
  initScrollAnimations();
  initTiltCards();
  initCursorSpotlight();
  initMagneticButtons();
});

function init3DFluidBackground() {
  const container = document.getElementById("canvas3d-bg");
  if (!container || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 320, 650);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const SEPARATION = 45;
  const AMOUNTX = 65;
  const AMOUNTY = 65;
  const numParticles = AMOUNTX * AMOUNTY;

  const positions = new Float32Array(numParticles * 3);
  const scales = new Float32Array(numParticles);
  const colors = new Float32Array(numParticles * 3);

  const color1 = new THREE.Color(0x10b981);
  const color2 = new THREE.Color(0x06b6d4);
  const color3 = new THREE.Color(0x3b82f6);

  let i = 0, j = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
      positions[i + 1] = 0;
      positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
      scales[j] = 2.5;

      const mixRatio = (ix / AMOUNTX + iy / AMOUNTY) / 2;
      const c = color1.clone().lerp(color2, mixRatio).lerp(color3, (1 - mixRatio) * 0.5);
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;

      i += 3;
      j++;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(0xffffff) } },
    vertexShader: `
      attribute float scale;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = scale * ( 300.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5, 0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d);
        gl_FragColor = vec4( vColor, alpha * 0.75 );
      }
    `,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let mouseWorldX = 0, mouseWorldZ = 0;

  window.addEventListener("mousemove", (event) => {
    targetMouseX = (event.clientX - windowHalfX) * 0.5;
    targetMouseY = (event.clientY - windowHalfY) * 0.5;
    mouseWorldX = ((event.clientX / window.innerWidth) * 2 - 1) * (AMOUNTX * SEPARATION * 0.4);
    mouseWorldZ = (-(event.clientY / window.innerHeight) * 2 + 1) * (AMOUNTY * SEPARATION * 0.4);
  });

  window.addEventListener("resize", () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let count = 0;
  function animate() {
    requestAnimationFrame(animate);
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    camera.position.x = mouseX * 0.8;
    camera.position.y = 320 - mouseY * 0.5;
    camera.lookAt(0, 0, 0);

    const positionAttribute = geometry.attributes.position;
    const scaleAttribute = geometry.attributes.scale;
    const pos = positionAttribute.array;
    const sc = scaleAttribute.array;

    let pIdx = 0;
    let sIdx = 0;

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = pos[pIdx];
        const z = pos[pIdx + 2];
        let waveY = (Math.sin((ix + count) * 0.3) * 35) + (Math.sin((iy + count) * 0.5) * 35);

        const dx = x - mouseWorldX;
        const dz = z - mouseWorldZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        const maxDist = 280;

        if (dist < maxDist) {
          const factor = (1 - dist / maxDist);
          waveY += Math.sin(dist * 0.08 - count * 2) * factor * 60;
          sc[sIdx] = 2.5 + factor * 5.0;
        } else {
          sc[sIdx] = (Math.sin((ix + count) * 0.3) + 1) * 1.5 + (Math.sin((iy + count) * 0.5) + 1) * 1.5;
        }

        pos[pIdx + 1] = waveY;
        pIdx += 3;
        sIdx++;
      }
    }

    positionAttribute.needsUpdate = true;
    scaleAttribute.needsUpdate = true;
    count += 0.06;

    renderer.render(scene, camera);
  }
  animate();
}

function init3DHeroModel() {
  const container = document.getElementById("hero-3d-canvas");
  if (!container || typeof THREE === "undefined") return;

  const width = container.clientWidth || 130;
  const height = container.clientHeight || 130;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 3.2;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const geom1 = new THREE.IcosahedronGeometry(1.2, 1);
  const mat1 = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const mesh1 = new THREE.Mesh(geom1, mat1);
  scene.add(mesh1);

  const geom2 = new THREE.OctahedronGeometry(0.7, 0);
  const mat2 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.95
  });
  const mesh2 = new THREE.Mesh(geom2, mat2);
  scene.add(mesh2);

  const particleCount = 50;
  const pGeom = new THREE.BufferGeometry();
  const pPos = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const r = 1.6 + Math.random() * 0.2;
    pPos[i * 3] = Math.cos(angle) * r;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
    pPos[i * 3 + 2] = Math.sin(angle) * r;
  }
  pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x34d399,
    size: 0.08,
    transparent: true,
    opacity: 0.9
  });
  const particleRing = new THREE.Points(pGeom, pMat);
  scene.add(particleRing);

  let mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    mesh1.rotation.x += 0.008;
    mesh1.rotation.y += 0.012;
    mesh2.rotation.x -= 0.015;
    mesh2.rotation.y -= 0.01;
    particleRing.rotation.y += 0.015;

    scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, mouseX * 0.8, 0.05);
    scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, -mouseY * 0.8, 0.05);

    renderer.render(scene, camera);
  }
  animate();
}

function initScrollAnimations() {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-element", {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
      stagger: 0.12,
      duration: 1.1,
      ease: "power3.out"
    });

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((sec) => {
      gsap.from(sec.children, {
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 45,
        scale: 0.97,
        stagger: 0.1,
        duration: 0.85,
        ease: "power2.out"
      });
    });

    gsap.from(".tech-pill-card", {
      scrollTrigger: {
        trigger: ".tech-strip-section",
        start: "top 85%"
      },
      opacity: 0,
      scale: 0.8,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
  }
}

function initTiltCards() {
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.02,
      perspective: 1000
    });
  }
}

function initCursorSpotlight() {
  const spotlight = document.createElement("div");
  spotlight.className = "cursor-spotlight";
  document.body.appendChild(spotlight);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    spotlight.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    requestAnimationFrame(render);
  }
  render();
}

function initMagneticButtons() {
  const magnets = document.querySelectorAll(".btn-magnetic");
  magnets.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
}
