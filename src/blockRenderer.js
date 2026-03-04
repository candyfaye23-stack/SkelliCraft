import * as THREE from 'three';

const blockColors = {
    Stone: 0x7F7F7F,
    Dirt: 0x7B5E3A,
    Grass: 0x4E9A1A,
    Wood: 0x8B4513,
    Leaves: 0x228B22,
    Sand: 0xEDC9B8,
    Water: 0x1E90FF,
    Lava: 0xFF4500,
    Cobblestone: 0xA9A9A9
};

let blockMeshes = {};

export function createBlockMesh(type) {
    if (!blockColors[type]) {
        console.error('Invalid block type');
        return null;
    }
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: blockColors[type] });
    return new THREE.Mesh(geometry, material);
}

export function renderBlock(scene, position, type) {
    const blockMesh = createBlockMesh(type);
    if (blockMesh) {
        blockMesh.position.set(position.x, position.y, position.z);
        scene.add(blockMesh);
        blockMeshes[`${position.x},${position.y},${position.z}`] = blockMesh;
    }
}

export function renderBlocks(scene, blocks) {
    for (const { position, type } of blocks) {
        renderBlock(scene, position, type);
    }
}

export function removeBlockMesh(position) {
    const key = `${position.x},${position.y},${position.z}`;
    const blockMesh = blockMeshes[key];
    if (blockMesh) {
        blockMesh.parent.remove(blockMesh);
        delete blockMeshes[key];
    }
}

export function updateBlockMesh(position, newType) {
    removeBlockMesh(position);
    renderBlock(scene, position, newType);
}

export function clearAllBlocks(scene) {
    for (const key in blockMeshes) {
        scene.remove(blockMeshes[key]);
    }
    blockMeshes = {};
}