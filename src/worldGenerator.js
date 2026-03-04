// Perlin Noise terrain generation code

class PerlinNoise {
    constructor() {
        this.permutation = this.generatePermutation();
    }

    generatePermutation() {
        const p = new Array(256).fill(0).map((_, i) => i);
        for (let i = 255; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [p[i], p[r]] = [p[r], p[i]];
        }
        return p.concat(p);
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad(hash, x, y) {
        const h = hash & 3;
        const u = h < 2 ? x : y;
        const v = h < 2 ? y : x;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    noise(x, y) {
        const xi = Math.floor(x) & 255;
        const yi = Math.floor(y) & 255;
        const xf = x - Math.floor(x);
        const yf = y - Math.floor(y);
        const u = this.fade(xf);
        const v = this.fade(yf);

        const aa = this.permutation[this.permutation[xi] + yi];
        const ab = this.permutation[this.permutation[xi] + yi + 1];
        const ba = this.permutation[this.permutation[xi + 1] + yi];
        const bb = this.permutation[this.permutation[xi + 1] + yi + 1];

        const x1 = this.lerp(u, this.grad(aa, xf, yf), this.grad(ab, xf, yf - 1));
        const x2 = this.lerp(u, this.grad(ba, xf - 1, yf), this.grad(bb, xf - 1, yf - 1));

        return (this.lerp(v, x1, x2) + 1) / 2; // Normalize to [0, 1]
    }
}

// Example of using the PerlinNoise class for terrain generation
const perlin = new PerlinNoise();
const width = 100;
const height = 100;
const terrain = [];

for (let y = 0; y < height; y++) {
    terrain[y] = [];
    for (let x = 0; x < width; x++) {
        terrain[y][x] = perlin.noise(x * 0.1, y * 0.1); // Scale noise input for detail
    }
}

console.log(terrain); // Output the terrain array