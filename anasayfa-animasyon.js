// 3D Siber Uzay Parçacık Motoru
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('canvas-container');
    if (!container) return; // Dosya yoksa hata vermemesi için koruma

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 2500; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(12), THREE.MathUtils.randFloatSpread(12), THREE.MathUtils.randFloatSpread(12));
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.035, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0, scrollY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = (e.clientX / window.innerWidth) * 2 - 1; mouseY = -(e.clientY / window.innerHeight) * 2 + 1; });
    window.addEventListener('scroll', () => { scrollY = window.scrollY; });

    function animate() {
        requestAnimationFrame(animate);
        targetX += (mouseX - targetX) * 0.05; targetY += (mouseY - targetY) * 0.05;
        particleSystem.rotation.x += 0.001; particleSystem.rotation.y += 0.0015;
        particleSystem.rotation.x += targetY * 0.02; particleSystem.rotation.y += targetX * 0.02;
        particleSystem.position.y = (scrollY * 0.002); particleSystem.position.z = (scrollY * 0.001);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
