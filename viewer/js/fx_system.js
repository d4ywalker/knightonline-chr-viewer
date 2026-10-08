/**
 * Knight Online Visual Effects (FX) & Particle System for Three.js
 * Handles native .n3fxplug & .fxb bundles, skeletal bone-socket attachment,
 * and procedural elemental weapon/character auras.
 */

class FXSystem {
    constructor(scene, baseUrl = '/models/') {
        this.scene = scene;
        this.baseUrl = baseUrl;

        // Container for all active visual effects
        this.fxRootGroup = new THREE.Group();
        this.fxRootGroup.name = "FX_Root_Container";
        this.scene.add(this.fxRootGroup);

        // State
        this.enabled = true;
        this.nativeFXEnabled = true;
        this.proceduralAuraType = 'none'; // 'none', 'fire', 'ice', 'lightning', 'poison', 'rebirth', 'shadow'
        this.groundRuneEnabled = false;
        this.particleIntensity = 1.0;

        // Active instances
        this.nativeFXPlugs = []; // { group, jointIndex, offset, scale, updateFn }
        this.auraEmitter = null;
        this.groundRuneMesh = null;
        this.time = 0;

        // Shared procedural particle textures cache
        this._proceduralTextures = {};
        this._nativeTextureCache = new Map();
    }

    /**
     * Clear all current visual effects
     */
    clear() {
        this.clearNativeFX();
        this.clearProceduralAura();
        this.clearGroundRune();
    }

    clearNativeFX() {
        for (const plug of this.nativeFXPlugs) {
            if (plug.group && plug.group.parent) {
                plug.group.parent.remove(plug.group);
            }
        }
        this.nativeFXPlugs = [];
        if (this._nativeTextureCache) {
            this._nativeTextureCache.clear();
        }
    }

    clearProceduralAura() {
        if (this.auraEmitter) {
            if (this.auraEmitter.mesh && this.auraEmitter.mesh.parent) {
                this.auraEmitter.mesh.parent.remove(this.auraEmitter.mesh);
            }
            this.auraEmitter = null;
        }
    }

    clearGroundRune() {
        if (this.groundRuneMesh) {
            if (this.groundRuneMesh.parent) {
                this.groundRuneMesh.parent.remove(this.groundRuneMesh);
            }
            this.groundRuneMesh = null;
        }
    }

