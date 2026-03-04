// Block types
const BlockType = {
    STONE: 'Stone',
    DIRT: 'Dirt',
    GRASS: 'Grass',
    WOOD: 'Wood',
    LEAVES: 'Leaves',
    SAND: 'Sand',
    WATER: 'Water',
    LAVA: 'Lava',
    COBBLESTONE: 'Cobblestone'
};

// Block properties
const BlockProperties = {
    SOLID: true,
    TRANSPARENT: false,
    COLOR: '#FFFFFF' // Default color
};

class Block {
    constructor(type, properties = {}) {
        this.type = type;
        this.properties = { ...BlockProperties, ...properties };
    }
}

class BlockManager {
    constructor() {
        this.blocks = new Map(); // Store blocks with position as key
    }

    setBlock(position, block) {
        this.blocks.set(position, block);
    }

    getBlock(position) {
        return this.blocks.get(position);
    }

    removeBlock(position) {
        return this.blocks.delete(position);
    }

    checkBlock(position) {
        return this.blocks.has(position);
    }
}

module.exports = { BlockType, Block, BlockManager };