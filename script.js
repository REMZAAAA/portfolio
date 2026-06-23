const cube = document.querySelector(".cube");
const scene = document.querySelector("#scene");

let isDragging = false;
let activePointerId = null;

let startX = 0;
let startY = 0;

let rotationX = 0;
let rotationY = 0;

let velocityX = 0;
let velocityY = 0;

const friction = 0.92;
const sensitivity = 0.02;

const minRotationX = -90;
const maxRotationX = 90;

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function updateCube() {
    cube.style.transform = `translateZ(calc(var(--c) / 2)) rotateX(${-rotationX}deg) rotateY(${-rotationY}deg)`;
}

function animate() {
    velocityX *= friction;
    velocityY *= friction;

    rotationX += velocityX;
    rotationY += velocityY;

    rotationX = clamp(rotationX, minRotationX, maxRotationX);

    updateCube();

    requestAnimationFrame(animate);
}

scene.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

scene.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 2) return;

    e.preventDefault();

    isDragging = true;
    activePointerId = e.pointerId;

    scene.setPointerCapture(e.pointerId);

    startX = e.clientX;
    startY = e.clientY;
});

scene.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    if (e.pointerId !== activePointerId) return;

    e.preventDefault();

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    velocityY += deltaX * sensitivity;
    velocityX -= deltaY * sensitivity;

    startX = e.clientX;
    startY = e.clientY;
});

function stopDrag() {
    isDragging = false;
    activePointerId = null;
}

scene.addEventListener("pointerup", stopDrag);
scene.addEventListener("pointercancel", stopDrag);
scene.addEventListener("lostpointercapture", stopDrag);

window.addEventListener("blur", () => {
    isDragging = false;
    activePointerId = null;
});

animate();