    /**
     * Attempt to load native .n3fxplug associated with the character model
     * @param {string} chrFileName - e.g. "16th_2018_knightman.n3chr" or "Chr/cctatata.n3chr"
     * @param {Object} skeletonData - Parsed N3Joint skeleton data
     * @returns {Promise<number>} Number of FX entries loaded
     */
    async loadModelNativeFX(chrFileName, skeletonData) {
        this.clearNativeFX();
        if (!this.nativeFXEnabled || !chrFileName) return 0;

        const baseName = chrFileName.replace(/^.*[\\\/]/, '').replace(/\.n3chr$/i, '');
        const plugPath = `${baseName}.n3fxplug`;
        const plugUrl = `${this.baseUrl}${plugPath}`;

        try {
            const resp = await fetch(plugUrl);
            if (!resp.ok) return 0;
            const buffer = await resp.arrayBuffer();
            const plugData = N3FXPlugParser.parse(buffer);

            if (!plugData.entries || plugData.entries.length === 0) return 0;

            let loadedCount = 0;
            for (const entry of plugData.entries) {
                const fxbUrl = `${this.baseUrl}${entry.fxbPath}`;
                try {
                    const fxbResp = await fetch(fxbUrl);
                    if (!fxbResp.ok) continue;
                    const fxbBuffer = await fxbResp.arrayBuffer();
                    const fxbData = FXBParser.parse(fxbBuffer);

                    const fxGroup = new THREE.Group();
                    fxGroup.name = `NativeFX_${baseName}_Joint${entry.jointIndex}`;
                    fxGroup.position.set(entry.offset.x, entry.offset.y, entry.offset.z);
                    fxGroup.scale.set(entry.scale.x, entry.scale.y, entry.scale.z);

                    // Build Billboard / Particle sprites for this FX
                    const animUpdaters = [];
                    for (const elem of fxbData.elements) {
                        const isBillboard = elem.isBillboard;
                        // Skip redundant _hdr duplicate billboard overlays
                        if (isBillboard && elem.texturePath.toLowerCase().includes('_hdr_')) {
                            continue;
                        }

                        const tex = await this.getOrLoadDxtTexture(elem.texturePath);
                        if (!tex) continue;

                        const spriteMat = new THREE.SpriteMaterial({
                            map: tex,
                            transparent: true,
                            blending: isBillboard ? THREE.NormalBlending : THREE.AdditiveBlending,
                            alphaTest: isBillboard ? 0.05 : 0.08,
                            depthWrite: false
                        });

                        const sprite = new THREE.Sprite(spriteMat);
                        const initialScale = isBillboard ? 2.2 : 0.8;
                        // Billboards in left-handed DirectX coordinates need horizontal mirroring to read correctly in Three.js
                        const scaleX = isBillboard ? -initialScale : initialScale;
                        sprite.scale.set(scaleX, initialScale, 1);
                        fxGroup.add(sprite);

                        // Billboard emblems stay upright (no spinning rotation). Radial aura particles can slowly rotate.
                        const rotSpeed = isBillboard ? 0 : (Math.random() - 0.5) * 1.5;
                        const phase = Math.random() * Math.PI * 2;
                        animUpdaters.push((t) => {
                            if (rotSpeed !== 0) {
                                sprite.material.rotation = t * rotSpeed;
                            }
                            const pulse = 1.0 + Math.sin(t * 3 + phase) * 0.08;
                            sprite.scale.set(scaleX * pulse, initialScale * pulse, 1);
                        });
                    }

                    const localMatrix = new THREE.Matrix4();
                    localMatrix.makeTranslation(entry.offset.x, entry.offset.y, entry.offset.z);
                    localMatrix.scale(new THREE.Vector3(entry.scale.x, entry.scale.y, entry.scale.z));
                    fxGroup.matrixAutoUpdate = false;

                    this.fxRootGroup.add(fxGroup);
                    this.nativeFXPlugs.push({
                        group: fxGroup,
                        jointIndex: entry.jointIndex,
                        localMatrix,
                        offset: entry.offset,
                        animUpdaters
                    });
                    loadedCount++;
                } catch (fxbErr) {
                    console.warn('Error loading fxb file:', entry.fxbPath, fxbErr);
                }
            }

            return loadedCount;
        } catch (e) {
            // Not all models have .n3fxplug, normal occurrence
            return 0;
        }
    }

    /**
     * Cache & load DXT texture via DxtDecoder
     */
    async getOrLoadDxtTexture(texturePath) {
        if (this._nativeTextureCache.has(texturePath)) {
            return this._nativeTextureCache.get(texturePath);
        }
        try {
            const url = `${this.baseUrl}${texturePath}`;
            const resp = await fetch(url);
            if (!resp.ok) return null;
            const buf = await resp.arrayBuffer();
            const decoded = DxtDecoder.decode(buf);
            const tex = new THREE.CanvasTexture(decoded.canvas);
            tex.flipY = false;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
            if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
            this._nativeTextureCache.set(texturePath, tex);
            return tex;
        } catch (e) {
            return null;
        }
    }

