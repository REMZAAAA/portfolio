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

// 

const proj = document.getElementById("proj");
const projectsArray = {
    "1": {
        "name": "chroma",
        "desc": "Générateur de fond d'écran dynamique.",
        "link": "https://github.com/REMZAAAA/Chroma",
    },
    "2": {
        "name": "sae",
        "desc": "Développement d'un site web sur une controverse autour de l'IA et des Big Data.",
        "link": "https://github.com/REMZAAAA/sae",
    },
    "3": {
        "name": "mam",
        "desc": "Développement d'un site web pour une association avec Vite et Three.js",
        "link": "https://github.com/REMZAAAA/mam",
    },
    "4": {
        "name": "plancton",
        "desc": "Creation d'un planning pour étudiant avec Python (Flask)",
        "link": "https://github.com/REMZAAAA/plancton",
    }
}
const projName = proj.querySelector("div:nth-of-type(1)>h1");
const projDesc = proj.querySelector("div:nth-of-type(1)>p:nth-of-type(2)");
const projLink = proj.querySelector("div:nth-of-type(1)>a");
const projImg = proj.querySelector("div:nth-of-type(2)>img");

const projPrevBtn = proj.querySelector("#projPrevBtn");
const projNextBtn = proj.querySelector("#projNextBtn");

let currProj = 1
disableBtn(projPrevBtn);

function updateProj(newName, newDesc, newLink){
    projName.innerHTML = newName;
    projDesc.innerHTML = newDesc;
    projLink.setAttribute("href", newLink);
    projImg.setAttribute("src", `./img/${newName}.png`)
}

function disableBtn(btn){
    btn.disabled = true;
}

function enableBtn(btn){
    btn.disabled = false;
}

console.log(currProj);
console.log(Object.keys(projectsArray).length);

projPrevBtn.addEventListener("click", () => {
    if (currProj == 1) return;
    if (currProj == 2){
        disableBtn(projPrevBtn);
    } else {
        enableBtn(projNextBtn);
    }

    currProj -= 1;

    const newName = projectsArray[currProj]["name"];
    const newDesc = projectsArray[currProj]["desc"];
    const newLink = projectsArray[currProj]["link"];

    updateProj(newName, newDesc, newLink);

});

projNextBtn.addEventListener("click", () => {
    if (currProj == Object.keys(projectsArray).length) return;
    if (currProj == Object.keys(projectsArray).length - 1) {
        disableBtn(projNextBtn);
    } else {
        enableBtn(projPrevBtn);
    }

    currProj += 1;

    const newName = projectsArray[currProj]["name"];
    const newDesc = projectsArray[currProj]["desc"];
    const newLink = projectsArray[currProj]["link"];

    updateProj(newName, newDesc, newLink);

});