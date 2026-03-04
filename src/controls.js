// src/controls.js

// Player control variables
const speed = 5;
let cameraYaw = 0;
let cameraPitch = 0;

// Get the player's movement and mouse look functionality
function setupControls() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousemove', onMouseMove);
}

function onKeyDown(event) {
    switch(event.key) {
        case 'w':
            movePlayer(0, 0, -1);
            break;
        case 's':
            movePlayer(0, 0, 1);
            break;
        case 'a':
            movePlayer(-1, 0, 0);
            break;
        case 'd':
            movePlayer(1, 0, 0);
            break;
    }
}

function onKeyUp(event) {
    // Handle key release if necessary
}

function onMouseMove(event) {
    cameraYaw += event.movementX * 0.1;
    cameraPitch -= event.movementY * 0.1;
    // Clamp the pitch
    cameraPitch = Math.max(-89, Math.min(89, cameraPitch));
    updateCameraRotation(cameraYaw, cameraPitch);
}

function movePlayer(x, y, z) {
    // Implement movement logic here
}

function updateCameraRotation(yaw, pitch) {
    // Implement camera rotation here
}

setupControls();