    /**
     * Set procedural elemental aura on character (Fire, Ice, Lightning, Poison, Rebirth, Shadow)
     */
    setProceduralAura(auraType) {
        this.proceduralAuraType = (auraType || 'none').toLowerCase();
        this.clearProceduralAura();

        if (this.proceduralAuraType === 'none' || !this.enabled) return;

        const config = this.getAuraConfig(this.proceduralAuraType);
        const particleCount = Math.floor(180 * this.particleIntensity);

        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const velocities = [];

        const baseColor = new THREE.Color(config.color1);
        const edgeColor = new THREE.Color(config.color2);

        for (let i = 0; i < particleCount; i++) {
            // Random initial placement around human/monster torso/hands
            const theta = Math.random() * Math.PI * 2;
            const r = 0.15 + Math.random() * 0.7;
            const y = 0.2 + Math.random() * 1.8;

            positions[i * 3 + 0] = Math.cos(theta) * r;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(theta) * r;

            // Interpolated glowing color
            const lerpVal = Math.random();
            const pCol = baseColor.clone().lerp(edgeColor, lerpVal);
            colors[i * 3 + 0] = pCol.r;
            colors[i * 3 + 1] = pCol.g;
            colors[i * 3 + 2] = pCol.b;

            sizes[i] = (config.size * (0.6 + Math.random() * 0.8)) * 32;

            velocities.push({
                vx: (Math.random() - 0.5) * config.spread,
                vy: config.speedY * (0.7 + Math.random() * 0.6),
                vz: (Math.random() - 0.5) * config.spread,
                initialY: y,
                maxLife: 1.0 + Math.random() * 1.5,
                age: Math.random() * 1.5
            });
        }

        geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            size: config.size,
            vertexColors: true,
            map: this.getParticleSparkTexture(),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.85
        });

        const points = new THREE.Points(geom, mat);
        points.name = `Aura_${this.proceduralAuraType}`;
        this.fxRootGroup.add(points);

        this.auraEmitter = {
            mesh: points,
            config,
            velocities
        };
    }

    /**
     * Get aura configuration properties
     */
    getAuraConfig(type) {
        switch (type) {
            case 'fire':
                return { color1: 0xff3b00, color2: 0xffea00, size: 0.35, speedY: 0.8, spread: 0.25 };
            case 'ice':
                return { color1: 0x00d2ff, color2: 0xffffff, size: 0.28, speedY: 0.3, spread: 0.35 };
            case 'lightning':
                return { color1: 0x60a5fa, color2: 0xf472b6, size: 0.32, speedY: 1.2, spread: 0.6 };
            case 'poison':
                return { color1: 0x22c55e, color2: 0x84cc16, size: 0.30, speedY: 0.4, spread: 0.3 };
            case 'rebirth':
                return { color1: 0xfacc15, color2: 0xfffbeb, size: 0.40, speedY: 0.6, spread: 0.2 };
            case 'shadow':
                return { color1: 0x7c3aed, color2: 0xd946ef, size: 0.38, speedY: 0.5, spread: 0.4 };
            default:
                return { color1: 0xffffff, color2: 0x93c5fd, size: 0.3, speedY: 0.5, spread: 0.3 };
        }
    }

    /**
     * Toggle ground summoning rune circle
     */
    setGroundRune(enabled) {
        this.groundRuneEnabled = enabled;
        this.clearGroundRune();

        if (!enabled || !this.enabled) return;

        const geom = new THREE.PlaneGeometry(3.6, 3.6, 1, 1);
        geom.rotateX(-Math.PI / 2);

        const tex = this.getGroundRuneTexture();
        const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: 0.9,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = 0.02; // Just above ground grid
        mesh.name = "Summoning_Rune_Circle";
        this.fxRootGroup.add(mesh);
        this.groundRuneMesh = mesh;
    }

    /**
     * Generate procedural glowing soft spark circle texture
     */
    getParticleSparkTexture() {
        if (this._proceduralTextures.spark) return this._proceduralTextures.spark;

        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fill();

        const tex = new THREE.CanvasTexture(canvas);
        this._proceduralTextures.spark = tex;
        return tex;
    }

    /**
     * Generate mystic Knight Online style glowing summoning rune texture
     */
    getGroundRuneTexture() {
        if (this._proceduralTextures.rune) return this._proceduralTextures.rune;

        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 512, 512);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = 12;

        const cx = 256, cy = 256;

        // Outer concentric rings
        ctx.beginPath();
        ctx.arc(cx, cy, 230, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.arc(cx, cy, 215, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.arc(cx, cy, 180, 0, Math.PI * 2);
        ctx.stroke();

        // 8-Point Runic Star
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const x1 = cx + Math.cos(angle) * 180;
            const y1 = cy + Math.sin(angle) * 180;
            const x2 = cx + Math.cos(angle + Math.PI) * 180;
            const y2 = cy + Math.sin(angle + Math.PI) * 180;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // Inner rune symbols (decorative ticks)
        for (let j = 0; j < 32; j++) {
            const a = (j * Math.PI * 2) / 32;
            const rIn = (j % 2 === 0) ? 195 : 205;
            const rOut = 215;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn);
            ctx.lineTo(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut);
            ctx.stroke();
        }

        // Center magical seal
        ctx.beginPath();
        ctx.arc(cx, cy, 60, 0, Math.PI * 2);
        ctx.stroke();

        const tex = new THREE.CanvasTexture(canvas);
        this._proceduralTextures.rune = tex;
        return tex;
    }

    /**
     * Master update tick invoked every frame at 60 FPS
     * @param {number} delta - Frame delta time in seconds
     * @param {Object} skeletonData - Current active skeleton hierarchy from App3D
     * @param {THREE.Group} modelGroup - Model group in scene
     */
    update(delta, skeletonData, modelGroup) {
        if (!this.enabled) {
            this.fxRootGroup.visible = false;
            return;
        }
        this.fxRootGroup.visible = true;
        this.time += delta;

        // 1. Update Native FX attached to character bone joints
        if (this.nativeFXEnabled && skeletonData && skeletonData.flatJoints) {
            for (const plug of this.nativeFXPlugs) {
                const joint = skeletonData.flatJoints[plug.jointIndex];
                if (joint && joint.currentWorldMatrix) {
                    if (modelGroup) {
                        plug.group.matrix.multiplyMatrices(modelGroup.matrixWorld, joint.currentWorldMatrix);
                        plug.group.matrix.multiply(plug.localMatrix);
                    } else {
                        plug.group.matrix.multiplyMatrices(joint.currentWorldMatrix, plug.localMatrix);
                    }
                    plug.group.matrixWorldNeedsUpdate = true;
                } else if (modelGroup) {
                    modelGroup.getWorldPosition(plug.group.position);
                    plug.group.position.y += 1.0;
                }
                if (plug.animUpdaters) {
                    for (const fn of plug.animUpdaters) fn(this.time);
                }
            }
        }

        // 2. Update Procedural Particle Aura
        if (this.auraEmitter) {
            const positions = this.auraEmitter.mesh.geometry.attributes.position.array;
            const vels = this.auraEmitter.velocities;
            const count = vels.length;

            for (let i = 0; i < count; i++) {
                const v = vels[i];
                v.age += delta;

                positions[i * 3 + 0] += v.vx * delta;
                positions[i * 3 + 1] += v.vy * delta;
                positions[i * 3 + 2] += v.vz * delta;

                // Recycle particle upon max life
                if (v.age >= v.maxLife || positions[i * 3 + 1] > 2.2) {
                    const theta = Math.random() * Math.PI * 2;
                    const r = 0.15 + Math.random() * 0.6;
                    positions[i * 3 + 0] = Math.cos(theta) * r;
                    positions[i * 3 + 1] = 0.1 + Math.random() * 0.3;
                    positions[i * 3 + 2] = Math.sin(theta) * r;
                    v.age = 0;
                }
            }
            this.auraEmitter.mesh.geometry.attributes.position.needsUpdate = true;
        }

        // 3. Update Ground Rune Rotation
        if (this.groundRuneMesh) {
            this.groundRuneMesh.rotation.y = this.time * 0.35;
            const breath = 0.75 + Math.sin(this.time * 2) * 0.2;
            this.groundRuneMesh.material.opacity = breath;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FXSystem };
}
