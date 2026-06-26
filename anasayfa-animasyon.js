document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Bükülebilir siber radar düzlemi
    const geometry = new THREE.PlaneGeometry(65, 65, 90, 90);
    
    // IŞIĞA İHTİYAÇ DUYMAYAN VE KENDİLİĞİNDEN NEON PARLAYAN MOTOR (MeshBasicMaterial)
    const material = new THREE.MeshBasicMaterial({
        color: 0x00e5ff, // Siber Turkuaz / Neon Mavi Çizgiler
        wireframe: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2.3; // Radar derinlik yataylığı
    scene.add(mesh);

    // Fare hareket değişkenleri
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.08;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.08;
    });

    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();
        const positionAttribute = geometry.attributes.position;

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Plazma dalgalarının matematiksel akış hesabı
        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);

            // Zamanla ve fareyle tetiklenen siber dalgalar
            const z = Math.sin(x * 0.2 + time * 1.8) * Math.cos(y * 0.2 + time * 1.2) * 2.2
                      + Math.sin(x + targetX * 0.4) * 0.6; 

            positionAttribute.setZ(i, z);
        }
        
        positionAttribute.needsUpdate = true;

        // Ağın kendi ekseninde askeri radar gibi ağır dönüşü
        mesh.rotation.z = time * 0.02;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
