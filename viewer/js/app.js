/**
 * Knight Online 3D Character & Monster Editor / Viewer Application
 */

const POPULAR_PRESETS = [
    { name: "Worm", file: "Worm.n3chr", category: "Monster" },
    { name: "Bandicoot", file: "Bandicot.n3chr", category: "Monster" },
    { name: "Centaur", file: "Centaur.n3chr", category: "Monster" },
    { name: "Ape", file: "Ape.n3chr", category: "Monster" },
    { name: "Harpy", file: "Harpy.n3chr", category: "Monster" },
    { name: "Stone Golem", file: "Stone Golem.n3chr", category: "Monster" },
    { name: "Troll", file: "Troll.n3chr", category: "Monster" },
    { name: "Lamia", file: "Lamia.n3chr", category: "Monster" },
    { name: "Werewolf", file: "Werewolf.n3chr", category: "Monster" },
    { name: "Scorpion", file: "Scorpion.n3chr", category: "Monster" },
    { name: "Treant", file: "Treant.n3chr", category: "Monster" },
    { name: "Atross", file: "Atross.n3chr", category: "Boss" },
    { name: "Balrog", file: "Balrog.n3chr", category: "Boss" },
    { name: "Felankor", file: "Felankor.n3chr", category: "Boss" },
    { name: "Isiloon", file: "Isiloon.n3chr", category: "Boss" },
    { name: "Ultima", file: "Ultima.n3chr", category: "Boss" },
    { name: "Krowaz", file: "Krowaz.n3chr", category: "Boss" },
    { name: "Bone Dragon", file: "Bone Dragon.n3chr", category: "Boss" },
    { name: "Azagai", file: "Azagai.n3chr", category: "Weapon / Item" },
    { name: "Adaga", file: "Adaga.n3chr", category: "Weapon / Item" },
    { name: "Buju", file: "Buju.n3chr", category: "Weapon / Item" },
    { name: "Dark Knight", file: "Dark Knight.n3chr", category: "Monster" },
    { name: "Commander Barbar", file: "Commander_Human_Barbar.n3chr", category: "NPC / Character" },
    { name: "Commander Karus", file: "Commander_Karus_Warrior.n3chr", category: "NPC / Character" }
];

const CHRSELECT_ANIMATIONS = [
    "choice_upc_kurian.n3anim",
    "el_rf_wa_select.n3anim",
    "upc_el_ba.n3anim",
    "upc_el_ba_bone.n3anim",
    "upc_el_ba_wa.n3anim",
    "upc_el_rf.n3anim",
    "upc_el_rf_bone_rog.n3anim",
    "upc_el_rf_pri.n3anim",
    "upc_el_rf_rog.n3anim",
    "upc_el_rf_rog0120.n3anim",
    "upc_el_rf_wa.n3anim",
    "upc_el_rm.n3anim",
    "upc_el_rm_bone.n3anim",
    "upc_el_rm_bone_war.n3anim",
    "upc_el_rm_pri.n3anim",
    "upc_el_rm_rog.n3anim",
    "upc_el_rm_wa.n3anim",
    "upc_ka_at.n3anim",
    "upc_ka_at_wa.n3anim",
    "upc_ka_ba_bone.n3anim",
    "upc_ka_pu.n3anim",
    "upc_ka_rog_bone.n3anim",
    "upc_ka_tu.n3anim",
    "upc_ka_tu_pri.n3anim",
    "upc_ka_tu_rog.n3anim",
    "upc_ka_wt.n3anim",
    "upc_ka_wt_ma.n3anim",
    "upc_ka_wt_ma_ 109.n3anim",
    "upc_ka_wt_ma_ 69 BASE.n3anim",
    "upc_ka_wt_ma_ ATLANTIS.n3anim",
    "upc_ka_wt_ma_ League.n3anim",
    "upc_ka_wt_ma_ Legendary.n3anim",
    "upc_ka_wt_ma_ MYKOTEST.n3anim",
    "upc_ka_wt_ma_ NEW SERVER.n3anim",
    "upc_ka_wt_ma_ PVP.n3anim",
    "upc_ka_wt_ma_ SERVER .n3anim",
    "upc_ka_wt_ma_ TEST.n3anim",
    "upc_ka_wt_ma_ACHERON.n3anim",
    "upc_ka_wt_ma_AGARTHA.n3anim",
    "upc_ka_wt_ma_ARES1.n3anim",
    "upc_ka_wt_ma_ATHENA.n3anim",
    "upc_ka_wt_ma_CALYPSO.n3anim",
    "upc_ka_wt_ma_CARNAC.n3anim",
    "upc_ka_wt_ma_CRIUS.n3anim",
    "upc_ka_wt_ma_CTB.n3anim",
    "upc_ka_wt_ma_DRAGON.n3anim",
    "upc_ka_wt_ma_Fetih 1.n3anim",
    "upc_ka_wt_ma_KoFilozof.n3anim",
    "upc_ka_wt_ma_Legandary.n3anim",
    "upc_ka_wt_ma_Myko.n3anim",
    "upc_ka_wt_ma_PARADISE.n3anim",
    "upc_ka_wt_ma_Piana1.n3anim",
    "upc_ka_wt_ma_ROHAN.n3anim",
    "upc_ka_wt_ma_Server .n3anim",
    "upc_ka_wt_ma_SULTANWAR.n3anim",
    "upc_ka_wt_ma_Test Server.n3anim",
    "upc_ka_wt_ma_Test.n3anim",
    "upc_ka_wt_ma_WorldOfKingdom.n3anim"
];

class App3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModelGroup = null;
        this.currentModelData = null;
        this.partsMeshes = [];
        this.displayMode = 'textured'; // textured, wireframe, normal, clay
        this.baseUrl = '/models/';
        this.allModels = [];
        this.currentCategory = 'All';
        this.isGrounded = true;
        this.baseGroundOffsetY = 0;
        this.isTurntable = false;
        this.isAnimPlaying = false;
        this.activeAnimTrack = null;
        this.currentAnimTime = 0;
        this.clock = new THREE.Clock();

        // Knight Online Skeletal Animation System
        this.skeletonData = null;
        this.skinDeformers = [];
        this.plugAttachments = [];
        this.fxSystem = null;

        // Weapon Equipper & Texture Swapper State
        this.equippedWeapons = { right: null, left: null };
        this.currentEquipSlot = 'right';
        this.weaponOrientation = {
            right: { rotX: -Math.PI / 2, rotY: 0, rotZ: 0 },
            left: { rotX: -Math.PI / 2, rotY: Math.PI, rotZ: 0 }
        };
        this.activeSwapperMesh = null;
        this._toastTimeout = null;

        // Background Scene State (ChrSelect Thrones, Caves & Custom Studio)
        this.currentBackgroundGroup = null;
        this.currentBackgroundType = 'auto'; // 'auto', 'el_chairs', 'ka_chairs', 'ka_cave', 'custom', 'none'
        this.backgroundMeshes = [];
        this.backgroundTransform = { x: 0, y: 0, z: 0, rotY: 0, scale: 1 };
        this.backgroundLights = [];
        this.isBackgroundLoading = false;
        this.characterSeatedOffsetY = 0;
        this.objectsCatalog = [];
        this.selectedBackgroundObject = null;
        this.selectionBoxHelper = null;
        this.uploadedFilesMap = new Map();
        this.currentObjBrowserCategory = 'All';
        this.currentObjBrowserSearch = '';

        // Pre-allocated vectors & quaternions for 60fps skeletal math
        this._tempPos = new THREE.Vector3();
        this._tempRot = new THREE.Quaternion();
        this._tempOrient = new THREE.Quaternion();
        this._tempCombinedRot = new THREE.Quaternion();
        this._tempScale = new THREE.Vector3();
        this._tempLocalMtx = new THREE.Matrix4();
        this._tempQ1 = new THREE.Quaternion();
        this._tempQ2 = new THREE.Quaternion();

        this.initThree();
        this.initUI();
        this.loadCatalogData();
        this.loadObjectsCatalog();
    }

    initThree() {
        const container = document.getElementById('viewport-container');
        const canvas = document.getElementById('canvas3d');

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e17);
        this.scene.fog = new THREE.FogExp2(0x0a0e17, 0.025);

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 2.2, 5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Color Management for rich textures
        if (THREE.ColorManagement) {
            THREE.ColorManagement.enabled = true;
        }
        if (THREE.SRGBColorSpace) {
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        } else if (THREE.sRGBEncoding) {
            this.renderer.outputEncoding = THREE.sRGBEncoding;
        }

        // OrbitControls
        this.controls = new THREE.OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
        this.controls.minDistance = 0.5;
        this.controls.maxDistance = 150;
        this.controls.target.set(0, 1, 0);

        // Balanced Lighting for retro Direct3D textures
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        this.scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xfffbeb, 0.75);
        keyLight.position.set(6, 14, 8);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        this.scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xe2e8f0, 0.35);
        fillLight.position.set(-8, 6, 6);
        this.scene.add(fillLight);

        const backRimLight = new THREE.DirectionalLight(0x64748b, 0.3);
        backRimLight.position.set(0, 8, -10);
        this.scene.add(backRimLight);

        // Ground Grid
        this.grid = new THREE.GridHelper(24, 24, 0x06b6d4, 0x1e293b);
        this.grid.position.y = 0;
        this.scene.add(this.grid);

        // Ground Shadow Receiver Plane
        const shadowGeo = new THREE.PlaneGeometry(30, 30);
        const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
        const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -0.005;
        shadowPlane.receiveShadow = true;
        this.scene.add(shadowPlane);

        // Resize Listener
        window.addEventListener('resize', () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });

        // Initialize Visual Effects (FX) & Particle System
        this.fxSystem = new FXSystem(this.scene, this.baseUrl);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            const rawDelta = this.clock.getDelta();
            const delta = Math.min(0.05, Math.max(0.001, rawDelta));

            // Turntable rotation
            if (this.isTurntable && this.currentModelGroup) {
                this.currentModelGroup.rotation.y += delta * 0.5;
            }

            // Animation playback update
            this.updateAnimationPlayback(delta);

            // Update Visual Effects & Particle Auras
            if (this.fxSystem) {
                this.fxSystem.update(delta, this.skeletonData, this.currentModelGroup);
            }

            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    initSkeletonBindPose() {
        if (!this.skeletonData || !this.skeletonData.flatJoints) return;
        const joints = this.skeletonData.flatJoints;

        for (let i = 0; i < joints.length; i++) {
            const j = joints[i];
            j.currentWorldMatrix = new THREE.Matrix4();
            j.skinMatrix = new THREE.Matrix4();
            j.bindWorldMatrix = new THREE.Matrix4();
            j.invBindMatrix = new THREE.Matrix4();

            // Use Frame 0 keyframes as authentic Bind Pose if available (Knight Online CN3Skin rigging convention)
            const bPos = (j.keyPos && j.keyPos.count > 0 && j.keyPos.data)
                ? [j.keyPos.data[0], j.keyPos.data[1], j.keyPos.data[2]]
                : j.pos;
            const bRot = (j.keyRot && j.keyRot.count > 0 && j.keyRot.data)
                ? [j.keyRot.data[0], j.keyRot.data[1], j.keyRot.data[2], j.keyRot.data[3]]
                : j.rot;
            const bScale = (j.keyScale && j.keyScale.count > 0 && j.keyScale.data)
                ? [j.keyScale.data[0], j.keyScale.data[1], j.keyScale.data[2]]
                : (j.scale || [1, 1, 1]);

            j.bindPos = bPos;
            j.bindRot = bRot;
            j.bindScale = bScale;

            j.baseQuaternion = new THREE.Quaternion(bRot[0], bRot[1], bRot[2], bRot[3]);

            const vPos = new THREE.Vector3(bPos[0], bPos[1], bPos[2]);
            const qRot = j.baseQuaternion;
            const vScale = new THREE.Vector3(bScale[0] || 1, bScale[1] || 1, bScale[2] || 1);

            const localMtx = new THREE.Matrix4();
            localMtx.compose(vPos, qRot, vScale);

            if (j.parent && j.parent.bindWorldMatrix) {
                j.bindWorldMatrix.multiplyMatrices(j.parent.bindWorldMatrix, localMtx);
            } else {
                j.bindWorldMatrix.copy(localMtx);
            }

            j.invBindMatrix.copy(j.bindWorldMatrix).invert();
            j.currentWorldMatrix.copy(j.bindWorldMatrix);
        }
    }

    sampleKeyVector3(key, frame, fallbackArr, outVec) {
        if (!key || key.count <= 0 || !key.data) {
            if (fallbackArr) {
                outVec.set(fallbackArr[0] || 0, fallbackArr[1] || 0, fallbackArr[2] || 0);
            } else {
                outVec.set(0, 0, 0);
            }
            return outVec;
        }
        const count = key.count;
        const clampedFrame = Math.max(0, Math.min(count - 1, frame));
        const nIndex = Math.floor(clampedFrame);
        const fDelta = clampedFrame - nIndex;

        if (nIndex >= count - 1 || fDelta <= 0.0001) {
            const idx = nIndex * 3;
            outVec.set(key.data[idx], key.data[idx + 1], key.data[idx + 2]);
            return outVec;
        }

        const i1 = nIndex * 3;
        const i2 = (nIndex + 1) * 3;
        const w1 = 1.0 - fDelta;
        const w2 = fDelta;
        outVec.set(
            key.data[i1 + 0] * w1 + key.data[i2 + 0] * w2,
            key.data[i1 + 1] * w1 + key.data[i2 + 1] * w2,
            key.data[i1 + 2] * w1 + key.data[i2 + 2] * w2
        );
        return outVec;
    }

    sampleKeyQuaternion(key, frame, fallbackArr, outQ) {
        if (!key || key.count <= 0 || !key.data) {
            if (fallbackArr) {
                outQ.set(fallbackArr[0], fallbackArr[1], fallbackArr[2], fallbackArr[3]);
            } else {
                outQ.identity();
            }
            return outQ;
        }
        const count = key.count;
        const clampedFrame = Math.max(0, Math.min(count - 1, frame));
        const nIndex = Math.floor(clampedFrame);
        const fDelta = clampedFrame - nIndex;

        if (nIndex >= count - 1 || fDelta <= 0.0001) {
            const idx = nIndex * 4;
            outQ.set(key.data[idx], key.data[idx + 1], key.data[idx + 2], key.data[idx + 3]);
            return outQ;
        }

        const i1 = nIndex * 4;
        const i2 = (nIndex + 1) * 4;
        this._tempQ1.set(key.data[i1 + 0], key.data[i1 + 1], key.data[i1 + 2], key.data[i1 + 3]);
        this._tempQ2.set(key.data[i2 + 0], key.data[i2 + 1], key.data[i2 + 2], key.data[i2 + 3]);

        // Take shortest arc on quaternion sphere to guarantee smooth rotation without 360-flip artifacts
        if (this._tempQ1.dot(this._tempQ2) < 0) {
            this._tempQ2.set(-this._tempQ2.x, -this._tempQ2.y, -this._tempQ2.z, -this._tempQ2.w);
        }

        outQ.copy(this._tempQ1).slerp(this._tempQ2, fDelta);
        outQ.normalize();
        return outQ;
    }

    evaluateSkeleton(frame) {
        if (!this.skeletonData || !this.skeletonData.flatJoints) return;
        const joints = this.skeletonData.flatJoints;

        for (let i = 0; i < joints.length; i++) {
            const j = joints[i];

            // Translation (zero GC allocation)
            this.sampleKeyVector3(j.keyPos, frame, j.bindPos || j.pos, this._tempPos);

            // Rotation
            this.sampleKeyQuaternion(j.keyRot, frame, j.bindRot || j.rot, this._tempCombinedRot);

            // Orient
            if (j.keyOrient && j.keyOrient.count > 0) {
                this.sampleKeyQuaternion(j.keyOrient, frame, null, this._tempOrient);
                this._tempCombinedRot.multiply(this._tempOrient);
            }

            // Scale (zero GC allocation)
            this.sampleKeyVector3(j.keyScale, frame, j.bindScale || j.scale, this._tempScale);

            // Compose local transform
            this._tempLocalMtx.compose(this._tempPos, this._tempCombinedRot, this._tempScale);

            // Compute World Matrix (m_pParent ? m_pParent * local : local)
            if (j.parent && j.parent.currentWorldMatrix) {
                j.currentWorldMatrix.multiplyMatrices(j.parent.currentWorldMatrix, this._tempLocalMtx);
            } else {
                j.currentWorldMatrix.copy(this._tempLocalMtx);
            }

            // Skin matrix for vertex deformation: World * InvBind
            j.skinMatrix.multiplyMatrices(j.currentWorldMatrix, j.invBindMatrix);
        }
    }

    applySkinDeformation() {
        if (!this.skeletonData || !this.skeletonData.flatJoints) return;
        const flatJoints = this.skeletonData.flatJoints;

        for (let d = 0; d < this.skinDeformers.length; d++) {
            const def = this.skinDeformers[d];
            const rawCount = def.rawVertexCount;
            const skinVerts = def.skinVertices;
            const deformedRaw = def.deformedRaw;

            for (let v = 0; v < rawCount; v++) {
                const sv = skinVerts[v];
                const n = sv.nAffect;
                if (n === 0) {
                    deformedRaw[v * 3 + 0] = sv.vOrigin[0];
                    deformedRaw[v * 3 + 1] = sv.vOrigin[1];
                    deformedRaw[v * 3 + 2] = sv.vOrigin[2];
                    continue;
                }

                const ox = sv.vOrigin[0], oy = sv.vOrigin[1], oz = sv.vOrigin[2];
                let fx = 0, fy = 0, fz = 0;

                for (let k = 0; k < n; k++) {
                    const jIdx = sv.joints[k];
                    const w = sv.weights[k];
                    if (jIdx >= 0 && jIdx < flatJoints.length) {
                        const m = flatJoints[jIdx].skinMatrix.elements;
                        // Three.js column-major order:
                        // x' = m[0]*x + m[4]*y + m[8]*z + m[12]
                        // y' = m[1]*x + m[5]*y + m[9]*z + m[13]
                        // z' = m[2]*x + m[6]*y + m[10]*z + m[14]
                        const vx = m[0] * ox + m[4] * oy + m[8] * oz + m[12];
                        const vy = m[1] * ox + m[5] * oy + m[9] * oz + m[13];
                        const vz = m[2] * ox + m[6] * oy + m[10] * oz + m[14];

                        fx += vx * w;
                        fy += vy * w;
                        fz += vz * w;
                    }
                }

                deformedRaw[v * 3 + 0] = fx;
                deformedRaw[v * 3 + 1] = fy;
                deformedRaw[v * 3 + 2] = fz;
            }

            // Unroll into triangle positions
            const totalIndices = def.vtxIndices.length;
            const pos = def.positionsArray;
            const vtxIdx = def.vtxIndices;

            for (let i = 0; i < totalIndices; i++) {
                const vIdx = vtxIdx[i];
                pos[i * 3 + 0] = deformedRaw[vIdx * 3 + 0];
                pos[i * 3 + 1] = deformedRaw[vIdx * 3 + 1];
                pos[i * 3 + 2] = deformedRaw[vIdx * 3 + 2];
            }

            def.posAttr.needsUpdate = true;
            // Compute normals smoothly on every frame so lighting doesn't stutter or step
            def.mesh.geometry.computeVertexNormals();
        }
    }

    applyPlugTransforms() {
        if (!this.skeletonData || !this.skeletonData.flatJoints) return;
        const flatJoints = this.skeletonData.flatJoints;

        for (let p = 0; p < this.plugAttachments.length; p++) {
            const att = this.plugAttachments[p];
            const joint = flatJoints[att.jointIndex];
            if (joint) {
                att.mesh.matrix.multiplyMatrices(joint.currentWorldMatrix, att.localMatrix);
                att.mesh.matrixWorldNeedsUpdate = true;
            }
        }
    }

    detectKinematicAnimationTracks(skeletonData, maxFrames, isUpc) {
        if (isUpc || maxFrames > 800) {
            return [
                { name: "Idle / Normal", startFrame: 0, endFrame: 27, fps: 30 },
                { name: "Walk", startFrame: 27, endFrame: 45, fps: 30 },
                { name: "Run", startFrame: 46, endFrame: 58, fps: 30 },
                { name: "Attack 1 (Punch)", startFrame: 65, endFrame: 88, fps: 30 },
                { name: "Attack 2 (Strike)", startFrame: 88, endFrame: 115, fps: 30 },
                { name: "Death (Collapse)", startFrame: 115, endFrame: 165, fps: 30 },
                { name: "Stand Up / Revive", startFrame: 165, endFrame: 195, fps: 30 },
                { name: "Sit Down", startFrame: 255, endFrame: 295, fps: 30 },
                { name: "Cheer / Emote", startFrame: 300, endFrame: 340, fps: 30 }
            ];
        }

        if (!skeletonData || !skeletonData.flatJoints || skeletonData.flatJoints.length === 0 || maxFrames < 15) {
            const f1 = Math.min(25, Math.round(maxFrames * 0.25));
            const f2 = Math.min(50, Math.round(maxFrames * 0.5));
            const f3 = Math.min(80, Math.round(maxFrames * 0.75));
            return [
                { name: "Idle / Normal", startFrame: 0, endFrame: f1, fps: 30 },
                { name: "Walk", startFrame: f1, endFrame: f2, fps: 30 },
                { name: "Attack 1", startFrame: f2, endFrame: f3, fps: 30 },
                { name: "Death", startFrame: f3, endFrame: maxFrames, fps: 30 }
            ];
        }

        const joints = skeletonData.flatJoints;
        const legJoints = joints.filter(j => /knee|ankle|shin|calf|foot|feet|leg|hip/i.test(j.name) && !/^hip$|^hips$/i.test(j.name));
        const armJoints = joints.filter(j => /shoulder|soulder|elbow|wrist|hand|arm|claw|twig|wing/i.test(j.name));
        const rootJoint = joints[0];

        // Sample frame energies in 10-frame buckets
        const bucketSize = Math.max(6, Math.min(15, Math.round(maxFrames / 16)));
        const buckets = [];

        for (let b = 0; b < maxFrames; b += bucketSize) {
            const bEnd = Math.min(maxFrames, b + bucketSize);
            let legE = 0, armE = 0, totalE = 0;
            let minY = 9999, maxY = -9999;
            let minZ = 9999, maxZ = -9999;
            const count = Math.max(1, bEnd - b);

            for (let f = b; f < bEnd; f++) {
                if (rootJoint && rootJoint.keyPos && rootJoint.keyPos.data) {
                    const y = rootJoint.keyPos.data[f * 3 + 1];
                    const z = rootJoint.keyPos.data[f * 3 + 2];
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                    if (z < minZ) minZ = z;
                    if (z > maxZ) maxZ = z;
                }
                if (f > 0) {
                    for (let lj of legJoints) {
                        if (lj.keyRot && lj.keyRot.data) {
                            legE += Math.abs(lj.keyRot.data[f * 4] - lj.keyRot.data[(f - 1) * 4]) +
                                    Math.abs(lj.keyRot.data[f * 4 + 1] - lj.keyRot.data[(f - 1) * 4 + 1]) +
                                    Math.abs(lj.keyRot.data[f * 4 + 2] - lj.keyRot.data[(f - 1) * 4 + 2]);
                        }
                    }
                    for (let aj of armJoints) {
                        if (aj.keyRot && aj.keyRot.data) {
                            armE += Math.abs(aj.keyRot.data[f * 4] - aj.keyRot.data[(f - 1) * 4]) +
                                    Math.abs(aj.keyRot.data[f * 4 + 1] - aj.keyRot.data[(f - 1) * 4 + 1]) +
                                    Math.abs(aj.keyRot.data[f * 4 + 2] - aj.keyRot.data[(f - 1) * 4 + 2]);
                        }
                    }
                    for (let j of joints) {
                        if (j.keyRot && j.keyRot.data) {
                            totalE += Math.abs(j.keyRot.data[f * 4] - j.keyRot.data[(f - 1) * 4]) +
                                      Math.abs(j.keyRot.data[f * 4 + 1] - j.keyRot.data[(f - 1) * 4 + 1]) +
                                      Math.abs(j.keyRot.data[f * 4 + 2] - j.keyRot.data[(f - 1) * 4 + 2]);
                        }
                    }
                }
            }

            buckets.push({
                start: b,
                end: bEnd,
                legE: legE / count,
                armE: armE / count,
                totalE: totalE / count,
                minY: minY === 9999 ? 0 : minY,
                maxY: maxY === -9999 ? 0 : maxY,
                minZ: minZ === 9999 ? 0 : minZ,
                maxZ: maxZ === -9999 ? 0 : maxZ
            });
        }

        // 1. Death: Lowest root Y height
        let deathBucket = buckets.reduce((lowest, b) => b.minY < lowest.minY ? b : lowest, buckets[0]);

        // 2. Damage / Flinch: Sharp backward recoil (Z < -0.15)
        const damageBucket = buckets.find(b => b !== deathBucket && b.minZ < -0.18);

        // 3. Idle: Lowest total energy (excluding death and damage regions)
        const nonDeathBuckets = buckets.filter(b => b !== deathBucket && b !== damageBucket && Math.abs(b.start - deathBucket.start) > bucketSize * 2);
        let idleBucket = (nonDeathBuckets.length > 0 ? nonDeathBuckets : buckets)
            .reduce((calmest, b) => b.totalE < calmest.totalE ? b : calmest, buckets[0]);

        // 4. Walk & Run: Highest leg energy
        const sortedByLeg = [...nonDeathBuckets].sort((a, b) => b.legE - a.legE);
        let runBucket = sortedByLeg[0] || buckets[1] || buckets[0];
        let walkBucket = sortedByLeg[1] || buckets[0];

        // 5. Attack 1 & 2: Forward strike motion (Z must not recoil backward)
        const forwardAttacks = nonDeathBuckets
            .filter(b => b !== runBucket && b !== walkBucket && b !== idleBucket && b.minZ >= -0.12)
            .sort((a, b) => (b.armE + b.totalE) - (a.armE + a.totalE));
        let atk1Bucket = forwardAttacks[0] || buckets[Math.min(2, buckets.length - 1)];
        let atk2Bucket = forwardAttacks[1] || buckets[Math.min(3, buckets.length - 1)];

        const clips = [];
        clips.push({ name: "Idle / Normal", startFrame: idleBucket.start, endFrame: Math.min(maxFrames, idleBucket.start + 30), fps: 30 });
        if (walkBucket && walkBucket !== idleBucket) {
            clips.push({ name: "Walk", startFrame: walkBucket.start, endFrame: Math.min(maxFrames, walkBucket.start + 35), fps: 30 });
        }
        if (runBucket && runBucket !== walkBucket) {
            clips.push({ name: "Run", startFrame: runBucket.start, endFrame: Math.min(maxFrames, runBucket.start + 30), fps: 30 });
        }
        if (atk1Bucket) {
            clips.push({ name: "Attack 1 (Strike Forward)", startFrame: atk1Bucket.start, endFrame: Math.min(maxFrames, atk1Bucket.start + 35), fps: 30 });
        }
        if (atk2Bucket && atk2Bucket !== atk1Bucket) {
            clips.push({ name: "Attack 2", startFrame: atk2Bucket.start, endFrame: Math.min(maxFrames, atk2Bucket.start + 35), fps: 30 });
        }
        if (damageBucket) {
            clips.push({ name: "Damage (Recoil Backward)", startFrame: damageBucket.start, endFrame: Math.min(maxFrames, damageBucket.start + 30), fps: 30 });
        }
        if (deathBucket && deathBucket.minY < (idleBucket.minY * 0.7)) {
            clips.push({ name: "Death", startFrame: deathBucket.start, endFrame: Math.min(maxFrames, deathBucket.start + 45), fps: 30 });
        }

        return clips.length > 0 ? clips : [
            { name: "Idle / Normal", startFrame: 0, endFrame: Math.min(30, maxFrames), fps: 30 },
            { name: "Action", startFrame: Math.min(30, maxFrames), endFrame: maxFrames, fps: 30 }
        ];
    }

    updateAnimationPlayback(delta) {
        if (!this.activeAnimTrack || !this.isAnimPlaying) return;

        const tr = this.activeAnimTrack;
        const totalFrames = Math.max(1, tr.endFrame - tr.startFrame);
        const duration = totalFrames / (tr.fps || 30);

        this.currentAnimTime += delta;
        if (this.currentAnimTime >= duration) {
            this.currentAnimTime = this.currentAnimTime % duration;
        }

        const progress = duration > 0 ? this.currentAnimTime / duration : 0;
        const currentFrame = tr.startFrame + (progress * totalFrames);

        // Update progress bar
        const progressBar = document.getElementById('anim-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${(progress * 100).toFixed(1)}%`;
        }
        const frameInfo = document.getElementById('player-frame-info');
        if (frameInfo) {
            frameInfo.textContent = `${Math.round(currentFrame)} / ${tr.endFrame}f`;
        }

        // Real Knight Online Skeletal Joint Animation & Skin Deformation
        if (this.skeletonData) {
            this.evaluateSkeleton(currentFrame);
            this.applySkinDeformation();
            this.applyPlugTransforms();
        } else if (this.currentModelGroup) {
            // Subtle fallback breath if model has no skeleton file
            const breath = Math.sin(this.currentAnimTime * (Math.PI * 2 / Math.max(1, duration))) * 0.012;
            this.currentModelGroup.scale.set(1.0 + breath * 0.5, 1.0 + breath, 1.0 + breath * 0.5);
        }
    }

    initUI() {
        // Turntable Toggle
        const turntableBtn = document.getElementById('btn-turntable');
        if (turntableBtn) {
            turntableBtn.addEventListener('click', () => {
                this.isTurntable = !this.isTurntable;
                turntableBtn.classList.toggle('active', this.isTurntable);
                turntableBtn.style.color = this.isTurntable ? 'var(--accent-cyan)' : '';
            });
        }

        // Ground Toggle
        const groundBtn = document.getElementById('btn-ground');
        if (groundBtn) {
            groundBtn.addEventListener('click', () => {
                this.isGrounded = !this.isGrounded;
                groundBtn.classList.toggle('active', this.isGrounded);
                this.applyGrounding();
            });
        }

        // Floor Grid Toggle
        const btnGrid = document.getElementById('btn-grid');
        if (btnGrid) {
            btnGrid.addEventListener('click', () => {
                if (!this.grid) return;
                this.grid.visible = !this.grid.visible;
                btnGrid.classList.toggle('active', this.grid.visible);
            });
        }

        // Reload Button
        document.getElementById('btn-reload').addEventListener('click', () => {
            location.reload();
        });

        // F5 shortcut - allow standard browser page reload
        window.addEventListener('keydown', (e) => {
            if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
                // allow default browser refresh
            }
        });

        // Zoom In / Zoom Out Controls
        const btnZoomIn = document.getElementById('btn-zoom-in');
        if (btnZoomIn) {
            btnZoomIn.addEventListener('click', () => {
                this.zoomCamera(-1);
            });
        }
        const btnZoomOut = document.getElementById('btn-zoom-out');
        if (btnZoomOut) {
            btnZoomOut.addEventListener('click', () => {
                this.zoomCamera(1);
            });
        }

        // Reset Camera
        document.getElementById('btn-reset-cam').addEventListener('click', () => {
            this.fitCameraToModel();
        });

        // Import 3D / Shape Button
        const importBtn = document.getElementById('btn-import-3d');
        const importInput = document.getElementById('import-3d-input');
        if (importBtn && importInput) {
            importBtn.addEventListener('click', () => importInput.click());
            importInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    const f = e.target.files[0];
                    const lower = f.name.toLowerCase();
                    if (lower.endsWith('.n3shape')) {
                        this.loadShapeFromFile(f);
                    } else if (lower.endsWith('.n3chr')) {
                        this.loadFromFile(f);
                    } else {
                        this.import3DModel(f);
                    }
                }
            });
        }

        // Texture Modal Close Handlers
        const texModal = document.getElementById('texture-modal');
        const closeTexBtn = document.getElementById('btn-close-tex-modal');
        if (closeTexBtn && texModal) {
            closeTexBtn.addEventListener('click', () => {
                texModal.style.display = 'none';
            });
            texModal.addEventListener('click', (e) => {
                if (e.target === texModal) {
                    texModal.style.display = 'none';
                }
            });
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && texModal.style.display === 'flex') {
                    texModal.style.display = 'none';
                }
            });
        }

        // Texture Swapper Reset All
        const btnResetAllTex = document.getElementById('btn-reset-all-textures');
        if (btnResetAllTex) {
            btnResetAllTex.addEventListener('click', () => {
                this.resetAllTextures();
            });
        }

        // Texture Swapper File Input
        const swapperInput = document.getElementById('swapper-file-input');
        if (swapperInput) {
            swapperInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0 && this.activeSwapperMesh) {
                    this.applyTextureSwap(this.activeSwapperMesh, e.target.files[0]);
                }
            });
        }

        // Play / Pause Animation button
        const playPauseBtn = document.getElementById('btn-play-pause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.isAnimPlaying = !this.isAnimPlaying;
                playPauseBtn.textContent = this.isAnimPlaying ? '⏸ Pause' : '▶ Play';
            });
        }

        // Clip Range Editor Controls
        const btnPreviewRange = document.getElementById('btn-preview-range');
        if (btnPreviewRange) {
            btnPreviewRange.addEventListener('click', () => {
                const s = parseInt(document.getElementById('input-range-start').value, 10) || 0;
                const e = parseInt(document.getElementById('input-range-end').value, 10) || 30;
                this.playFrameRange(s, e, `Test Range (${s}-${e})`);
            });
        }

        const btnAddCustomClip = document.getElementById('btn-add-custom-clip');
        if (btnAddCustomClip) {
            btnAddCustomClip.addEventListener('click', () => {
                const s = parseInt(document.getElementById('input-range-start').value, 10) || 0;
                const e = parseInt(document.getElementById('input-range-end').value, 10) || 30;
                const clipName = prompt('Enter new animation clip name:', `Custom Clip (${s}-${e})`);
                if (clipName) {
                    this.addCustomAnimClip(clipName, s, e);
                }
            });
        }

        // ChrSelect Animations Dropdown & Apply Button
        const chrAnimSelect = document.getElementById('chrselect-anim-dropdown');
        if (chrAnimSelect && typeof CHRSELECT_ANIMATIONS !== 'undefined') {
            let opts = '<option value="">-- Select ChrSelect Animation (.n3anim) --</option>';
            for (const animFile of CHRSELECT_ANIMATIONS) {
                opts += `<option value="${animFile}">${animFile}</option>`;
            }
            chrAnimSelect.innerHTML = opts;
        }

        const btnApplyChrAnim = document.getElementById('btn-apply-chrselect-anim');
        if (btnApplyChrAnim && chrAnimSelect) {
            btnApplyChrAnim.addEventListener('click', () => {
                const animVal = chrAnimSelect.value;
                if (!animVal) {
                    alert('Please select a ChrSelect animation file first!');
                    return;
                }
                this.loadChrSelectAnim(animVal);
            });
        }

        // Background Scene Switcher Dropdowns (Header & Right Panel)
        const bgSelect = document.getElementById('bg-scene-select');
        const bgPanelSelect = document.getElementById('bg-panel-scene-select');

        const handleBgChange = async (val) => {
            this.currentBackgroundType = val;
            if (bgSelect) bgSelect.value = val;
            if (bgPanelSelect) bgPanelSelect.value = val;
            this.showLoading('Loading Background Scene...');
            try {
                await this.loadBackgroundScene(val);
            } finally {
                this.hideLoading();
            }
        };

        if (bgSelect) {
            bgSelect.addEventListener('change', (e) => handleBgChange(e.target.value));
        }
        if (bgPanelSelect) {
            bgPanelSelect.addEventListener('change', (e) => handleBgChange(e.target.value));
        }

        // Sit on Chair alignment button
        const btnBgSitAlign = document.getElementById('btn-bg-sit-align');
        if (btnBgSitAlign) {
            btnBgSitAlign.addEventListener('click', () => this.alignCharacterToChair());
        }

        // Reset Background Position button
        const btnBgResetPos = document.getElementById('btn-bg-reset-pos');
        if (btnBgResetPos) {
            btnBgResetPos.addEventListener('click', () => this.resetBackgroundTransform());
        }

        // Nudge Character Position
        const btnNudgeDown = document.getElementById('btn-bg-nudge-down');
        if (btnNudgeDown) {
            btnNudgeDown.addEventListener('click', () => {
                this.characterSeatedOffsetY = (this.characterSeatedOffsetY || 0) - 0.08;
                this.applyGrounding();
                this.showToast(`⬇️ Character seated height: ${this.characterSeatedOffsetY.toFixed(2)}m`);
            });
        }
        const btnNudgeUp = document.getElementById('btn-bg-nudge-up');
        if (btnNudgeUp) {
            btnNudgeUp.addEventListener('click', () => {
                this.characterSeatedOffsetY = (this.characterSeatedOffsetY || 0) + 0.08;
                this.applyGrounding();
                this.showToast(`⬆️ Character seated height: ${this.characterSeatedOffsetY.toFixed(2)}m`);
            });
        }

        // Toggle All Background Objects
        const btnToggleAllBg = document.getElementById('btn-toggle-all-bg');
        if (btnToggleAllBg) {
            btnToggleAllBg.addEventListener('click', () => this.toggleAllBackgroundObjects());
        }

        // Background Studio: Add Object File button
        const btnBgAddFile = document.getElementById('btn-bg-add-file');
        const bgFileInput = document.getElementById('bg-import-file-input');
        if (btnBgAddFile && bgFileInput) {
            btnBgAddFile.addEventListener('click', () => {
                bgFileInput.value = '';
                bgFileInput.click();
            });
            bgFileInput.addEventListener('change', (e) => {
                this.handleBackgroundFileUpload(e.target.files);
            });
        }

        // Background Studio: Browse Library button
        const btnBgBrowseLib = document.getElementById('btn-bg-browse-lib');
        if (btnBgBrowseLib) {
            btnBgBrowseLib.addEventListener('click', () => this.openObjectBrowserModal());
        }
        const btnCloseObjModal = document.getElementById('btn-close-obj-modal');
        if (btnCloseObjModal) {
            btnCloseObjModal.addEventListener('click', () => this.closeObjectBrowserModal());
        }
        const objModalOverlay = document.getElementById('object-browser-modal');
        if (objModalOverlay) {
            objModalOverlay.addEventListener('click', (e) => {
                if (e.target === objModalOverlay) this.closeObjectBrowserModal();
            });
        }

        // Object Browser: Search and Category Tabs
        const objSearch = document.getElementById('obj-browser-search');
        if (objSearch) {
            objSearch.addEventListener('input', (e) => {
                this.currentObjBrowserSearch = e.target.value;
                this.renderObjectBrowserGrid();
            });
        }
        const catTabs = document.querySelectorAll('#obj-browser-cat-tabs .cat-tab');
        catTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                catTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentObjBrowserCategory = tab.dataset.cat;
                this.renderObjectBrowserGrid();
            });
        });

        // Background Studio: Save, Load, Clear buttons
        const btnBgSave = document.getElementById('btn-bg-save-scene');
        if (btnBgSave) {
            btnBgSave.addEventListener('click', () => this.saveCustomBackgroundScene());
        }
        const btnBgLoad = document.getElementById('btn-bg-load-scene');
        if (btnBgLoad) {
            btnBgLoad.addEventListener('click', () => this.loadCustomBackgroundScene());
        }
        const btnBgClear = document.getElementById('btn-bg-clear-scene');
        if (btnBgClear) {
            btnBgClear.addEventListener('click', () => this.clearBackgroundScene(true));
        }

        // Selected Object Transform Inspector Sliders
        const setupObjSlider = (sliderId, valSpanId, prop, isAngle = false, isScale = false) => {
            const slider = document.getElementById(sliderId);
            const valSpan = document.getElementById(valSpanId);
            if (!slider) return;
            slider.addEventListener('input', (e) => {
                if (!this.selectedBackgroundObject) return;
                const val = parseFloat(e.target.value);
                if (isAngle) {
                    this.selectedBackgroundObject.rotation.y = (val * Math.PI) / 180;
                    if (valSpan) valSpan.textContent = `${val.toFixed(0)}°`;
                } else if (isScale) {
                    this.selectedBackgroundObject.scale.set(val, val, val);
                    if (valSpan) valSpan.textContent = `${val.toFixed(2)}x`;
                } else {
                    this.selectedBackgroundObject.position[prop] = val;
                    if (valSpan) valSpan.textContent = val >= 0 ? `+${val.toFixed(2)}` : val.toFixed(2);
                }
                if (this.selectionBoxHelper) {
                    this.selectionBoxHelper.update();
                }
            });
        };

        setupObjSlider('slider-bg-obj-x', 'val-bg-obj-x', 'x');
        setupObjSlider('slider-bg-obj-y', 'val-bg-obj-y', 'y');
        setupObjSlider('slider-bg-obj-z', 'val-bg-obj-z', 'z');
        setupObjSlider('slider-bg-obj-rot-y', 'val-bg-obj-rot-y', 'rotY', true);
        setupObjSlider('slider-bg-obj-scale', 'val-bg-obj-scale', 'scale', false, true);

        // Quick Rotation Buttons
        document.querySelectorAll('.btn-quick-rot').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.selectedBackgroundObject) return;
                const rot = parseFloat(btn.dataset.rot || 0);
                this.selectedBackgroundObject.rotation.y = (rot * Math.PI) / 180;
                const sl = document.getElementById('slider-bg-obj-rot-y');
                if (sl) sl.value = rot;
                const sp = document.getElementById('val-bg-obj-rot-y');
                if (sp) sp.textContent = `${rot.toFixed(0)}°`;
                if (this.selectionBoxHelper) this.selectionBoxHelper.update();
            });
        });

        // Duplicate, Focus, and Remove buttons
        const btnObjDuplicate = document.getElementById('btn-bg-obj-duplicate');
        if (btnObjDuplicate) {
            btnObjDuplicate.addEventListener('click', () => this.duplicateSelectedBackgroundObject());
        }
        const btnObjFocus = document.getElementById('btn-bg-obj-focus');
        if (btnObjFocus) {
            btnObjFocus.addEventListener('click', () => this.focusSelectedBackgroundObject());
        }
        const btnObjRemove = document.getElementById('btn-bg-obj-remove');
        if (btnObjRemove) {
            btnObjRemove.addEventListener('click', () => this.removeSelectedBackgroundObject());
        }

        // Viewport click to select background objects
        let pointerDownPos = { x: 0, y: 0, time: 0 };
        const canvas = document.getElementById('canvas3d');
        if (canvas) {
            canvas.addEventListener('pointerdown', (e) => {
                pointerDownPos = { x: e.clientX, y: e.clientY, time: performance.now() };
            });
            canvas.addEventListener('pointerup', (e) => {
                const dx = Math.abs(e.clientX - pointerDownPos.x);
                const dy = Math.abs(e.clientY - pointerDownPos.y);
                const dt = performance.now() - pointerDownPos.time;
                if (dx < 5 && dy < 5 && dt < 400) {
                    this.handleViewportClick(e);
                }
            });
        }

        // Display Mode Switchers
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.displayMode = btn.dataset.mode;
                this.applyDisplayMode();
            });
        });

        // Category Tabs
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentCategory = tab.dataset.cat;
                this.filterCatalog();
            });
        });

        // Search Filter
        const searchInput = document.getElementById('search-monster');
        searchInput.addEventListener('input', () => {
            this.filterCatalog();
        });

        // Drag and Drop (handles .n3chr, .n3shape, and .obj)
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('file-input');

        dropZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const f = e.target.files[0];
                const lower = f.name.toLowerCase();
                if (lower.endsWith('.obj')) {
                    this.import3DModel(f);
                } else if (lower.endsWith('.n3shape')) {
                    this.loadShapeFromFile(f);
                } else {
                    this.loadFromFile(f);
                }
            }
        });

        ['dragenter', 'dragover'].forEach(name => {
            dropZone.addEventListener(name, (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(name => {
            dropZone.addEventListener(name, (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
            });
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
                const f = e.dataTransfer.files[0];
                const lower = f.name.toLowerCase();
                if (lower.endsWith('.obj')) {
                    this.import3DModel(f);
                } else if (lower.endsWith('.n3shape')) {
                    this.loadShapeFromFile(f);
                } else {
                    this.loadFromFile(f);
                }
            }
        });
    }

    showToast(msg, duration = 2500) {
        const toast = document.getElementById('editor-toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('active');
        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, duration);
    }

    playFrameRange(startFrame, endFrame, name = 'Custom Range') {
        const s = Math.max(0, Math.min(startFrame, endFrame));
        const e = Math.max(s + 1, Math.max(startFrame, endFrame));
        const track = {
            name: name,
            startFrame: s,
            endFrame: e,
            fps: 30
        };
        this.activeAnimTrack = track;
        this.currentAnimTime = 0;
        this.isAnimPlaying = true;

        if (this.skeletonData) {
            this.evaluateSkeleton(s);
            this.applySkinDeformation();
            this.applyPlugTransforms();
        }

        const playerCard = document.getElementById('anim-player-card');
        if (playerCard) {
            playerCard.style.display = 'flex';
            document.getElementById('player-track-name').textContent = track.name;
            document.getElementById('player-fps-badge').textContent = `${track.fps} FPS`;
            const playPauseBtn = document.getElementById('btn-play-pause');
            if (playPauseBtn) playPauseBtn.textContent = '⏸ Pause';
        }

        const isSitTrack = (track.name || '').toLowerCase().includes('sit') || (track.name || '').toLowerCase().includes('throne');
        const isChrSelectModel = this.currentModelData && ((this.currentModelData.category === 'ChrSelect') || (this.currentModelData.sourceFileName && this.currentModelData.sourceFileName.toLowerCase().includes('chrselect')));
        if (isChrSelectModel) {
            this.characterSeatedOffsetY = isSitTrack ? this.computeSeatedOffsetY() : 0;
            this.applyGrounding();
        }

        this.showToast(`Playing ${track.name} (${s} - ${e})`);
    }

    addCustomAnimClip(name, startFrame, endFrame) {
        const s = Math.max(0, Math.min(startFrame, endFrame));
        const e = Math.max(s + 1, Math.max(startFrame, endFrame));
        const tr = {
            name: name,
            startFrame: s,
            endFrame: e,
            fps: 30
        };

        const animsContainer = document.getElementById('anims-container');
        if (animsContainer) {
            const animItem = document.createElement('div');
            animItem.className = 'anim-item active';
            document.querySelectorAll('.anim-item').forEach(a => a.classList.remove('active'));
            const duration = ((e - s) / 30).toFixed(2);
            animItem.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 2px;">
                    <span style="font-weight: 700; color: #fff;">✨ ${tr.name}</span>
                    <span style="color: var(--text-sub); font-size: 11px;">Frames ${s} - ${e} (${duration}s)</span>
                </div>
                <span style="color: var(--accent-cyan); font-size: 11px; font-weight: 600; background: rgba(6, 182, 212, 0.1); padding: 3px 6px; border-radius: 4px;">30 fps</span>
            `;
            animItem.addEventListener('click', () => {
                document.querySelectorAll('.anim-item').forEach(a => a.classList.remove('active'));
                animItem.classList.add('active');
                this.activeAnimTrack = tr;
                this.currentAnimTime = 0;
                this.isAnimPlaying = true;
                if (this.skeletonData) {
                    this.evaluateSkeleton(s);
                    this.applySkinDeformation();
                    this.applyPlugTransforms();
                }
                const playerCard = document.getElementById('anim-player-card');
                if (playerCard) {
                    playerCard.style.display = 'flex';
                    document.getElementById('player-track-name').textContent = tr.name;
                    document.getElementById('player-fps-badge').textContent = `${tr.fps} FPS`;
                    const playPauseBtn = document.getElementById('btn-play-pause');
                    if (playPauseBtn) playPauseBtn.textContent = '⏸ Pause';
                }
            });
            animsContainer.appendChild(animItem);
        }

        this.playFrameRange(s, e, tr.name);
        this.showToast(`New clip "${name}" added!`);
    }

    async loadChrSelectAnim(animFileName) {
        this.showLoading(`Loading ChrSelect Anim: ${animFileName}...`);
        try {
            const animUrl = `${this.baseUrl}ChrSelect/${animFileName}`;
            const res = await fetch(animUrl);
            if (!res.ok) throw new Error(`Anim file not found: ${res.status}`);
            const buf = await res.arrayBuffer();
            const animData = N3AnimParser.parse(buf);

            // Add new custom clip
            const clipName = animFileName.replace(/\.n3anim$/i, '');
            this.addCustomAnimClip(`ChrSelect: ${clipName}`, 0, 200);
            this.showToast(`Animation ${animFileName} applied successfully!`);
        } catch (err) {
            console.error('Error loading ChrSelect anim:', err);
            alert(`Failed to load ${animFileName}: ` + err.message);
        } finally {
            this.hideLoading();
        }
    }

    updateEquippedOrientation() {
        const slot = this.currentEquipSlot;
        const rot = this.weaponOrientation[slot];
        const euler = new THREE.Euler(rot.rotX, rot.rotY, rot.rotZ, 'YXZ');
        const localMtx = new THREE.Matrix4().makeRotationFromEuler(euler);

        for (let i = 0; i < this.plugAttachments.length; i++) {
            const att = this.plugAttachments[i];
            if (att.equipSlot === slot) {
                att.localMatrix.copy(localMtx);
            }
        }
        this.applyPlugTransforms();
    }

    async loadCatalogData() {
        try {
            const resp = await fetch(`models_catalog.json?t=${Date.now()}`);
            if (resp.ok) {
                this.allModels = await resp.json();
            }
        } catch (e) {
            console.warn('Could not load models_catalog.json, using presets:', e);
        }

        if (!this.allModels || this.allModels.length === 0) {
            this.allModels = POPULAR_PRESETS;
        }

        document.getElementById('catalog-count').textContent = `${this.allModels.length.toLocaleString()} Models, Weapons & Armor`;

        // Update tab count badges if present
        const allTab = document.querySelector('.cat-tab[data-cat="All"]');
        if (allTab) allTab.textContent = `All (${this.allModels.length.toLocaleString()})`;
        const wepTab = document.querySelector('.cat-tab[data-cat="Weapon"]');
        if (wepTab) {
            const wepCount = this.allModels.filter(m => m.isPlug || (m.category && m.category.includes('Item /'))).length;
            wepTab.textContent = `Weapons (${wepCount})`;
        }
        const armTab = document.querySelector('.cat-tab[data-cat="Armor"]');
        if (armTab) {
            const armCount = this.allModels.filter(m => m.isArmor || (m.category && m.category.startsWith('Armor'))).length;
            armTab.textContent = `Armor (${armCount.toLocaleString()})`;
        }
        const chrTab = document.querySelector('.cat-tab[data-cat="ChrSelect"]');
        if (chrTab) {
            const chrCount = this.allModels.filter(m => m.category === 'ChrSelect' || (m.file && m.file.toLowerCase().includes('chrselect'))).length;
            chrTab.textContent = `ChrSelect (${chrCount})`;
        }

        this.filterCatalog();
        this.populateWeaponDropdown();
    }

    populateWeaponDropdown() {
        const select = document.getElementById('weapon-select');
        if (!select || !this.allModels) return;

        const daggers = [];
        const swords = [];
        const axes = [];
        const bows = [];
        const staffs = [];
        const shields = [];
        const otherItems = [];
        const chrWeapons = [];

        for (const m of this.allModels) {
            if (m.isPlug || (m.file && m.file.startsWith('Item/'))) {
                const cat = (m.category || '').toLowerCase();
                const name = (m.name || '').toLowerCase();
                if (cat.includes('dagger') || name.includes('dagger') || name.includes('knife') || name.includes('jamadar') || name.includes('shard')) {
                    daggers.push(m);
                } else if (cat.includes('sword') || name.includes('sword') || name.includes('blade') || name.includes('glave') || name.includes('mirage') || name.includes('raptor')) {
                    swords.push(m);
                } else if (cat.includes('axe') || cat.includes('spear') || name.includes('axe') || name.includes('spear') || name.includes('mace') || name.includes('club') || name.includes('hammer')) {
                    axes.push(m);
                } else if (cat.includes('bow') || name.includes('bow') || name.includes('crossbow')) {
                    bows.push(m);
                } else if (cat.includes('staff') || name.includes('staff') || name.includes('wand')) {
                    staffs.push(m);
                } else if (cat.includes('shield') || name.includes('shield') || name.includes('kalkan')) {
                    shields.push(m);
                } else {
                    otherItems.push(m);
                }
            } else if (m.category === 'Weapon / Item' && m.file && m.file.toLowerCase().endsWith('.n3chr')) {
                chrWeapons.push(m);
            }
        }

        let html = '<option value="">-- Select Weapon / Item --</option>';

        const appendGroup = (label, items) => {
            if (items.length === 0) return;
            html += `<optgroup label="${label}">`;
            for (const item of items) {
                html += `<option value="${item.file}">${item.name}</option>`;
            }
            html += `</optgroup>`;
        };

        appendGroup('⭐ Curated Character Weapons (.n3chr)', chrWeapons);
        appendGroup(`🗡️ Item Folder: Daggers (${daggers.length})`, daggers);
        appendGroup(`⚔️ Item Folder: Swords & Blades (${swords.length})`, swords);
        appendGroup(`🪓 Item Folder: Axes & Spears (${axes.length})`, axes);
        appendGroup(`🏹 Item Folder: Bows (${bows.length})`, bows);
        appendGroup(`🔮 Item Folder: Staves (${staffs.length})`, staffs);
        appendGroup(`🛡️ Item Folder: Shields (${shields.length})`, shields);
        appendGroup(`📦 Item Folder: Other Items (${otherItems.length})`, otherItems);

        select.innerHTML = html;
    }

    filterCatalog() {
        const query = (document.getElementById('search-monster').value || '').toLowerCase().trim();
        const listEl = document.getElementById('monster-list');
        listEl.innerHTML = '';

        let filtered = this.allModels;

        // Category filter
        if (this.currentCategory === 'ChrSelect') {
            filtered = filtered.filter(m => m.category === 'ChrSelect' || (m.file && m.file.toLowerCase().includes('chrselect')));
        } else if (this.currentCategory === 'Monster / Character' || this.currentCategory === 'Popular') {
            filtered = filtered.filter(m => (!m.isPlug && !m.isArmor && (!m.file || !m.file.startsWith('Item/'))) || m.category === 'Boss' || m.category === 'Monster' || m.category === 'NPC / Character');
        } else if (this.currentCategory === 'Weapon') {
            filtered = filtered.filter(m => m.isPlug || (m.category && m.category.includes('Item /')));
        } else if (this.currentCategory === 'Armor') {
            filtered = filtered.filter(m => m.isArmor || (m.category && m.category.startsWith('Armor')));
        } else if (this.currentCategory === 'Item') {
            filtered = filtered.filter(m => (m.file && m.file.startsWith('Item/')) || (m.category && (m.category.startsWith('Item') || m.category.startsWith('Armor'))) || m.isPlug || m.isArmor);
        } else if (this.currentCategory === 'Boss') {
            filtered = filtered.filter(m => m.category === 'Boss');
        } else if (this.currentCategory === 'Monster') {
            filtered = filtered.filter(m => m.category === 'Monster');
        } else if (this.currentCategory === 'NPC / Character') {
            filtered = filtered.filter(m => m.category === 'NPC / Character');
        } else if (this.currentCategory !== 'All') {
            filtered = filtered.filter(m => m.category === this.currentCategory);
        }

        // Search text query
        if (query) {
            filtered = filtered.filter(m => m.name.toLowerCase().includes(query) || (m.file && m.file.toLowerCase().includes(query)));
        }

        const displayList = filtered.slice(0, 200);

        displayList.forEach(m => {
            const item = document.createElement('div');
            const isActive = this.currentModelData && (this.currentModelData.sourceFileName === m.file);
            item.className = `monster-item ${isActive ? 'active' : ''}`;

            const isItem = m.isPlug || m.isArmor || (m.file && m.file.startsWith('Item/')) || (m.category && (m.category.startsWith('Item') || m.category.startsWith('Armor')));

            item.innerHTML = `
                <div class="monster-item-main">
                    <span class="monster-name">${m.name}</span>
                    <span class="monster-tag">${m.category}</span>
                </div>
            `;

            item.addEventListener('click', () => {
                document.querySelectorAll('.monster-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                if (isItem) {
                    this.loadStandaloneItem(m);
                } else if (m.isShape || (m.file && m.file.toLowerCase().endsWith('.n3shape'))) {
                    this.loadShapeModel(m);
                } else {
                    this.loadMonsterByFile(m.file);
                }
            });
            listEl.appendChild(item);
        });

        if (displayList.length === 0) {
            listEl.innerHTML = '<div style="padding: 12px; font-size: 12px; color: var(--text-sub); text-align: center;">No matching models or items found.</div>';
        }
    }

    resolveItemRelPath(rawPath) {
        if (!rawPath) return '';
        let p = rawPath.replace(/\\/g, '/').trim();
        p = p.replace(/^\/?item\//i, '');
        return `Item/${p}`;
    }

    async fetchBuffer(url) {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`Failed to load file (${resp.status} ${resp.statusText}): ${url}`);
        }
        return await resp.arrayBuffer();
    }

    async loadStandaloneItem(itemOrFile) {
        let m = typeof itemOrFile === 'string' ? { file: itemOrFile, name: itemOrFile } : itemOrFile;
        this.showLoading(`Loading Item ${m.name}...`);
        try {
            // Clean previous model state
            if (this.currentModelGroup) {
                this.scene.remove(this.currentModelGroup);
                this.currentModelGroup = null;
            }
            this.partsMeshes = [];
            this.skeletonData = null;
            this.skinDeformers = [];
            this.plugAttachments = [];
            this.equippedWeapons = { right: null, left: null };
            this.activeAnimTrack = null;

            const playerCard = document.getElementById('anim-player-card');
            if (playerCard) playerCard.style.display = 'none';
            const animsContainer = document.getElementById('anims-container');
            if (animsContainer) animsContainer.innerHTML = '<div style="font-size: 12px; color: var(--text-sub);">Item object (no skeletal animations)</div>';

            const filePath = this.resolveItemRelPath(m.file);
            const fileUrl = `${this.baseUrl}${filePath}`;
            const fileBuffer = await this.fetchBuffer(fileUrl);

            let meshFileName = '';
            let texFileName = '';
            const isArmor = filePath.toLowerCase().endsWith('.n3cpart');

            if (isArmor) {
                const partData = N3CPartParser.parse(fileBuffer);
                meshFileName = partData.skinPath || m.meshFile;
                texFileName = partData.texPath || m.texFile;
            } else {
                const plugData = N3CPlugParser.parse(fileBuffer);
                meshFileName = plugData.meshPath || m.meshFile;
                texFileName = plugData.texPath || m.texFile;
            }

            // Fallback from catalog
            if (!meshFileName && this.allModels) {
                const catItem = this.allModels.find(x => x.file === m.file || x.plugFile === m.file);
                if (catItem) {
                    meshFileName = catItem.meshFile;
                    texFileName = catItem.texFile;
                }
            }

            if (!meshFileName) {
                throw new Error(isArmor ? 'Armor part does not define a 3D skin.' : 'Plug does not define a 3D mesh.');
            }

            const meshPath = this.resolveItemRelPath(meshFileName);
            const meshBuffer = await this.fetchBuffer(`${this.baseUrl}${meshPath}`);

            let meshData = null;
            if (meshFileName.toLowerCase().endsWith('.n3pmesh')) {
                meshData = N3PMeshParser.parse(meshBuffer);
            } else {
                meshData = N3SkinParser.parse(meshBuffer);
            }

            if (!meshData || !meshData.positions) {
                throw new Error('Mesh geometry is empty or invalid.');
            }

            let texture = null;
            let hasAlpha = false;
            let itemDecodedDxt = null;
            let itemRawDxtBuffer = null;
            let itemTexUrl = null;
            if (texFileName) {
                try {
                    const texPath = this.resolveItemRelPath(texFileName);
                    itemTexUrl = `${this.baseUrl}${texPath}`;
                    itemRawDxtBuffer = await this.fetchBuffer(itemTexUrl);
                    itemDecodedDxt = DxtDecoder.decode(itemRawDxtBuffer);
                    texture = new THREE.CanvasTexture(itemDecodedDxt.canvas);
                    texture.flipY = false;
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.magFilter = THREE.LinearFilter;
                    texture.minFilter = THREE.LinearMipmapLinearFilter;
                    texture.generateMipmaps = true;
                    if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                    hasAlpha = itemDecodedDxt.hasAlpha;
                } catch (e) {
                    console.warn('Could not load item texture:', e);
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(meshData.positions, 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
            geometry.setAttribute('uv', new THREE.BufferAttribute(meshData.uvs, 2));
            if (!meshData.normals || meshData.normals.length === 0) {
                geometry.computeVertexNormals();
            }

            // Center geometry and lift above ground grid so nothing is cut off under the floor
            geometry.center();
            geometry.computeBoundingBox();
            const bBox = geometry.boundingBox;
            const minY = bBox ? bBox.min.y : 0;
            const height = bBox ? (bBox.max.y - bBox.min.y) : 2;

            // Authentic Direct3D shading (MeshLambertMaterial avoids harsh metallic/PBR specular glare)
            const matTextured = new THREE.MeshLambertMaterial({
                map: texture,
                color: texture ? 0xffffff : 0xd1d5db,
                transparent: hasAlpha,
                alphaTest: hasAlpha ? 0.2 : 0.0,
                depthWrite: true,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(geometry, matTextured);
            mesh.name = m.name;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.position.y = -minY + 0.1; // Grounded right above the floor grid!
            mesh.userData = {
                originalMaterial: matTextured,
                texPath: texFileName,
                partName: m.name,
                texFileName: texFileName || (`${m.name}.dxt`),
                rawDxtBuffer: itemRawDxtBuffer,
                texUrl: itemTexUrl,
                decodedDxt: itemDecodedDxt,
                currentCanvas: itemDecodedDxt ? itemDecodedDxt.canvas : null,
                isPlug: !isArmor
            };

            this.currentModelGroup = new THREE.Group();
            this.currentModelGroup.add(mesh);
            this.scene.add(this.currentModelGroup);
            this.partsMeshes.push(mesh);

            this.currentModelData = {
                name: m.name,
                sourceFileName: m.file,
                isPlug: true,
                isArmor,
                parts: [{ name: m.name, mesh }]
            };

            // Calculate bounding sphere and position camera nicely framed above ground
            geometry.computeBoundingSphere();
            const radius = (geometry.boundingSphere && geometry.boundingSphere.radius) ? geometry.boundingSphere.radius : 1.5;
            const centerTargetY = height * 0.5 + 0.1;
            this.controls.target.set(0, centerTargetY, 0);
            this.camera.position.set(0, centerTargetY + radius * 0.35, radius * 2.6);
            this.camera.lookAt(0, centerTargetY, 0);
            this.controls.update();

            // Update stats & HUD
            const vCount = (meshData.positions.length / 3) | 0;
            const fCount = (meshData.indices ? meshData.indices.length / 3 : vCount / 3) | 0;
            const statV = document.getElementById('stat-verts');
            if (statV) statV.textContent = vCount.toLocaleString();
            const statF = document.getElementById('stat-faces');
            if (statF) statF.textContent = fCount.toLocaleString();
            const statP = document.getElementById('stat-parts');
            if (statP) statP.textContent = '1';
            const statA = document.getElementById('stat-anims');
            if (statA) statA.textContent = '0';
            const hudName = document.getElementById('hud-model-name');
            if (hudName) hudName.textContent = m.name;
            const hudV = document.getElementById('hud-verts');
            if (hudV) hudV.textContent = vCount.toLocaleString();
            const hudF = document.getElementById('hud-faces');
            if (hudF) hudF.textContent = fCount.toLocaleString();

            this.updateInspectorUI(this.currentModelData, vCount, fCount, []);
            this.updateTextureSwapperUI();
            this.showToast(`Loading ${m.name} in 3D Viewport`);
        } catch (err) {
            console.error('Failed to load standalone item:', err);
            alert(`Failed to load item ${m.name}: ` + err.message);
        } finally {
            this.hideLoading();
        }
    }

    showLoading(text = 'Loading Model...') {
        const overlay = document.getElementById('loading-overlay');
        document.getElementById('loading-text').textContent = text;
        overlay.classList.add('active');
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.remove('active');
    }

    async loadMonsterByFile(filename) {
        if (filename.startsWith('Item/') || filename.toLowerCase().endsWith('.n3cplug') || filename.toLowerCase().endsWith('.n3cpart')) {
            return this.loadStandaloneItem(filename);
        }
        // Normalize any special characters if legacy string is passed
        let cleanName = filename
            .replace(/[üÜ]/g, 'u')
            .replace(/[ıİ]/g, 'i')
            .replace(/[çÇ]/g, 'c')
            .replace(/[şŞ]/g, 's')
            .replace(/[öÖ]/g, 'o')
            .replace(/[ğĞ]/g, 'g')
            .replace(/Ã¼/g, 'u')
            .replace(/Ãœ/g, 'u')
            .replace(/Ä±/g, 'i')
            .replace(/Ä°/g, 'i');

        this.showLoading(`Loading ${cleanName}...`);
        try {
            const isChrSelect = cleanName.toLowerCase().startsWith('chrselect/') || cleanName.toLowerCase().startsWith('chrselect\\');
            const chrUrl = isChrSelect ? `${this.baseUrl}${cleanName.replace(/\\/g, '/')}` : `${this.baseUrl}Chr/${cleanName}`;
            const chrResp = await fetch(chrUrl);
            if (!chrResp.ok) {
                throw new Error(`Model file not found on server (HTTP ${chrResp.status})`);
            }
            const chrBuffer = await chrResp.arrayBuffer();
            const chrData = N3ChrParser.parse(chrBuffer);
            chrData.sourceFileName = cleanName;

            await this.assembleAndDisplayModel(chrData);
        } catch (err) {
            console.error('Error loading monster:', err);
            alert(`Failed to load ${cleanName}: ` + err.message);
        } finally {
            this.hideLoading();
        }
    }

    async loadFromFile(file) {
        if (!file.name.toLowerCase().endsWith('.n3chr')) {
            alert('Please upload a Knight Online .n3chr file!');
            return;
        }

        this.showLoading(`Reading ${file.name}...`);
        try {
            const buffer = await file.arrayBuffer();
            const chrData = N3ChrParser.parse(buffer);
            chrData.sourceFileName = file.name;

            await this.assembleAndDisplayModel(chrData);
        } catch (err) {
            console.error('Error loading uploaded file:', err);
            alert(`Error parsing file: ` + err.message);
        } finally {
            this.hideLoading();
        }
    }

    async assembleAndDisplayModel(chrData) {
        this.currentModelData = chrData;

        // Clean previous model state
        if (this.currentModelGroup) {
            this.scene.remove(this.currentModelGroup);
            this.currentModelGroup = null;
        }
        this.partsMeshes = [];
        this.skeletonData = null;
        this.skinDeformers = [];
        this.plugAttachments = [];
        this.equippedWeapons = { right: null, left: null };

        const rLabel = document.getElementById('eq-right-name');
        if (rLabel) rLabel.textContent = 'None';
        const lLabel = document.getElementById('eq-left-name');
        if (lLabel) lLabel.textContent = 'None';
        const wBadge = document.getElementById('weapon-status-badge');
        if (wBadge) {
            wBadge.textContent = 'Slot Ready';
            wBadge.style.background = 'rgba(6, 182, 212, 0.15)';
            wBadge.style.color = 'var(--accent-cyan)';
        }

        this.currentModelGroup = new THREE.Group();
        this.currentModelGroup.name = chrData.name || chrData.sourceFileName;

        let totalVerts = 0;
        let totalFaces = 0;

        // Model classification tag (UPC vs Monster)
        const modelTag = `${chrData.sourceFileName || ''} ${chrData.name || ''} ${chrData.jointPath || ''}`.toLowerCase();
        this.isCurrentModelUpc =
            modelTag.includes('upc_') ||
            modelTag.includes('human_') ||
            modelTag.includes('karus_') ||
            modelTag.includes('barbar') ||
            modelTag.includes('cuce') ||
            modelTag.includes('c_ce') ||
            modelTag.includes('erkek') ||
            modelTag.includes('kadin') ||
            modelTag.includes('rogue') ||
            modelTag.includes('warrior') ||
            modelTag.includes('priest') ||
            modelTag.includes('mage') ||
            modelTag.includes('commander');

        // 1. Load Skeleton (.n3joint) FIRST
        if (chrData.jointPath) {
            try {
                let jPath = chrData.jointPath.replace(/\\/g, '/');
                // If Karus Tuarek Rogue uses obsolete upc_ka_tu.n3joint, prefer updated official upc_ka_tu_rog_up06.n3joint
                if (jPath.toLowerCase().includes('upc_ka_tu.n3joint') && modelTag.includes('rogue')) {
                    jPath = jPath.replace(/upc_ka_tu\.n3joint/i, 'upc_ka_tu_rog_up06.n3joint');
                }
                let jointRes = await fetch(`${this.baseUrl}${jPath}`);
                if (!jointRes.ok && jPath !== chrData.jointPath) {
                    jointRes = await fetch(`${this.baseUrl}${chrData.jointPath.replace(/\\/g, '/')}`);
                }
                const jointBuffer = await jointRes.arrayBuffer();
                this.skeletonData = N3JointParser.parse(jointBuffer);
                this.initSkeletonBindPose();
            } catch (jErr) {
                console.warn('Could not load joint file:', chrData.jointPath, jErr);
            }
        }

        // Auto-equip standard body parts for ChrSelect / UPC characters if parts list is empty
        if (!chrData.parts || chrData.parts.length === 0) {
            chrData.parts = [];
            let prefix = '';
            const lowerFile = (chrData.sourceFileName || chrData.name || '').toLowerCase();
            if (lowerFile.includes('upc_el_ba')) prefix = 'upc_el_ba';
            else if (lowerFile.includes('upc_el_rf')) prefix = 'upc_el_rf';
            else if (lowerFile.includes('upc_el_rm')) prefix = 'upc_el_rm';
            else if (lowerFile.includes('upc_ka_at')) prefix = 'upc_ka_at';
            else if (lowerFile.includes('upc_ka_tu')) prefix = 'upc_ka_tu';
            else if (lowerFile.includes('upc_ka_wt')) prefix = 'upc_ka_wt';

            if (prefix) {
                if (prefix === 'upc_ka_wt') {
                    chrData.parts = [
                        `Item/${prefix}_face00.n3cpart`,
                        `Item/${prefix}_hair00.n3cpart`,
                        `Item/${prefix}_upper.n3cpart`,
                        `Item/${prefix}_hands.n3cpart`,
                        `Item/${prefix}_feet.n3cpart`
                    ];
                } else {
                    chrData.parts = [
                        `Item/${prefix}_face00.n3cpart`,
                        `Item/${prefix}_hair00.n3cpart`,
                        `Item/${prefix}_upper.n3cpart`,
                        `Item/${prefix}_lower.n3cpart`,
                        `Item/${prefix}_hands.n3cpart`,
                        `Item/${prefix}_feet.n3cpart`
                    ];
                }
            }
        }

        // 2. Load Character Parts (.n3cpart)
        for (let i = 0; i < chrData.parts.length; i++) {
            const partRelPath = chrData.parts[i];
            try {
                const partUrl = `${this.baseUrl}${partRelPath.replace(/\\/g, '/')}`;
                const partBuffer = await (await fetch(partUrl)).arrayBuffer();
                const partData = N3CPartParser.parse(partBuffer);

                if (partData.skinPath) {
                    // Load skin mesh (.n3cskins)
                    const skinUrl = `${this.baseUrl}${partData.skinPath.replace(/\\/g, '/')}`;
                    const skinBuffer = await (await fetch(skinUrl)).arrayBuffer();
                    const skinData = N3SkinParser.parse(skinBuffer);

                    // Load texture (.dxt)
                    let texture = null;
                    let hasAlpha = false;
                    let rawPartDxtBuffer = null;
                    let decodedPartDxt = null;
                    let partTexUrl = null;
                    if (partData.texPath) {
                        try {
                            partTexUrl = `${this.baseUrl}${partData.texPath.replace(/\\/g, '/')}`;
                            rawPartDxtBuffer = await (await fetch(partTexUrl)).arrayBuffer();
                            decodedPartDxt = DxtDecoder.decode(rawPartDxtBuffer);
                            texture = new THREE.CanvasTexture(decodedPartDxt.canvas);
                            texture.flipY = false;
                            texture.wrapS = THREE.RepeatWrapping;
                            texture.wrapT = THREE.RepeatWrapping;
                            if (THREE.SRGBColorSpace) {
                                texture.colorSpace = THREE.SRGBColorSpace;
                            }
                            if (decodedPartDxt.hasAlpha) {
                                hasAlpha = true;
                            }
                        } catch (texErr) {
                            console.warn('Could not load texture:', partData.texPath, texErr);
                        }
                    }

                    // Build Three.js BufferGeometry with unrolled triangles for 100% UV precision
                    const geometry = new THREE.BufferGeometry();
                    geometry.setAttribute('position', new THREE.BufferAttribute(skinData.positions, 3));
                    geometry.setAttribute('normal', new THREE.BufferAttribute(skinData.normals, 3));
                    geometry.setAttribute('uv', new THREE.BufferAttribute(skinData.uvs, 2));
                    geometry.computeVertexNormals();

                    // Material matching retro Direct3D shading (MeshLambertMaterial avoids PBR glare)
                    const matTextured = new THREE.MeshLambertMaterial({
                        map: texture,
                        color: texture ? 0xffffff : 0xd1d5db,
                        transparent: hasAlpha,
                        alphaTest: hasAlpha ? 0.2 : 0.0,
                        depthWrite: true,
                        side: THREE.DoubleSide
                    });

                    const mesh = new THREE.Mesh(geometry, matTextured);
                    mesh.name = partData.name || `Part_${i + 1}`;
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    mesh.userData = {
                        originalMaterial: matTextured,
                        partData,
                        skinData,
                        partName: mesh.name,
                        texFileName: partData.texPath ? partData.texPath.split(/[\/\\]/).pop() : `${mesh.name}.dxt`,
                        rawDxtBuffer: rawPartDxtBuffer,
                        texUrl: partTexUrl,
                        decodedDxt: decodedPartDxt,
                        currentCanvas: decodedPartDxt ? decodedPartDxt.canvas : null,
                        isPlug: false
                    };

                    this.currentModelGroup.add(mesh);
                    this.partsMeshes.push(mesh);

                    // Register skin deformer for real-time skeletal animation
                    if (skinData.skinVertices && skinData.skinVertices.length === skinData.rawVertexCount) {
                        this.skinDeformers.push({
                            mesh,
                            rawVertexCount: skinData.rawVertexCount,
                            skinVertices: skinData.skinVertices,
                            vtxIndices: skinData.vtxIndices,
                            deformedRaw: new Float32Array(skinData.rawVertexCount * 3),
                            positionsArray: geometry.attributes.position.array,
                            posAttr: geometry.attributes.position
                        });
                    }

                    totalVerts += (skinData.rawVertexCount || Math.floor(skinData.positions.length / 3));
                    totalFaces += skinData.triangleCount || Math.floor(skinData.positions.length / 9);
                }
            } catch (pErr) {
                console.warn(`Failed loading part ${partRelPath}:`, pErr);
            }
        }

        // 3. Load Plugs (.n3cplug) - Weapons, Shields, Bows
        for (let i = 0; i < (chrData.plugs || []).length; i++) {
            const plugRelPath = chrData.plugs[i];
            try {
                const plugUrl = `${this.baseUrl}${plugRelPath}`;
                const plugBuffer = await (await fetch(plugUrl)).arrayBuffer();
                const plugData = N3CPlugParser.parse(plugBuffer);

                if (plugData.meshPath) {
                    const meshUrl = `${this.baseUrl}${plugData.meshPath}`;
                    const meshBuffer = await (await fetch(meshUrl)).arrayBuffer();

                    let plugMeshData = null;
                    if (plugData.meshPath.toLowerCase().endsWith('.n3pmesh')) {
                        plugMeshData = N3PMeshParser.parse(meshBuffer);
                    } else if (plugData.meshPath.toLowerCase().endsWith('.n3cskins')) {
                        plugMeshData = N3SkinParser.parse(meshBuffer);
                    }

                    if (plugMeshData) {
                        let texture = null;
                        let hasAlpha = false;
                        let rawPlugDxtBuffer = null;
                        let decodedPlugDxt = null;
                        let plugTexUrl = null;
                        if (plugData.texPath) {
                            try {
                                plugTexUrl = `${this.baseUrl}${plugData.texPath}`;
                                rawPlugDxtBuffer = await (await fetch(plugTexUrl)).arrayBuffer();
                                decodedPlugDxt = DxtDecoder.decode(rawPlugDxtBuffer);
                                texture = new THREE.CanvasTexture(decodedPlugDxt.canvas);
                                texture.flipY = false;
                                texture.wrapS = THREE.RepeatWrapping;
                                texture.wrapT = THREE.RepeatWrapping;
                                if (THREE.SRGBColorSpace) {
                                    texture.colorSpace = THREE.SRGBColorSpace;
                                }
                                if (decodedPlugDxt.hasAlpha) {
                                    hasAlpha = true;
                                }
                            } catch (e) {
                                console.warn('Could not load plug texture:', plugData.texPath);
                            }
                        }

                        const geometry = new THREE.BufferGeometry();
                        geometry.setAttribute('position', new THREE.BufferAttribute(plugMeshData.positions, 3));
                        geometry.setAttribute('normal', new THREE.BufferAttribute(plugMeshData.normals, 3));
                        geometry.setAttribute('uv', new THREE.BufferAttribute(plugMeshData.uvs, 2));
                        if (!plugMeshData.normals || plugMeshData.normals.length === 0) {
                            geometry.computeVertexNormals();
                        }

                        const matTextured = new THREE.MeshLambertMaterial({
                            map: texture,
                            color: texture ? 0xffffff : 0xd1d5db,
                            transparent: hasAlpha,
                            alphaTest: hasAlpha ? 0.2 : 0.0,
                            depthWrite: true,
                            side: THREE.DoubleSide
                        });

                        const plugMesh = new THREE.Mesh(geometry, matTextured);
                        const cleanPlugName = plugRelPath.split('/').pop().replace(/\.n3cplug$/i, '');
                        plugMesh.name = `Weapon (${cleanPlugName})`;
                        plugMesh.castShadow = true;
                        plugMesh.receiveShadow = true;

                        // Calculate Plug Local Matrix relative to bone
                        const plugLocalMtx = new THREE.Matrix4();
                        if (plugData.mtxRot && plugData.mtxRot.length === 16) {
                            const m = plugData.mtxRot;
                            plugLocalMtx.set(
                                m[0], m[1], m[2], 0,
                                m[4], m[5], m[6], 0,
                                m[8], m[9], m[10], 0,
                                0, 0, 0, 1
                            );
                        }
                        const sc = plugData.scale || { x: 1, y: 1, z: 1 };
                        const ps = plugData.position || { x: 0, y: 0, z: 0 };
                        plugLocalMtx.scale(new THREE.Vector3(sc.x || 1, sc.y || 1, sc.z || 1));
                        plugLocalMtx.setPosition((ps.x || 0) * (sc.x || 1), (ps.y || 0) * (sc.y || 1), (ps.z || 0) * (sc.z || 1));

                        plugMesh.matrixAutoUpdate = false;
                        plugMesh.matrix.copy(plugLocalMtx);

                        plugMesh.userData = {
                            originalMaterial: matTextured,
                            plugData,
                            plugMeshData,
                            partName: plugMesh.name,
                            texFileName: plugData.texPath ? plugData.texPath.split(/[\/\\]/).pop() : `${cleanPlugName}.dxt`,
                            rawDxtBuffer: rawPlugDxtBuffer,
                            texUrl: plugTexUrl,
                            decodedDxt: decodedPlugDxt,
                            currentCanvas: decodedPlugDxt ? decodedPlugDxt.canvas : null,
                            isPlug: true
                        };

                        this.currentModelGroup.add(plugMesh);
                        this.partsMeshes.push(plugMesh);

                        // Attach to parent joint
                        if (plugData.jointIndex >= 0) {
                            this.plugAttachments.push({
                                mesh: plugMesh,
                                jointIndex: plugData.jointIndex,
                                localMatrix: plugLocalMtx
                            });
                        }

                        totalVerts += (plugMeshData.rawVertexCount || Math.floor(plugMeshData.positions.length / 3));
                        totalFaces += plugMeshData.triangleCount || Math.floor(plugMeshData.positions.length / 9);
                    }
                }
            } catch (plErr) {
                console.warn(`Failed loading plug ${plugRelPath}:`, plErr);
            }
        }

        // Add model to scene
        this.scene.add(this.currentModelGroup);

        // 4. Load Animations (.n3anim) & Skeletons (.n3joint)
        let rawTracks = [];
        if (chrData.animPath) {
            try {
                const animUrl = `${this.baseUrl}${chrData.animPath}`;
                const animBuffer = await (await fetch(animUrl)).arrayBuffer();
                const animData = N3AnimParser.parse(animBuffer);
                rawTracks = animData.tracks || [];
            } catch (aErr) {
                console.warn('Could not load animation file:', chrData.animPath, aErr);
            }
        }

        // Determine real max keyframe length from skeletal joints (.n3joint)
        let maxSkeletonFrames = 0;
        if (this.skeletonData && this.skeletonData.flatJoints) {
            for (const j of this.skeletonData.flatJoints) {
                if (j.keyPos && j.keyPos.count > maxSkeletonFrames) maxSkeletonFrames = j.keyPos.count;
                if (j.keyRot && j.keyRot.count > maxSkeletonFrames) maxSkeletonFrames = j.keyRot.count;
                if (j.keyScale && j.keyScale.count > maxSkeletonFrames) maxSkeletonFrames = j.keyScale.count;
                if (j.keyOrient && j.keyOrient.count > maxSkeletonFrames) maxSkeletonFrames = j.keyOrient.count;
            }
        }
        if (maxSkeletonFrames <= 0) maxSkeletonFrames = 150;

        // Build authentic Knight Online animation track list
        let animTracks = [];

        // Always provide Master Sequence track
        animTracks.push({
            name: "🎬 Full Sequence",
            startFrame: 0,
            endFrame: maxSkeletonFrames,
            fps: 30
        });

        // Check model name, source file, and joint path for authentic verified keyframe boundaries
        const isUpc = this.isCurrentModelUpc || maxSkeletonFrames > 800;
        this.isCurrentModelUpc = isUpc;
        if (this.skeletonData && isUpc) {
            this.skeletonData.isRelativeKeyframes = true;
        }

        let presetTracks = null;
        const isChrSelect = modelTag.includes('chrselect') || (chrData.sourceFileName && chrData.sourceFileName.toLowerCase().includes('chrselect'));

        if (isChrSelect) {
            // Canonical Knight Online ChrSelect Character Animations
            // Frames 10 to 50 is the static resting throne sitting loop
            presetTracks = [
                { name: "Throne / Sit (Idle)", startFrame: 10, endFrame: 50, fps: 30 },
                { name: "Stand Up", startFrame: 50, endFrame: 110, fps: 30 },
                { name: "Walk Forward", startFrame: 110, endFrame: 180, fps: 30 },
                { name: "Class Stance Pose", startFrame: 180, endFrame: Math.min(200, maxSkeletonFrames), fps: 30 }
            ];
        } else if (isUpc) {
            // Canonical Player Character (UPC) animations from Knight Online NoahSystem
            // Frame 0 is T-Pose / Rest Bind Pose; Frames 1-26 is the seamless breathing idle loop
            presetTracks = [
                { name: "Idle / Normal", startFrame: 1, endFrame: 26, fps: 30 },
                { name: "Walk", startFrame: 27, endFrame: 45, fps: 30 },
                { name: "Run", startFrame: 46, endFrame: 58, fps: 30 },
                { name: "Attack 1 (Punch Forward)", startFrame: 65, endFrame: 88, fps: 30 },
                { name: "Attack 2 (Strike)", startFrame: 88, endFrame: 115, fps: 30 },
                { name: "Death (Collapse)", startFrame: 115, endFrame: 165, fps: 30 },
                { name: "Stand Up / Revive", startFrame: 165, endFrame: 195, fps: 30 },
                { name: "Sit Down", startFrame: 255, endFrame: 295, fps: 30 },
                { name: "Cheer / Emote", startFrame: 300, endFrame: 340, fps: 30 }
            ];
        } else if (modelTag.includes('golem')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 350, endFrame: Math.min(397, maxSkeletonFrames), fps: 30 },
                { name: "Walk", startFrame: 0, endFrame: 35, fps: 30 },
                { name: "Run", startFrame: 35, endFrame: 65, fps: 30 },
                { name: "Attack 1 (Stomp Forward)", startFrame: 65, endFrame: 90, fps: 30 },
                { name: "Attack 2 (Smash)", startFrame: 105, endFrame: 160, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 235, endFrame: 300, fps: 30 },
                { name: "Death", startFrame: 200, endFrame: 235, fps: 30 },
                { name: "Skill / Roar", startFrame: 310, endFrame: 350, fps: 30 }
            ];
        } else if (modelTag.includes('kwife') || modelTag.includes('gelin') || modelTag.includes('wife')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 50, endFrame: 72, fps: 30 },
                { name: "Walk", startFrame: 0, endFrame: 25, fps: 30 },
                { name: "Run", startFrame: 25, endFrame: 50, fps: 30 },
                { name: "Attack 1 (Spell Forward)", startFrame: 75, endFrame: 100, fps: 30 },
                { name: "Attack 2 (Cast)", startFrame: 115, endFrame: 155, fps: 30 },
                { name: "Death", startFrame: 160, endFrame: 190, fps: 30 },
                { name: "Damage (Recoil)", startFrame: 200, endFrame: 225, fps: 30 },
                { name: "Cheer / Emote", startFrame: 230, endFrame: Math.min(254, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('tree') || modelTag.includes('ancient') || modelTag.includes('treant')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 20, fps: 30 },
                { name: "Walk", startFrame: 140, endFrame: 175, fps: 30 },
                { name: "Run", startFrame: 175, endFrame: 215, fps: 30 },
                { name: "Attack 1 (Strike Forward)", startFrame: 20, endFrame: 45, fps: 30 },
                { name: "Attack 2", startFrame: 45, endFrame: 70, fps: 30 },
                { name: "Death", startFrame: 70, endFrame: 105, fps: 30 },
                { name: "Damage (Recoil)", startFrame: 105, endFrame: 140, fps: 30 },
                { name: "Roar / Standby", startFrame: 215, endFrame: Math.min(250, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('worm')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 110, endFrame: 140, fps: 30 },
                { name: "Walk", startFrame: 0, endFrame: 35, fps: 30 },
                { name: "Run", startFrame: 70, endFrame: 100, fps: 30 },
                { name: "Attack 1 (Strike Forward)", startFrame: 35, endFrame: 50, fps: 30 },
                { name: "Attack 2 (Tail Whip)", startFrame: 140, endFrame: 165, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 50, endFrame: 70, fps: 30 },
                { name: "Death", startFrame: 165, endFrame: Math.min(200, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('skeleton') || modelTag.includes('zombie')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 80, endFrame: 96, fps: 30 },
                { name: "Walk", startFrame: 0, endFrame: 45, fps: 30 },
                { name: "Run", startFrame: 45, endFrame: 80, fps: 30 },
                { name: "Attack 1 (Slash Forward)", startFrame: 96, endFrame: 144, fps: 30 },
                { name: "Attack 2 (Heavy Strike)", startFrame: 176, endFrame: 208, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 208, endFrame: 256, fps: 30 },
                { name: "Death", startFrame: 256, endFrame: Math.min(320, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('wolf') || modelTag.includes('werewolf') || modelTag.includes('lycan')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 182, endFrame: 220, fps: 30 },
                { name: "Walk", startFrame: 65, endFrame: 104, fps: 30 },
                { name: "Run", startFrame: 0, endFrame: 39, fps: 30 },
                { name: "Attack 1 (Bite Forward)", startFrame: 117, endFrame: 156, fps: 30 },
                { name: "Attack 2 (Claw Swipe)", startFrame: 221, endFrame: 260, fps: 30 },
                { name: "Death", startFrame: 156, endFrame: Math.min(182, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('centaur')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 40, endFrame: 50, fps: 30 },
                { name: "Walk", startFrame: 50, endFrame: 90, fps: 30 },
                { name: "Run", startFrame: 0, endFrame: 35, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 90, endFrame: 130, fps: 30 },
                { name: "Attack 1 (Slash Forward)", startFrame: 130, endFrame: 160, fps: 30 },
                { name: "Attack 2 (Double Strike)", startFrame: 35, endFrame: 50, fps: 30 },
                { name: "Death", startFrame: 160, endFrame: Math.min(190, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('bandicoot') || modelTag.includes('bandicot') || modelTag.includes('kecoon') || modelTag.includes('bulcan')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 35, fps: 30 },
                { name: "Attack 1 (Punch Forward)", startFrame: 35, endFrame: 70, fps: 30 },
                { name: "Walk", startFrame: 70, endFrame: 105, fps: 30 },
                { name: "Run", startFrame: 70, endFrame: 105, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 105, endFrame: 140, fps: 30 },
                { name: "Attack 2 (Spin / Jump)", startFrame: 140, endFrame: 165, fps: 30 },
                { name: "Death", startFrame: 165, endFrame: Math.min(200, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('trol') || modelTag.includes('troll')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 45, fps: 30 },
                { name: "Walk", startFrame: 45, endFrame: 90, fps: 30 },
                { name: "Run", startFrame: 90, endFrame: 135, fps: 30 },
                { name: "Attack 1 (Punch Forward)", startFrame: 135, endFrame: 180, fps: 30 },
                { name: "Attack 2 (Club Smash)", startFrame: 180, endFrame: 240, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 240, endFrame: 280, fps: 30 },
                { name: "Death", startFrame: 280, endFrame: 350, fps: 30 },
                { name: "Skill / Roar", startFrame: 350, endFrame: Math.min(435, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('twohead') || modelTag.includes('ape')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 40, fps: 30 },
                { name: "Walk", startFrame: 40, endFrame: 80, fps: 30 },
                { name: "Run", startFrame: 80, endFrame: 120, fps: 30 },
                { name: "Attack 1 (Smash Forward)", startFrame: 120, endFrame: 165, fps: 30 },
                { name: "Attack 2", startFrame: 165, endFrame: 210, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 210, endFrame: 250, fps: 30 },
                { name: "Death", startFrame: 250, endFrame: 310, fps: 30 },
                { name: "Skill / Roar", startFrame: 310, endFrame: Math.min(350, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('harppy') || modelTag.includes('harpy')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 20, fps: 30 },
                { name: "Walk / Glide", startFrame: 20, endFrame: 45, fps: 30 },
                { name: "Run / Flap", startFrame: 45, endFrame: 65, fps: 30 },
                { name: "Attack 1 (Strike Forward)", startFrame: 65, endFrame: 85, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 85, endFrame: 100, fps: 30 },
                { name: "Death", startFrame: 100, endFrame: Math.min(122, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('ramia') || modelTag.includes('lamia')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 30, fps: 30 },
                { name: "Walk", startFrame: 30, endFrame: 65, fps: 30 },
                { name: "Run", startFrame: 65, endFrame: 95, fps: 30 },
                { name: "Attack 1 (Slash Forward)", startFrame: 95, endFrame: 125, fps: 30 },
                { name: "Attack 2", startFrame: 125, endFrame: 150, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 150, endFrame: 165, fps: 30 },
                { name: "Death", startFrame: 165, endFrame: Math.min(190, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('scorpion')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 30, fps: 30 },
                { name: "Walk", startFrame: 30, endFrame: 65, fps: 30 },
                { name: "Run", startFrame: 65, endFrame: 95, fps: 30 },
                { name: "Attack 1 (Pincer Strike)", startFrame: 95, endFrame: 130, fps: 30 },
                { name: "Attack 2 (Stinger)", startFrame: 130, endFrame: 160, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 160, endFrame: 175, fps: 30 },
                { name: "Death", startFrame: 175, endFrame: Math.min(200, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('balrog')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 40, fps: 30 },
                { name: "Walk", startFrame: 40, endFrame: 80, fps: 30 },
                { name: "Run", startFrame: 80, endFrame: 120, fps: 30 },
                { name: "Attack 1 (Strike Forward)", startFrame: 120, endFrame: 160, fps: 30 },
                { name: "Attack 2", startFrame: 160, endFrame: 200, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 200, endFrame: 230, fps: 30 },
                { name: "Death", startFrame: 230, endFrame: 280, fps: 30 },
                { name: "Roar / Skill", startFrame: 280, endFrame: Math.min(300, maxSkeletonFrames), fps: 30 }
            ];
        } else if (modelTag.includes('attila') || modelTag.includes('atross')) {
            presetTracks = [
                { name: "Idle / Normal", startFrame: 0, endFrame: 60, fps: 30 },
                { name: "Walk", startFrame: 60, endFrame: 120, fps: 30 },
                { name: "Run", startFrame: 120, endFrame: 180, fps: 30 },
                { name: "Attack 1 (Heavy Strike Forward)", startFrame: 180, endFrame: 250, fps: 30 },
                { name: "Attack 2", startFrame: 250, endFrame: 320, fps: 30 },
                { name: "Damage (Recoil Backward)", startFrame: 400, endFrame: 450, fps: 30 },
                { name: "Death", startFrame: 450, endFrame: 540, fps: 30 },
                { name: "Roar", startFrame: 540, endFrame: Math.min(605, maxSkeletonFrames), fps: 30 }
            ];
        }

        if (presetTracks) {
            presetTracks.forEach(pt => animTracks.push(pt));
        } else {
            // Kinematic motion auto-detection across skeletal joint rotations and root height
            const detected = this.detectKinematicAnimationTracks(this.skeletonData, maxSkeletonFrames, isUpc);
            detected.forEach(d => animTracks.push(d));
        }

        // Setup active animation (prefer "Idle / Normal", "Walk", or index 1, or index 0)
        if (animTracks.length > 0) {
            const preferredTrack = animTracks.find(t => t.name.toLowerCase().includes('idle')) || animTracks[1] || animTracks[0];
            this.activeAnimTrack = preferredTrack;
            this.currentAnimTime = 0;
            this.isAnimPlaying = false; // Do not auto-play automatically
            const playerCard = document.getElementById('anim-player-card');
            if (playerCard) {
                playerCard.style.display = 'flex';
                document.getElementById('player-track-name').textContent = this.activeAnimTrack.name;
                document.getElementById('player-fps-badge').textContent = `${this.activeAnimTrack.fps} FPS`;
                const playPauseBtn = document.getElementById('btn-play-pause');
                if (playPauseBtn) playPauseBtn.textContent = '▶ Play';
            }

            // Update Clip Range Editor frame boundaries
            const totalFramesBadge = document.getElementById('anim-total-frames');
            if (totalFramesBadge) totalFramesBadge.textContent = `${maxSkeletonFrames} Frames`;
            const rStart = document.getElementById('input-range-start');
            if (rStart) rStart.value = 0;
            const rEnd = document.getElementById('input-range-end');
            if (rEnd) {
                rEnd.value = Math.min(30, maxSkeletonFrames);
                rEnd.max = maxSkeletonFrames;
            }

            // Show/hide ChrSelect Animation Switcher
            const chrSelectBox = document.getElementById('chrselect-anim-box');
            if (chrSelectBox) {
                chrSelectBox.style.display = isChrSelect ? 'block' : 'none';
            }

            // Evaluate initial frame
            if (this.skeletonData) {
                this.evaluateSkeleton(this.activeAnimTrack.startFrame);
                this.applySkinDeformation();
                this.applyPlugTransforms();
            }
        } else {
            this.activeAnimTrack = null;
            const playerCard = document.getElementById('anim-player-card');
            if (playerCard) playerCard.style.display = 'none';
        }

        // 5. Load Native Model FX (.n3fxplug & .fxb)
        const nativeFxStatus = document.getElementById('native-fx-status');
        if (this.fxSystem) {
            const fileNameToLoad = chrData.sourceFileName || chrData.name;
            const loadedCount = await this.fxSystem.loadModelNativeFX(fileNameToLoad, this.skeletonData);
            if (nativeFxStatus) {
                if (loadedCount > 0) {
                    nativeFxStatus.textContent = `${loadedCount} Active`;
                    nativeFxStatus.style.background = '#059669';
                    nativeFxStatus.style.color = '#fff';
                } else {
                    nativeFxStatus.textContent = 'None';
                    nativeFxStatus.style.background = 'rgba(255,255,255,0.1)';
                    nativeFxStatus.style.color = 'var(--text-muted)';
                }
            }
        }

        // Auto-Ground model based on initial rest pose of all body parts
        this.computeBaseGroundOffset();
        if (isChrSelect) {
            this.characterSeatedOffsetY = this.computeSeatedOffsetY();
        } else {
            this.characterSeatedOffsetY = 0;
        }
        this.applyGrounding();

        // 6. Load Background Scene (Throne Room / Chairs / Cave Environment)
        this.allAnimTracks = animTracks;
        await this.loadBackgroundScene(this.currentBackgroundType);

        // Update UI
        this.updateInspectorUI(chrData, totalVerts, totalFaces, animTracks);

        // Focus Camera
        this.fitCameraToModel();
    }

    computeBaseGroundOffset() {
        if (!this.currentModelGroup) {
            this.baseGroundOffsetY = 0;
            return;
        }

        // Reset group position to (0,0,0) and force world matrix update to read true bounding box
        this.currentModelGroup.position.set(0, 0, 0);
        this.currentModelGroup.updateMatrixWorld(true);

        const box = new THREE.Box3();
        // Compute base ground level from character body parts (excluding dragged weapons/plugs)
        const bodyParts = this.partsMeshes.filter(m => !m.userData.isPlug);
        const targetParts = bodyParts.length > 0 ? bodyParts : this.partsMeshes;

        targetParts.forEach(m => box.expandByObject(m));

        if (isFinite(box.min.y)) {
            this.baseGroundOffsetY = -box.min.y;
        } else {
            this.baseGroundOffsetY = 0;
        }
    }

    applyGrounding() {
        if (!this.currentModelGroup) return;
        const groundY = this.isGrounded ? (this.baseGroundOffsetY || 0) : 0;
        this.currentModelGroup.position.y = groundY + (this.characterSeatedOffsetY || 0);
    }

    updateInspectorUI(chrData, totalVerts, totalFaces, animTracks) {
        document.getElementById('hud-model-name').textContent = chrData.sourceFileName || chrData.name;
        document.getElementById('hud-verts').textContent = totalVerts.toLocaleString();
        document.getElementById('hud-faces').textContent = totalFaces.toLocaleString();

        const statV = document.getElementById('stat-verts');
        if (statV) statV.textContent = totalVerts.toLocaleString();
        const statF = document.getElementById('stat-faces');
        if (statF) statF.textContent = totalFaces.toLocaleString();
        const statP = document.getElementById('stat-parts');
        if (statP) statP.textContent = this.partsMeshes.length;
        const statA = document.getElementById('stat-anims');
        if (statA) statA.textContent = animTracks.length;

        // Parts checkboxes (if UI container exists)
        const partsContainer = document.getElementById('parts-container');
        if (partsContainer) {
            partsContainer.innerHTML = '';
            if (this.partsMeshes.length === 0) {
                partsContainer.innerHTML = '<div style="font-size: 12px; color: var(--text-sub);">No parts detected.</div>';
            } else {
                this.partsMeshes.forEach((mesh, idx) => {
                    const partItem = document.createElement('div');
                    partItem.className = 'part-item';
                    const isPlug = mesh.userData.isPlug;
                    const vCount = mesh.userData.skinData?.rawVertexCount || mesh.userData.plugMeshData?.rawVertexCount || Math.floor(mesh.geometry.attributes.position.count / 3);

                    partItem.innerHTML = `
                        <label>
                            <input type="checkbox" checked data-part-idx="${idx}">
                            <span style="${isPlug ? 'color: var(--warning); font-weight: 600;' : ''}">${isPlug ? '⚔️ ' : ''}${mesh.name}</span>
                        </label>
                        <span style="color: var(--text-sub); font-size: 11px;">${vCount}v</span>
                    `;
                    partItem.querySelector('input').addEventListener('change', (e) => {
                        mesh.visible = e.target.checked;
                    });
                    partsContainer.appendChild(partItem);
                });
            }
        }

        // Animation list
        const animsContainer = document.getElementById('anims-container');
        animsContainer.innerHTML = '';
        const playerCard = document.getElementById('anim-player-card');
        if (chrData && chrData.isPlug) {
            animsContainer.innerHTML = '<div style="font-size: 12px; color: var(--text-sub);">Item object (no skeletal animations)</div>';
            if (playerCard) playerCard.style.display = 'none';
        } else if (animTracks.length === 0) {
            animsContainer.innerHTML = '<div style="font-size: 12px; color: var(--text-sub);">No animations loaded.</div>';
            if (playerCard) playerCard.style.display = 'none';
        } else {
            animTracks.forEach((tr, idx) => {
                const animItem = document.createElement('div');
                const isSelected = (this.activeAnimTrack && this.activeAnimTrack.name === tr.name) || (!this.activeAnimTrack && idx === 0);
                animItem.className = `anim-item ${isSelected ? 'active' : ''}`;
                const duration = ((tr.endFrame - tr.startFrame) / tr.fps).toFixed(2);
                animItem.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <span style="font-weight: 700; color: #fff;">${tr.name}</span>
                        <span style="color: var(--text-sub); font-size: 11px;">Frames ${tr.startFrame} - ${tr.endFrame} (${duration}s)</span>
                    </div>
                    <span style="color: var(--accent-cyan); font-size: 11px; font-weight: 600; background: rgba(6, 182, 212, 0.1); padding: 3px 6px; border-radius: 4px;">${tr.fps} fps</span>
                `;
                animItem.addEventListener('click', () => {
                    document.querySelectorAll('.anim-item').forEach(a => a.classList.remove('active'));
                    animItem.classList.add('active');
                    this.activeAnimTrack = tr;
                    this.currentAnimTime = 0;
                    this.isAnimPlaying = true;

                    if (this.skeletonData) {
                        this.evaluateSkeleton(tr.startFrame);
                        this.applySkinDeformation();
                        this.applyPlugTransforms();
                    }

                    const playerCard = document.getElementById('anim-player-card');
                    if (playerCard) {
                        playerCard.style.display = 'flex';
                        document.getElementById('player-track-name').textContent = tr.name;
                        document.getElementById('player-fps-badge').textContent = `${tr.fps} FPS`;
                        const playPauseBtn = document.getElementById('btn-play-pause');
                        if (playPauseBtn) playPauseBtn.textContent = '⏸ Pause';
                    }
                });
                animsContainer.appendChild(animItem);
            });
        }

        // Refresh Texture Swapper list
        this.updateTextureSwapperUI();
    }

    applyDisplayMode() {
        this.partsMeshes.forEach(mesh => {
            if (this.displayMode === 'textured') {
                mesh.material = mesh.userData.originalMaterial;
                mesh.material.wireframe = false;
            } else if (this.displayMode === 'wireframe') {
                mesh.material = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true });
            } else if (this.displayMode === 'normal') {
                mesh.material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
            } else if (this.displayMode === 'clay') {
                mesh.material = new THREE.MeshStandardMaterial({
                    color: 0xd1d5db,
                    roughness: 0.8,
                    metalness: 0.05,
                    side: THREE.DoubleSide
                });
            }
        });
    }

    fitCameraToModel() {
        if (!this.currentModelGroup || this.partsMeshes.length === 0) return;

        // Compute box from visible body parts
        const bodyParts = this.partsMeshes.filter(m => !m.userData.isPlug && m.visible);
        const targetParts = bodyParts.length > 0 ? bodyParts : this.partsMeshes.filter(m => m.visible);

        const box = new THREE.Box3();
        targetParts.forEach(m => box.expandByObject(m));

        // If model has tiny/dummy body parts (e.g. FX monuments like 16th_2018_knightman), expand box by FX
        if ((box.max.y - box.min.y) < 0.5 && this.fxSystem && this.fxSystem.fxRootGroup) {
            this.fxSystem.fxRootGroup.traverse(child => {
                if (child.isSprite || child.isMesh) {
                    box.expandByObject(child);
                }
            });
        }

        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;
        cameraZ = Math.max(cameraZ, 2.0);

        this.camera.position.set(center.x, center.y + (size.y * 0.25), center.z + cameraZ);
        this.camera.lookAt(center);
        this.controls.target.copy(center);
        this.controls.update();
    }

    zoomCamera(direction, factor = 0.25) {
        if (!this.camera || !this.controls) return;
        const target = this.controls.target || new THREE.Vector3(0, 1, 0);
        const dir = new THREE.Vector3().subVectors(this.camera.position, target);
        const dist = dir.length();
        const newDist = Math.max(0.2, Math.min(250, dist * (direction > 0 ? (1 + factor) : (1 - factor))));
        dir.normalize().multiplyScalar(newDist);
        this.camera.position.copy(target).add(dir);
        this.controls.update();
    }

    async import3DModel(file) {
        if (!file) return;
        const name = file.name;
        const lower = name.toLowerCase();

        if (lower.endsWith('.n3chr')) {
            return this.loadFromFile(file);
        }

        if (!lower.endsWith('.obj')) {
            alert('Unsupported format. Please select a .obj or .n3chr file!');
            return;
        }

        this.showLoading(`Importing 3D Model: ${name}...`);
        try {
            const text = await file.text();
            const objData = ObjParser.parse(text);

            if (!objData || objData.vertexCount === 0) {
                throw new Error('OBJ file does not contain valid vertex data.');
            }

            // Clean previous model state
            if (this.currentModelGroup) {
                this.scene.remove(this.currentModelGroup);
                this.currentModelGroup = null;
            }
            this.partsMeshes = [];
            this.skeletonData = null;
            this.skinDeformers = [];
            this.plugAttachments = [];
            this.equippedWeapons = { right: null, left: null };
            if (this.fxSystem) this.fxSystem.clear();

            this.currentModelGroup = new THREE.Group();
            this.currentModelGroup.name = objData.name || name;

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(objData.positions, 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(objData.normals, 3));
            geometry.setAttribute('uv', new THREE.BufferAttribute(objData.uvs, 2));
            geometry.computeVertexNormals();

            // Aesthetic standard material
            const material = new THREE.MeshStandardMaterial({
                color: 0xcccccc,
                roughness: 0.5,
                metalness: 0.15,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.name = objData.name || name.replace(/\.obj$/i, '');
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = {
                originalMaterial: material,
                isPlug: false
            };

            this.currentModelGroup.add(mesh);
            this.partsMeshes.push(mesh);
            this.scene.add(this.currentModelGroup);

            this.currentModelData = {
                name: mesh.name,
                sourceFileName: name,
                parts: [mesh.name],
                plugs: []
            };

            this.computeBaseGroundOffset();
            this.applyGrounding();

            this.updateInspectorUI(this.currentModelData, objData.vertexCount, objData.triangleCount, []);
            this.updateTextureSwapperUI();
            this.fitCameraToModel();

        } catch (err) {
            console.error('Failed to import OBJ:', err);
            alert('Failed to import OBJ: ' + err.message);
        } finally {
            this.hideLoading();
        }
    }

    async loadShapeFromFile(file) {
        if (!file.name.toLowerCase().endsWith('.n3shape')) {
            alert('Please upload a .n3shape file!');
            return;
        }
        this.showLoading(`Reading Shape ${file.name}...`);
        try {
            const buffer = await file.arrayBuffer();
            const shapeData = N3ShapeParser.parse(buffer);
            shapeData.sourceFileName = file.name;
            shapeData.isShape = true;
            await this.loadShapeModel(shapeData);
        } catch (err) {
            console.error('Error loading shape file:', err);
            alert(`Error parsing shape file: ` + err.message);
        } finally {
            this.hideLoading();
        }
    }

    async loadShapeModel(itemOrData) {
        let shapeData = null;
        let shapeName = '';
        let shapeFileName = '';

        if (itemOrData.parts && Array.isArray(itemOrData.parts)) {
            shapeData = itemOrData;
            shapeName = shapeData.name || shapeData.sourceFileName || 'Shape Object';
            shapeFileName = shapeData.sourceFileName || '';
        } else {
            const filePath = itemOrData.file || itemOrData;
            shapeFileName = filePath;
            shapeName = itemOrData.name || filePath.split('/').pop();
            this.showLoading(`Loading ${shapeName}...`);
            const shapeUrl = `${this.baseUrl}${filePath.replace(/\\/g, '/')}`;
            const buffer = await this.fetchBuffer(shapeUrl);
            shapeData = N3ShapeParser.parse(buffer);
            shapeData.sourceFileName = filePath;
            shapeData.name = shapeName;
            shapeData.isShape = true;
        }

        // Clean previous character and background state
        if (this.currentModelGroup) {
            this.scene.remove(this.currentModelGroup);
            this.currentModelGroup = null;
        }
        if (this.currentBackgroundGroup) {
            this.scene.remove(this.currentBackgroundGroup);
            this.currentBackgroundGroup = null;
        }
        this.partsMeshes = [];
        this.backgroundMeshes = [];
        this.skeletonData = null;
        this.skinDeformers = [];
        this.plugAttachments = [];
        this.equippedWeapons = { right: null, left: null };
        this.activeAnimTrack = null;

        const playerCard = document.getElementById('anim-player-card');
        if (playerCard) playerCard.style.display = 'none';
        const animsContainer = document.getElementById('anims-container');
        if (animsContainer) animsContainer.innerHTML = '<div style="font-size: 12px; color: var(--text-sub);">Static Environment Object (.n3shape, No Bones)</div>';

        this.currentModelData = shapeData;
        this.currentModelGroup = new THREE.Group();
        this.currentModelGroup.name = shapeName;

        let totalVerts = 0;
        let totalFaces = 0;

        for (let i = 0; i < shapeData.parts.length; i++) {
            const part = shapeData.parts[i];
            try {
                let meshRel = part.meshPath.replace(/\\/g, '/').trim();
                if (!meshRel.toLowerCase().startsWith('chrselect/') && !meshRel.toLowerCase().startsWith('item/') && !meshRel.toLowerCase().startsWith('chr/')) {
                    meshRel = `ChrSelect/${meshRel}`;
                }
                const meshUrl = `${this.baseUrl}${meshRel}`;
                const meshRes = await fetch(meshUrl);
                if (!meshRes.ok) continue;
                const meshBuffer = await meshRes.arrayBuffer();
                const pmeshData = N3PMeshParser.parse(meshBuffer);
                if (!pmeshData || !pmeshData.positions) continue;

                let texture = null;
                let hasAlpha = false;
                let rawDxtBuffer = null;
                let decodedDxt = null;
                let texUrl = null;
                let texFileName = '';
                if (part.texPath) {
                    let texRel = part.texPath.replace(/\\/g, '/').trim();
                    if (!texRel.toLowerCase().startsWith('chrselect/') && !texRel.toLowerCase().startsWith('item/')) {
                        texRel = `ChrSelect/${texRel}`;
                    }
                    texFileName = texRel.split('/').pop();
                    try {
                        texUrl = `${this.baseUrl}${texRel}`;
                        const texRes = await fetch(texUrl);
                        if (texRes.ok) {
                            rawDxtBuffer = await texRes.arrayBuffer();
                            decodedDxt = DxtDecoder.decode(rawDxtBuffer);
                            texture = new THREE.CanvasTexture(decodedDxt.canvas);
                            texture.flipY = false;
                            texture.wrapS = THREE.RepeatWrapping;
                            texture.wrapT = THREE.RepeatWrapping;
                            if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                            if (decodedDxt.hasAlpha) hasAlpha = true;
                        }
                    } catch (e) {}
                }

                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(pmeshData.positions, 3));
                geometry.setAttribute('normal', new THREE.BufferAttribute(pmeshData.normals, 3));
                geometry.setAttribute('uv', new THREE.BufferAttribute(pmeshData.uvs, 2));
                if (!pmeshData.normals || pmeshData.normals.length === 0) {
                    geometry.computeVertexNormals();
                }

                const matTextured = new THREE.MeshLambertMaterial({
                    map: texture,
                    color: texture ? 0xffffff : 0xd1d5db,
                    transparent: hasAlpha,
                    alphaTest: hasAlpha ? 0.2 : 0.0,
                    depthWrite: true,
                    side: THREE.DoubleSide
                });

                const mesh = new THREE.Mesh(geometry, matTextured);
                const pv = part.pivot || { x: 0, y: 0, z: 0 };
                mesh.position.set(pv.x || 0, pv.y || 0, pv.z || 0);
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                const baseMeshName = meshRel.split('/').pop().replace(/\.n3pmesh$/i, '');
                const friendlyName = this.formatBackgroundObjectName(baseMeshName);
                mesh.name = friendlyName;

                mesh.userData = {
                    partName: friendlyName,
                    rawMeshName: baseMeshName,
                    shapeFile: shapeFileName,
                    meshPath: meshRel,
                    texPath: part.texPath,
                    texFileName: texFileName || `${baseMeshName}.dxt`,
                    originalMaterial: matTextured,
                    rawDxtBuffer: rawDxtBuffer,
                    texUrl: texUrl,
                    decodedDxt: decodedDxt,
                    currentCanvas: decodedDxt ? decodedDxt.canvas : null,
                    pivot: pv,
                    pmeshData: pmeshData,
                    isPlug: false
                };

                this.currentModelGroup.add(mesh);
                this.partsMeshes.push(mesh);

                totalVerts += pmeshData.rawVertexCount || Math.floor(pmeshData.positions.length / 3);
                totalFaces += pmeshData.triangleCount || Math.floor(pmeshData.positions.length / 9);
            } catch (err) {
                console.warn('Failed loading shape part:', part.meshPath, err);
            }
        }

        // Apply shape root position / rotation / scale if defined
        if (shapeData.pos) {
            this.currentModelGroup.position.set(shapeData.pos.x || 0, shapeData.pos.y || 0, shapeData.pos.z || 0);
        }
        if (shapeData.rot) {
            this.currentModelGroup.quaternion.set(shapeData.rot.x || 0, shapeData.rot.y || 0, shapeData.rot.z || 0, shapeData.rot.w || 1);
        }
        if (shapeData.scale) {
            this.currentModelGroup.scale.set(shapeData.scale.x || 1, shapeData.scale.y || 1, shapeData.scale.z || 1);
        }

        this.scene.add(this.currentModelGroup);

        // Grounding & Camera
        this.computeBaseGroundOffset();
        this.applyGrounding();

        // Update UI
        this.updateInspectorUI(shapeData, totalVerts, totalFaces, []);
        this.updateBackgroundUI();
        this.updateTextureSwapperUI();
        this.fitCameraToModel();
        this.showToast(`Successfully loaded ${shapeName} (${this.partsMeshes.length} parts)!`);
    }

    async loadBackgroundScene(sceneType, force = false) {
        if (!sceneType) sceneType = 'auto';
        this.currentBackgroundType = sceneType;

        // Resolve actual scene if 'auto'
        let targetScene = sceneType;
        if (sceneType === 'auto') {
            if (this.currentModelData) {
                const tag = `${this.currentModelData.sourceFileName || ''} ${this.currentModelData.name || ''}`.toLowerCase();
                if (tag.includes('el_') || tag.includes('human') || tag.includes('barbar') || tag.includes('kadin') || tag.includes('erkek')) {
                    targetScene = 'el_chairs';
                } else if (tag.includes('ka_') || tag.includes('karus') || tag.includes('tuurek') || tag.includes('kurian') || tag.includes('wrinkle')) {
                    targetScene = 'ka_chairs';
                } else if (this.isCurrentModelUpc) {
                    targetScene = 'el_chairs';
                } else {
                    targetScene = 'el_chairs';
                }
            } else {
                targetScene = 'el_chairs';
            }
        }

        // Sync dropdowns
        const bgSelect = document.getElementById('bg-scene-select');
        if (bgSelect && bgSelect.value !== sceneType) bgSelect.value = sceneType;
        const bgPanelSelect = document.getElementById('bg-panel-scene-select');
        if (bgPanelSelect && bgPanelSelect.value !== sceneType) bgPanelSelect.value = sceneType;

        // Update badge
        const badge = document.getElementById('bg-active-badge');
        if (badge) {
            if (targetScene === 'none') {
                badge.textContent = 'Hidden';
                badge.style.background = 'rgba(239, 68, 68, 0.2)';
                badge.style.color = '#ef4444';
            } else if (targetScene === 'custom') {
                badge.textContent = 'Custom';
                badge.style.background = 'rgba(6, 182, 212, 0.2)';
                badge.style.color = '#67e8f9';
            } else {
                badge.textContent = targetScene === 'el_chairs' ? 'El Morad' : 'Karus';
                badge.style.background = 'rgba(16, 185, 129, 0.2)';
                badge.style.color = '#10b981';
            }
        }

        // Remove previous background
        if (this.currentBackgroundGroup) {
            this.scene.remove(this.currentBackgroundGroup);
            this.currentBackgroundGroup = null;
        }
        if (this.backgroundLights) {
            this.backgroundLights.forEach(l => this.scene.remove(l));
            this.backgroundLights = [];
        }
        this.backgroundMeshes = [];
        this.selectedBackgroundObject = null;
        if (this.selectionBoxHelper) {
            this.scene.remove(this.selectionBoxHelper);
            this.selectionBoxHelper = null;
        }

        if (targetScene === 'none') {
            if (this.grid) {
                this.grid.visible = true;
                const btnGrid = document.getElementById('btn-grid');
                if (btnGrid) btnGrid.classList.add('active');
            }
            this.updateBackgroundUI();
            this.updateTextureSwapperUI();
            return;
        }

        if (targetScene === 'custom') {
            this.currentBackgroundGroup = new THREE.Group();
            this.currentBackgroundGroup.name = 'CustomBackgroundScene';
            this.scene.add(this.currentBackgroundGroup);
            if (this.grid) {
                this.grid.visible = true;
                const btnGrid = document.getElementById('btn-grid');
                if (btnGrid) btnGrid.classList.add('active');
            }
            this.updateBackgroundUI();
            this.updateTextureSwapperUI();
            this.showToast('🎨 Custom Blank Canvas ready! Add objects from Object/ or custom files.');
            return;
        }

        // Calibrate default background transform so chairs align perfectly with seated characters
        if (targetScene === 'el_chairs') {
            this.backgroundTransform = { x: 0.086, y: 2.35, z: -2.35, rotY: 0, scale: 1.0 };
        } else if (targetScene === 'ka_chairs' || targetScene === 'ka_cave') {
            this.backgroundTransform = { x: 0.11, y: 2.75, z: -2.45, rotY: 0, scale: 1.0 };
        } else {
            this.backgroundTransform = { x: 0, y: 0, z: 0, rotY: 0, scale: 1.0 };
        }

        // Hide floor grid helper when preset background scene is active for cleaner immersion
        if (this.grid) {
            this.grid.visible = false;
            const btnGrid = document.getElementById('btn-grid');
            if (btnGrid) btnGrid.classList.remove('active');
        }

        // Determine shape files to load
        let shapeFiles = [];
        if (targetScene === 'el_chairs') {
            shapeFiles = ['ChrSelect/el_chairs.n3shape'];
        } else if (targetScene === 'ka_chairs') {
            shapeFiles = ['ChrSelect/ka_chairs.n3shape'];
        } else if (targetScene === 'ka_cave') {
            shapeFiles = ['ChrSelect/ka_cave.n3shape'];
        }

        this.currentBackgroundGroup = new THREE.Group();
        this.currentBackgroundGroup.name = `Background_${targetScene}`;

        for (const shapeFile of shapeFiles) {
            try {
                const shapeUrl = `${this.baseUrl}${shapeFile}`;
                const shapeRes = await fetch(shapeUrl);
                if (!shapeRes.ok) continue;
                const shapeBuffer = await shapeRes.arrayBuffer();
                const shapeData = N3ShapeParser.parse(shapeBuffer);
                if (!shapeData || !shapeData.parts) continue;

                const shapeBaseName = shapeFile.split('/').pop().replace(/\.n3shape$/i, '');
                const shapeGroup = new THREE.Group();
                shapeGroup.name = shapeBaseName;
                shapeGroup.userData = {
                    isBackground: true,
                    isShapeGroup: true,
                    shapeName: shapeBaseName,
                    sourcePath: shapeFile,
                    parts: []
                };

                for (const part of shapeData.parts) {
                    try {
                        let meshRel = part.meshPath.replace(/\\/g, '/').trim();
                        if (!meshRel.toLowerCase().startsWith('chrselect/') && !meshRel.toLowerCase().startsWith('item/') && !meshRel.toLowerCase().startsWith('chr/') && !meshRel.toLowerCase().startsWith('object/')) {
                            meshRel = `ChrSelect/${meshRel}`;
                        }
                        const meshUrl = `${this.baseUrl}${meshRel}`;
                        const meshRes = await fetch(meshUrl);
                        if (!meshRes.ok) continue;
                        const meshBuffer = await meshRes.arrayBuffer();
                        const pmeshData = N3PMeshParser.parse(meshBuffer);
                        if (!pmeshData || !pmeshData.positions) continue;

                        let texture = null;
                        let hasAlpha = false;
                        let rawDxtBuffer = null;
                        let decodedDxt = null;
                        let texUrl = null;
                        let texFileName = '';
                        if (part.texPath) {
                            let texRel = part.texPath.replace(/\\/g, '/').trim();
                            if (!texRel.toLowerCase().startsWith('chrselect/') && !texRel.toLowerCase().startsWith('item/') && !texRel.toLowerCase().startsWith('object/')) {
                                texRel = `ChrSelect/${texRel}`;
                            }
                            texFileName = texRel.split('/').pop();
                            try {
                                texUrl = `${this.baseUrl}${texRel}`;
                                const texRes = await fetch(texUrl);
                                if (texRes.ok) {
                                    rawDxtBuffer = await texRes.arrayBuffer();
                                    decodedDxt = DxtDecoder.decode(rawDxtBuffer);
                                    texture = new THREE.CanvasTexture(decodedDxt.canvas);
                                    texture.flipY = false;
                                    texture.wrapS = THREE.RepeatWrapping;
                                    texture.wrapT = THREE.RepeatWrapping;
                                    if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                                    if (decodedDxt.hasAlpha) hasAlpha = true;
                                }
                            } catch (texErr) {
                                console.warn('Could not load background texture:', texRel, texErr);
                            }
                        }

                        const geometry = new THREE.BufferGeometry();
                        geometry.setAttribute('position', new THREE.BufferAttribute(pmeshData.positions, 3));
                        geometry.setAttribute('normal', new THREE.BufferAttribute(pmeshData.normals, 3));
                        geometry.setAttribute('uv', new THREE.BufferAttribute(pmeshData.uvs, 2));
                        if (!pmeshData.normals || pmeshData.normals.length === 0) {
                            geometry.computeVertexNormals();
                        }

                        const matTextured = new THREE.MeshLambertMaterial({
                            map: texture,
                            color: texture ? 0xffffff : 0xd1d5db,
                            transparent: hasAlpha,
                            alphaTest: hasAlpha ? 0.2 : 0.0,
                            depthWrite: true,
                            side: THREE.DoubleSide
                        });

                        const mesh = new THREE.Mesh(geometry, matTextured);
                        const pv = part.pivot || { x: 0, y: 0, z: 0 };
                        mesh.position.set(pv.x || 0, pv.y || 0, pv.z || 0);
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;

                        const baseMeshName = meshRel.split('/').pop().replace(/\.n3pmesh$/i, '');
                        const friendlyName = this.formatBackgroundObjectName(baseMeshName);
                        mesh.name = friendlyName;

                        mesh.userData = {
                            isBackground: true,
                            parentShapeGroup: shapeGroup,
                            partName: friendlyName,
                            rawMeshName: baseMeshName,
                            shapeFile: shapeFile,
                            meshPath: meshRel,
                            texPath: part.texPath,
                            texFileName: texFileName || `${baseMeshName}.dxt`,
                            originalMaterial: matTextured,
                            rawDxtBuffer: rawDxtBuffer,
                            texUrl: texUrl,
                            decodedDxt: decodedDxt,
                            currentCanvas: decodedDxt ? decodedDxt.canvas : null,
                            pivot: pv,
                            pmeshData: pmeshData,
                            hasAlpha: hasAlpha
                        };

                        shapeGroup.add(mesh);
                        shapeGroup.userData.parts.push(mesh);
                        this.backgroundMeshes.push(mesh);
                    } catch (pErr) {
                        console.warn('Failed loading background part:', part.meshPath, pErr);
                    }
                }
                this.currentBackgroundGroup.add(shapeGroup);
            } catch (sErr) {
                console.warn('Failed loading background shape:', shapeFile, sErr);
            }
        }

        // Add Atmospheric Lighting
        if (targetScene === 'el_chairs') {
            const ambient = new THREE.AmbientLight(0xffedd5, 0.45);
            const throneLight = new THREE.PointLight(0xffecd2, 1.3, 25);
            throneLight.position.set(0, 3.2, 0.5);
            this.scene.add(ambient);
            this.scene.add(throneLight);
            this.backgroundLights.push(ambient, throneLight);
        } else if (targetScene === 'ka_chairs' || targetScene === 'ka_cave') {
            const ambient = new THREE.AmbientLight(0x94a3b8, 0.3);
            const torch1 = new THREE.PointLight(0xff6622, 1.4, 22);
            torch1.position.set(-2, 2.5, 1);
            const torch2 = new THREE.PointLight(0xff4411, 1.2, 20);
            torch2.position.set(2, 2.5, 1);
            this.scene.add(ambient);
            this.scene.add(torch1);
            this.scene.add(torch2);
            this.backgroundLights.push(ambient, torch1, torch2);
        }

        // Re-calibrate seated offset when background scene is loaded for ChrSelect models
        const isChrSelectModel = this.currentModelData && ((this.currentModelData.category === 'ChrSelect') || (this.currentModelData.sourceFileName && this.currentModelData.sourceFileName.toLowerCase().includes('chrselect')));
        if (isChrSelectModel) {
            const isSitting = !this.activeAnimTrack || (this.activeAnimTrack.name || '').toLowerCase().includes('sit') || (this.activeAnimTrack.name || '').toLowerCase().includes('throne');
            this.characterSeatedOffsetY = isSitting ? this.computeSeatedOffsetY(targetScene === 'ka_chairs' || targetScene === 'ka_cave') : 0;
            this.applyGrounding();
        }

        // Apply current transform
        this.applyBackgroundTransform();

        // Add to scene
        this.scene.add(this.currentBackgroundGroup);

        // Update UI
        this.updateBackgroundUI();
        this.updateTextureSwapperUI();
    }

    formatBackgroundObjectName(baseMeshName) {
        return baseMeshName;
    }

    applyBackgroundTransform() {
        if (!this.currentBackgroundGroup) return;
        const t = this.backgroundTransform;
        this.currentBackgroundGroup.position.set(t.x, t.y, t.z);
        this.currentBackgroundGroup.rotation.y = (t.rotY * Math.PI) / 180;
        this.currentBackgroundGroup.scale.set(t.scale, t.scale, t.scale);

        const setVal = (id, val, text) => {
            const el = document.getElementById(id);
            if (el) el.value = val;
            const sp = document.getElementById(`val-${id.replace('slider-', '')}`);
            if (sp) sp.textContent = text;
        };
        setVal('slider-bg-pos-y', t.y, t.y >= 0 ? `+${t.y.toFixed(2)}` : t.y.toFixed(2));
        setVal('slider-bg-pos-z', t.z, t.z >= 0 ? `+${t.z.toFixed(2)}` : t.z.toFixed(2));
        setVal('slider-bg-pos-x', t.x, t.x >= 0 ? `+${t.x.toFixed(2)}` : t.x.toFixed(2));
        setVal('slider-bg-rot-y', t.rotY, `${t.rotY.toFixed(0)}°`);
        setVal('slider-bg-scale', t.scale, `${t.scale.toFixed(2)}x`);
    }

    isKarusScene() {
        if (this.currentBackgroundType === 'ka_chairs' || this.currentBackgroundType === 'ka_cave') return true;
        if (this.currentBackgroundType === 'el_chairs') return false;
        if (this.currentBackgroundGroup && this.currentBackgroundGroup.name && this.currentBackgroundGroup.name.toLowerCase().includes('ka_')) return true;
        const tag = `${this.currentModelData?.sourceFileName || ''} ${this.currentModelData?.name || ''}`.toLowerCase();
        return tag.includes('ka_') || tag.includes('karus') || tag.includes('tuurek') || tag.includes('kurian') || tag.includes('wrinkle');
    }

    computeSeatedOffsetY(forcedIsKarus = null) {
        const isKarus = forcedIsKarus !== null ? forcedIsKarus : this.isKarusScene();
        const modelTag = `${this.currentModelData?.sourceFileName || ''} ${this.currentModelData?.name || ''}`.toLowerCase();

        if (isKarus) {
            // Karus Throne Cushion (chairbottom) is at world Y ~0.55m (backgroundTransform.y = 2.75)
            // Karus characters have distinct sitting poses:
            // 1. Wrinkle Tuurek (Mage): small goblin stature, squatting sit with knees forward (+0.48m)
            if (modelTag.includes('upc_ka_wt') || modelTag.includes('wrinkle')) {
                return 0.48;
            }
            // 2. Tuurek (Rogue & Priest): medium athletic stature (+0.25m)
            if (modelTag.includes('upc_ka_tu') || modelTag.includes('tuurek')) {
                return 0.25;
            }
            // 3. Arch Tuurek (Warrior): massive 2.2m tall chieftain (+0.05m)
            if (modelTag.includes('upc_ka_at') || modelTag.includes('arch')) {
                return 0.05;
            }
            return 0.25;
        } else {
            // El Morad Throne Chair is at world Y ~0.15m (backgroundTransform.y = 2.35)
            if (modelTag.includes('upc_el_ba') || modelTag.includes('barbar')) {
                return -0.45;
            }
            if (modelTag.includes('upc_el_rf')) {
                return -0.35;
            }
            if (modelTag.includes('upc_el_rm')) {
                return -0.30;
            }
            return -0.45;
        }
    }

    alignCharacterToChair() {
        if (this.skeletonData) {
            const sitTrack = (this.allAnimTracks || []).find(tr => 
                tr.name.toLowerCase().includes('throne') || 
                tr.name.toLowerCase().includes('sit')
            );
            if (sitTrack) {
                this.activeAnimTrack = sitTrack;
                this.currentAnimTime = 0;
                this.isAnimPlaying = true;
                this.evaluateSkeleton(sitTrack.startFrame);
                this.applySkinDeformation();
                this.applyPlugTransforms();
                const playerTrack = document.getElementById('player-track-name');
                if (playerTrack) playerTrack.textContent = sitTrack.name;
                const playPauseBtn = document.getElementById('btn-play-pause');
                if (playPauseBtn) playPauseBtn.textContent = '⏸ Pause';
            }
        }

        const isKarus = this.isKarusScene();
        
        if (isKarus) {
            this.backgroundTransform = { x: 0.11, y: 2.75, z: -2.45, rotY: 0, scale: 1.0 };
            this.characterSeatedOffsetY = this.computeSeatedOffsetY(true);
        } else {
            this.backgroundTransform = { x: 0.086, y: 2.35, z: -2.35, rotY: 0, scale: 1.0 };
            this.characterSeatedOffsetY = this.computeSeatedOffsetY(false);
        }

        this.applyGrounding();
        this.applyBackgroundTransform();
        this.updateBackgroundUI();
        this.showToast('🪑 Character aligned to throne chair!');
    }

    resetBackgroundTransform() {
        const isKarus = this.isKarusScene();
        if (isKarus) {
            this.backgroundTransform = { x: 0.11, y: 2.75, z: -2.45, rotY: 0, scale: 1.0 };
            this.characterSeatedOffsetY = this.computeSeatedOffsetY(true);
        } else if (this.currentBackgroundType === 'el_chairs' || this.currentBackgroundType === 'auto') {
            this.backgroundTransform = { x: 0.086, y: 2.35, z: -2.35, rotY: 0, scale: 1.0 };
            this.characterSeatedOffsetY = this.computeSeatedOffsetY(false);
        } else {
            this.backgroundTransform = { x: 0, y: 0, z: 0, rotY: 0, scale: 1.0 };
            this.characterSeatedOffsetY = 0;
        }
        this.applyGrounding();
        this.applyBackgroundTransform();
        this.updateBackgroundUI();
        this.showToast('🔄 Background reset to default throne seat');
    }

    toggleAllBackgroundObjects() {
        if (!this.backgroundMeshes || this.backgroundMeshes.length === 0) return;
        const anyVisible = this.backgroundMeshes.some(m => m.visible);
        const newVisible = !anyVisible;
        this.backgroundMeshes.forEach(m => {
            this.toggleMeshVisibility(m, newVisible);
        });
        const btn = document.getElementById('btn-toggle-all-bg');
        if (btn) btn.textContent = newVisible ? 'Hide All' : 'Show All';

        // Synchronize checkboxes in UI without full re-render
        const checkboxes = document.querySelectorAll('#bg-objects-container input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.checked = newVisible;
        });
    }

    toggleMeshVisibility(mesh, targetVisible, duration = 180) {
        if (!mesh) return;

        // Cancel any existing fade tween on this mesh
        if (mesh.userData && mesh.userData._fadeAnimId) {
            cancelAnimationFrame(mesh.userData._fadeAnimId);
            mesh.userData._fadeAnimId = null;
        }

        const mat = mesh.material;
        if (!mat) {
            mesh.visible = targetVisible;
            return;
        }

        if (targetVisible) {
            mesh.visible = true;
            mat.transparent = true;
            const startOpacity = typeof mat.opacity === 'number' ? mat.opacity : 0;
            const startTime = performance.now();

            const animateFadeIn = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1.0);
                const ease = progress * (2 - progress); // Ease out quad
                mat.opacity = startOpacity + (1.0 - startOpacity) * ease;
                mat.needsUpdate = true;

                if (progress < 1.0) {
                    mesh.userData._fadeAnimId = requestAnimationFrame(animateFadeIn);
                } else {
                    mat.opacity = 1.0;
                    mat.transparent = !!mesh.userData.hasAlpha;
                    mat.needsUpdate = true;
                    mesh.userData._fadeAnimId = null;
                }
            };
            mesh.userData._fadeAnimId = requestAnimationFrame(animateFadeIn);
        } else {
            mat.transparent = true;
            const startOpacity = typeof mat.opacity === 'number' ? mat.opacity : 1.0;
            const startTime = performance.now();

            const animateFadeOut = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1.0);
                const ease = progress * progress; // Ease in quad
                mat.opacity = Math.max(0, startOpacity * (1.0 - ease));
                mat.needsUpdate = true;

                if (progress < 1.0) {
                    mesh.userData._fadeAnimId = requestAnimationFrame(animateFadeOut);
                } else {
                    mesh.visible = false;
                    mat.opacity = 1.0; // Reset for next display
                    mat.transparent = !!mesh.userData.hasAlpha;
                    mat.needsUpdate = true;
                    mesh.userData._fadeAnimId = null;
                }
            };
            mesh.userData._fadeAnimId = requestAnimationFrame(animateFadeOut);
        }
    }

    updateBackgroundUI() {
        const container = document.getElementById('bg-objects-container');
        if (!container) return;
        container.innerHTML = '';

        const countEl = document.getElementById('bg-objects-count');
        if (countEl) {
            countEl.textContent = `${this.backgroundMeshes.length} items`;
        }

        if (!this.backgroundMeshes || this.backgroundMeshes.length === 0) {
            container.innerHTML = '<div style="font-size: 11px; color: var(--text-sub); padding: 6px;">No background objects in scene.</div>';
            return;
        }

        this.backgroundMeshes.forEach((mesh, idx) => {
            const item = document.createElement('div');
            item.className = 'bg-object-item';
            const target = mesh.userData.parentShapeGroup || mesh;
            if (this.selectedBackgroundObject && (this.selectedBackgroundObject === target || this.selectedBackgroundObject === mesh)) {
                item.classList.add('selected');
            }
            const vCount = mesh.geometry?.attributes?.position?.count || 0;

            item.innerHTML = `
                <label title="${mesh.name} (${mesh.userData.texFileName || ''})">
                    <input type="checkbox" ${mesh.visible ? 'checked' : ''} data-bg-idx="${idx}">
                    <span style="font-size: 11px; font-weight: 500; color: #fff;">${mesh.name}</span>
                </label>
                <div class="bg-object-actions">
                    <span style="font-size: 10px; color: var(--text-sub);">${vCount}v</span>
                    <button class="btn-bg-action btn-bg-view" data-bg-idx="${idx}" title="View & Download Texture (.DXT / .PNG)">👁️ View</button>
                    <button class="btn-bg-action btn-bg-tex" data-bg-idx="${idx}" title="Swap Object Texture">🎨 Swap</button>
                    <button class="btn-bg-action btn-bg-del" data-bg-idx="${idx}" title="Remove object" style="color: #f87171;">🗑️</button>
                </div>
            `;

            item.addEventListener('click', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
                this.selectBackgroundObject(target);
            });

            item.querySelector('input').addEventListener('change', (e) => {
                this.toggleMeshVisibility(mesh, e.target.checked);
            });

            item.querySelector('.btn-bg-view').addEventListener('click', (e) => {
                e.stopPropagation();
                this.openTextureModal(mesh);
            });

            item.querySelector('.btn-bg-tex').addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeSwapperMesh = mesh;
                const fileInput = document.getElementById('swapper-file-input');
                if (fileInput) {
                    fileInput.value = '';
                    fileInput.click();
                }
            });

            item.querySelector('.btn-bg-del').addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectBackgroundObject(target);
                this.removeSelectedBackgroundObject();
            });

            container.appendChild(item);
        });
    }

    selectBackgroundObject(target) {
        if (!target) return;
        this.selectedBackgroundObject = target;

        const inspector = document.getElementById('bg-selected-inspector');
        if (inspector) inspector.style.display = 'block';

        const nameEl = document.getElementById('bg-inspector-name');
        if (nameEl) nameEl.textContent = target.name || 'Selected Object';

        const updateSlider = (id, val, text) => {
            const sl = document.getElementById(id);
            if (sl) sl.value = val;
            const sp = document.getElementById(`val-${id.replace('slider-', '')}`);
            if (sp) sp.textContent = text;
        };

        updateSlider('slider-bg-obj-x', target.position.x, target.position.x >= 0 ? `+${target.position.x.toFixed(2)}` : target.position.x.toFixed(2));
        updateSlider('slider-bg-obj-y', target.position.y, target.position.y >= 0 ? `+${target.position.y.toFixed(2)}` : target.position.y.toFixed(2));
        updateSlider('slider-bg-obj-z', target.position.z, target.position.z >= 0 ? `+${target.position.z.toFixed(2)}` : target.position.z.toFixed(2));
        const rotDeg = Math.round((target.rotation.y * 180) / Math.PI);
        updateSlider('slider-bg-obj-rot-y', rotDeg, `${rotDeg}°`);
        updateSlider('slider-bg-obj-scale', target.scale.x, `${target.scale.x.toFixed(2)}x`);

        // Highlight in list
        const items = document.querySelectorAll('#bg-objects-container .bg-object-item');
        items.forEach(el => {
            const idx = parseInt(el.querySelector('input')?.dataset?.bgIdx, 10);
            const m = this.backgroundMeshes[idx];
            if (m && (m === target || m.userData.parentShapeGroup === target)) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });

        // 3D Viewport Bounding Box Helper
        if (this.selectionBoxHelper) {
            this.scene.remove(this.selectionBoxHelper);
            this.selectionBoxHelper = null;
        }
        try {
            this.selectionBoxHelper = new THREE.BoxHelper(target, 0x06b6d4);
            this.scene.add(this.selectionBoxHelper);
        } catch (e) {}
    }

    duplicateSelectedBackgroundObject() {
        if (!this.selectedBackgroundObject || !this.currentBackgroundGroup) return;
        const orig = this.selectedBackgroundObject;
        const clone = orig.clone(true);
        clone.position.x += 1.5;
        clone.position.z += 0.5;
        clone.name = `${orig.name}_copy`;

        clone.traverse(child => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.userData = Object.assign({}, child.userData, {
                    parentShapeGroup: clone,
                    isBackground: true
                });
                this.backgroundMeshes.push(child);
            }
        });

        this.currentBackgroundGroup.add(clone);
        this.selectBackgroundObject(clone);
        this.updateBackgroundUI();
        this.updateTextureSwapperUI();
        this.showToast(`📋 Duplicated "${orig.name}"!`);
    }

    removeSelectedBackgroundObject() {
        if (!this.selectedBackgroundObject || !this.currentBackgroundGroup) return;
        const target = this.selectedBackgroundObject;
        const name = target.name;

        const meshesToRemove = [];
        target.traverse(child => {
            if (child.isMesh) meshesToRemove.push(child);
        });
        this.backgroundMeshes = this.backgroundMeshes.filter(m => !meshesToRemove.includes(m));

        if (this.selectionBoxHelper) {
            this.scene.remove(this.selectionBoxHelper);
            this.selectionBoxHelper = null;
        }

        if (target.parent) {
            target.parent.remove(target);
        }
        this.selectedBackgroundObject = null;

        const inspector = document.getElementById('bg-selected-inspector');
        if (inspector) inspector.style.display = 'none';

        this.updateBackgroundUI();
        this.updateTextureSwapperUI();
        this.showToast(`🗑️ Removed "${name}" from scene.`);
    }

    focusSelectedBackgroundObject() {
        if (!this.selectedBackgroundObject || !this.controls) return;
        const target = this.selectedBackgroundObject;
        const box = new THREE.Box3().setFromObject(target);
        const center = new THREE.Vector3();
        box.getCenter(center);
        this.controls.target.copy(center);
        this.controls.update();
        this.showToast(`🎯 Focused on ${target.name}`);
    }

    saveCustomBackgroundScene() {
        if (!this.currentBackgroundGroup || this.currentBackgroundGroup.children.length === 0) {
            this.showToast('⚠️ No background objects to save!');
            return;
        }

        const sceneData = {
            version: 1,
            savedAt: new Date().toISOString(),
            objects: []
        };

        for (const child of this.currentBackgroundGroup.children) {
            sceneData.objects.push({
                name: child.name,
                sourcePath: child.userData.sourcePath || '',
                position: { x: child.position.x, y: child.position.y, z: child.position.z },
                rotY: Math.round((child.rotation.y * 180) / Math.PI),
                scale: child.scale.x,
                visible: child.visible
            });
        }

        try {
            localStorage.setItem('KO_CUSTOM_BG_SCENE', JSON.stringify(sceneData));
            this.showToast(`💾 Scene saved (${sceneData.objects.length} objects)!`);
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
            this.showToast('⚠️ Could not save scene to storage.');
        }
    }

    async loadCustomBackgroundScene() {
        const raw = localStorage.getItem('KO_CUSTOM_BG_SCENE');
        if (!raw) {
            this.showToast('⚠️ No saved background scene found in storage.');
            return;
        }

        try {
            const sceneData = JSON.parse(raw);
            if (!sceneData.objects || sceneData.objects.length === 0) {
                this.showToast('⚠️ Saved scene has no objects.');
                return;
            }

            this.showLoading(`Loading Saved Scene (${sceneData.objects.length} objects)...`);
            this.clearBackgroundScene(false);

            for (const obj of sceneData.objects) {
                if (obj.sourcePath) {
                    await this.addShapeToBackground(obj.sourcePath, obj.name, obj);
                }
            }
            this.showToast(`📂 Loaded saved scene (${sceneData.objects.length} objects)!`);
        } catch (e) {
            console.error('Failed to load saved scene:', e);
            this.showToast('⚠️ Failed to load saved scene.');
        } finally {
            this.hideLoading();
        }
    }

    clearBackgroundScene(notify = true) {
        if (this.currentBackgroundGroup) {
            while (this.currentBackgroundGroup.children.length > 0) {
                this.currentBackgroundGroup.remove(this.currentBackgroundGroup.children[0]);
            }
        }
        if (this.selectionBoxHelper) {
            this.scene.remove(this.selectionBoxHelper);
            this.selectionBoxHelper = null;
        }
        this.backgroundMeshes = [];
        this.selectedBackgroundObject = null;

        const inspector = document.getElementById('bg-selected-inspector');
        if (inspector) inspector.style.display = 'none';

        this.updateBackgroundUI();
        this.updateTextureSwapperUI();

        if (notify) {
            this.showToast('🗑️ Background canvas cleared! Ready for new objects.');
        }
    }

    async addShapeToBackground(source, customName = null, initialTransform = null) {
        this.showLoading('Adding Object to Scene...');
        try {
            let buffer;
            let sourcePath = '';
            let shapeName = customName || 'Custom Object';

            if (typeof source === 'string') {
                sourcePath = source;
                shapeName = customName || source.split('/').pop().replace(/\.n3shape$/i, '');
                const res = await fetch(`${this.baseUrl}${source}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${source}: ${res.statusText}`);
                }
                buffer = await res.arrayBuffer();
            } else if (source instanceof ArrayBuffer) {
                buffer = source;
                shapeName = customName || 'Imported Object';
            } else if (source instanceof File) {
                sourcePath = source.name;
                shapeName = customName || source.name.replace(/\.n3shape$/i, '');
                buffer = await source.arrayBuffer();
            }

            const shapeData = N3ShapeParser.parse(buffer);
            if (!shapeData || !shapeData.parts || shapeData.parts.length === 0) {
                throw new Error('Invalid or empty .n3shape file');
            }

            if (!this.currentBackgroundGroup) {
                this.currentBackgroundGroup = new THREE.Group();
                this.currentBackgroundGroup.name = 'CustomBackgroundScene';
                this.scene.add(this.currentBackgroundGroup);
            }

            const shapeGroup = new THREE.Group();
            shapeGroup.name = shapeName;
            shapeGroup.userData = {
                isBackground: true,
                isShapeGroup: true,
                shapeName: shapeName,
                sourcePath: sourcePath,
                parts: []
            };

            for (const part of shapeData.parts) {
                try {
                    let meshRel = part.meshPath.replace(/\\/g, '/').trim();
                    const baseMeshFileName = meshRel.split('/').pop();
                    let meshBuffer = null;

                    if (this.uploadedFilesMap && this.uploadedFilesMap.has(baseMeshFileName.toLowerCase())) {
                        meshBuffer = await this.uploadedFilesMap.get(baseMeshFileName.toLowerCase()).arrayBuffer();
                    } else {
                        let meshCandidates = [
                            meshRel,
                            `Object/${baseMeshFileName}`,
                            `ChrSelect/${baseMeshFileName}`,
                            `models/${baseMeshFileName}`
                        ];
                        for (const cand of meshCandidates) {
                            try {
                                const mRes = await fetch(`${this.baseUrl}${cand}`);
                                if (mRes.ok) {
                                    meshBuffer = await mRes.arrayBuffer();
                                    break;
                                }
                            } catch (e) {}
                        }
                    }

                    if (!meshBuffer) {
                        console.warn('Could not load PMesh for part:', meshRel);
                        continue;
                    }

                    const pmeshData = N3PMeshParser.parse(meshBuffer);
                    if (!pmeshData || !pmeshData.positions) continue;

                    let texture = null;
                    let hasAlpha = false;
                    let rawDxtBuffer = null;
                    let decodedDxt = null;
                    let texFileName = '';

                    if (part.texPath) {
                        let texRel = part.texPath.replace(/\\/g, '/').trim();
                        texFileName = texRel.split('/').pop();

                        if (this.uploadedFilesMap && this.uploadedFilesMap.has(texFileName.toLowerCase())) {
                            const texFile = this.uploadedFilesMap.get(texFileName.toLowerCase());
                            if (texFileName.toLowerCase().endsWith('.dxt')) {
                                rawDxtBuffer = await texFile.arrayBuffer();
                                decodedDxt = DxtDecoder.decode(rawDxtBuffer);
                                texture = new THREE.CanvasTexture(decodedDxt.canvas);
                                if (decodedDxt.hasAlpha) hasAlpha = true;
                            } else {
                                const texUrl = URL.createObjectURL(texFile);
                                texture = await new Promise(resolve => new THREE.TextureLoader().load(texUrl, resolve));
                            }
                        } else {
                            const texCandidates = [
                                texRel,
                                `Object/${texFileName}`,
                                `ChrSelect/${texFileName}`,
                                `models/${texFileName}`,
                                `Item/${texFileName}`
                            ];
                            for (const cand of texCandidates) {
                                try {
                                    const tRes = await fetch(`${this.baseUrl}${cand}`);
                                    if (tRes.ok) {
                                        rawDxtBuffer = await tRes.arrayBuffer();
                                        decodedDxt = DxtDecoder.decode(rawDxtBuffer);
                                        texture = new THREE.CanvasTexture(decodedDxt.canvas);
                                        if (decodedDxt.hasAlpha) hasAlpha = true;
                                        break;
                                    }
                                } catch (e) {}
                            }
                        }

                        if (texture) {
                            texture.flipY = false;
                            texture.wrapS = THREE.RepeatWrapping;
                            texture.wrapT = THREE.RepeatWrapping;
                            if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                        }
                    }

                    const geometry = new THREE.BufferGeometry();
                    geometry.setAttribute('position', new THREE.BufferAttribute(pmeshData.positions, 3));
                    geometry.setAttribute('normal', new THREE.BufferAttribute(pmeshData.normals, 3));
                    geometry.setAttribute('uv', new THREE.BufferAttribute(pmeshData.uvs, 2));
                    if (!pmeshData.normals || pmeshData.normals.length === 0) {
                        geometry.computeVertexNormals();
                    }

                    const mat = new THREE.MeshLambertMaterial({
                        map: texture,
                        color: texture ? 0xffffff : 0xd1d5db,
                        transparent: hasAlpha,
                        alphaTest: hasAlpha ? 0.2 : 0.0,
                        depthWrite: true,
                        side: THREE.DoubleSide
                    });

                    const mesh = new THREE.Mesh(geometry, mat);
                    const pv = part.pivot || { x: 0, y: 0, z: 0 };
                    mesh.position.set(pv.x || 0, pv.y || 0, pv.z || 0);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    const baseMeshName = baseMeshFileName.replace(/\.n3pmesh$/i, '');
                    mesh.name = baseMeshName;

                    mesh.userData = {
                        isBackground: true,
                        parentShapeGroup: shapeGroup,
                        partName: baseMeshName,
                        rawMeshName: baseMeshName,
                        shapeName: shapeName,
                        texFileName: texFileName || `${baseMeshName}.dxt`,
                        originalMaterial: mat,
                        rawDxtBuffer: rawDxtBuffer,
                        decodedDxt: decodedDxt,
                        currentCanvas: decodedDxt ? decodedDxt.canvas : null,
                        pivot: pv,
                        pmeshData: pmeshData,
                        hasAlpha: hasAlpha
                    };

                    shapeGroup.add(mesh);
                    shapeGroup.userData.parts.push(mesh);
                    this.backgroundMeshes.push(mesh);
                } catch (partErr) {
                    console.warn('Failed to parse part in shape:', partErr);
                }
            }

            if (shapeGroup.children.length === 0) {
                throw new Error('No valid 3D parts could be loaded for this shape');
            }

            if (initialTransform) {
                if (initialTransform.position) shapeGroup.position.set(initialTransform.position.x || 0, initialTransform.position.y || 0, initialTransform.position.z || 0);
                if (typeof initialTransform.rotY === 'number') shapeGroup.rotation.y = (initialTransform.rotY * Math.PI) / 180;
                if (initialTransform.scale) {
                    const s = typeof initialTransform.scale === 'number' ? initialTransform.scale : (initialTransform.scale.x || 1);
                    shapeGroup.scale.set(s, s, s);
                }
            } else {
                const count = this.currentBackgroundGroup.children.length;
                if (count > 0) {
                    shapeGroup.position.x = count * 1.5;
                }
            }

            this.currentBackgroundGroup.add(shapeGroup);
            this.selectBackgroundObject(shapeGroup);
            this.updateBackgroundUI();
            this.updateTextureSwapperUI();
            this.showToast(`✨ Added "${shapeName}" to scene!`);
        } catch (err) {
            console.error('Error adding shape to background:', err);
            this.showToast(`⚠️ Failed to add object: ${err.message}`);
        } finally {
            this.hideLoading();
        }
    }

    async addStandalonePMeshToBackground(file) {
        try {
            const buffer = await file.arrayBuffer();
            const pmeshData = N3PMeshParser.parse(buffer);
            if (!pmeshData || !pmeshData.positions) {
                throw new Error('Invalid .n3pmesh data');
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(pmeshData.positions, 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(pmeshData.normals, 3));
            geometry.setAttribute('uv', new THREE.BufferAttribute(pmeshData.uvs, 2));
            if (!pmeshData.normals || pmeshData.normals.length === 0) {
                geometry.computeVertexNormals();
            }

            const baseName = file.name.replace(/\.n3pmesh$/i, '');
            let texture = null;
            let rawDxtBuffer = null;
            let decodedDxt = null;
            let hasAlpha = false;

            const possibleTexNames = [`${baseName}.dxt`, `${baseName}.png`, `${baseName}.jpg`];
            for (const tn of possibleTexNames) {
                if (this.uploadedFilesMap.has(tn.toLowerCase())) {
                    const tf = this.uploadedFilesMap.get(tn.toLowerCase());
                    if (tn.endsWith('.dxt')) {
                        rawDxtBuffer = await tf.arrayBuffer();
                        decodedDxt = DxtDecoder.decode(rawDxtBuffer);
                        texture = new THREE.CanvasTexture(decodedDxt.canvas);
                        if (decodedDxt.hasAlpha) hasAlpha = true;
                    } else {
                        const url = URL.createObjectURL(tf);
                        texture = await new Promise(res => new THREE.TextureLoader().load(url, res));
                    }
                    break;
                }
            }

            const mat = new THREE.MeshLambertMaterial({
                map: texture,
                color: texture ? 0xffffff : 0xcccccc,
                transparent: hasAlpha,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(geometry, mat);
            mesh.name = baseName;
            mesh.userData = {
                isBackground: true,
                partName: baseName,
                texFileName: `${baseName}.dxt`,
                originalMaterial: mat,
                rawDxtBuffer: rawDxtBuffer,
                decodedDxt: decodedDxt,
                currentCanvas: decodedDxt ? decodedDxt.canvas : null,
                pmeshData: pmeshData,
                hasAlpha: hasAlpha
            };

            if (!this.currentBackgroundGroup) {
                this.currentBackgroundGroup = new THREE.Group();
                this.currentBackgroundGroup.name = 'CustomBackgroundScene';
                this.scene.add(this.currentBackgroundGroup);
            }

            this.currentBackgroundGroup.add(mesh);
            this.backgroundMeshes.push(mesh);
            this.selectBackgroundObject(mesh);
            this.updateBackgroundUI();
            this.updateTextureSwapperUI();
            this.showToast(`✨ Added PMesh "${baseName}" to scene!`);
        } catch (err) {
            console.error(err);
            this.showToast(`⚠️ Failed to add PMesh: ${err.message}`);
        }
    }

    async addStandaloneObjToBackground(file) {
        try {
            const text = await file.text();
            const objData = ObjParser.parse(text);
            if (!objData || !objData.positions) {
                throw new Error('Invalid .obj data');
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(objData.positions, 3));
            geometry.setAttribute('normal', new THREE.BufferAttribute(objData.normals, 3));
            geometry.setAttribute('uv', new THREE.BufferAttribute(objData.uvs, 2));

            const baseName = file.name.replace(/\.obj$/i, '');
            const mat = new THREE.MeshLambertMaterial({
                color: 0x94a3b8,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(geometry, mat);
            mesh.name = baseName;
            mesh.userData = {
                isBackground: true,
                partName: baseName,
                texFileName: `${baseName}.png`,
                originalMaterial: mat
            };

            if (!this.currentBackgroundGroup) {
                this.currentBackgroundGroup = new THREE.Group();
                this.currentBackgroundGroup.name = 'CustomBackgroundScene';
                this.scene.add(this.currentBackgroundGroup);
            }

            this.currentBackgroundGroup.add(mesh);
            this.backgroundMeshes.push(mesh);
            this.selectBackgroundObject(mesh);
            this.updateBackgroundUI();
            this.updateTextureSwapperUI();
            this.showToast(`✨ Added 3D Model "${baseName}" to scene!`);
        } catch (err) {
            console.error(err);
            this.showToast(`⚠️ Failed to add 3D model: ${err.message}`);
        }
    }

    async handleBackgroundFileUpload(fileList) {
        if (!fileList || fileList.length === 0) return;
        const files = Array.from(fileList);

        files.forEach(f => {
            this.uploadedFilesMap.set(f.name.toLowerCase(), f);
        });

        const shapeFiles = files.filter(f => f.name.toLowerCase().endsWith('.n3shape'));
        const pmeshFiles = files.filter(f => f.name.toLowerCase().endsWith('.n3pmesh'));
        const objFiles = files.filter(f => f.name.toLowerCase().endsWith('.obj'));

        if (shapeFiles.length > 0) {
            for (const sf of shapeFiles) {
                await this.addShapeToBackground(sf);
            }
        } else if (pmeshFiles.length > 0) {
            for (const pf of pmeshFiles) {
                await this.addStandalonePMeshToBackground(pf);
            }
        } else if (objFiles.length > 0) {
            for (const ofile of objFiles) {
                await this.addStandaloneObjToBackground(ofile);
            }
        } else {
            this.showToast('⚠️ Please select at least one .n3shape, .n3pmesh, or .obj file!');
        }
    }

    async loadObjectsCatalog() {
        try {
            const res = await fetch('objects_catalog.json');
            if (res.ok) {
                this.objectsCatalog = await res.json();
            }
        } catch (e) {
            console.warn('Could not load objects_catalog.json:', e);
        }
    }

    openObjectBrowserModal() {
        const modal = document.getElementById('object-browser-modal');
        if (!modal) return;
        modal.style.display = 'flex';
        this.renderObjectBrowserGrid();
    }

    closeObjectBrowserModal() {
        const modal = document.getElementById('object-browser-modal');
        if (modal) modal.style.display = 'none';
    }

    renderObjectBrowserGrid() {
        const grid = document.getElementById('obj-browser-grid');
        const status = document.getElementById('obj-browser-status');
        if (!grid) return;
        grid.innerHTML = '';

        if (!this.objectsCatalog || this.objectsCatalog.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-sub); padding: 30px;">Loading objects catalog (889 models)...</div>';
            return;
        }

        const cat = this.currentObjBrowserCategory || 'All';
        const q = (this.currentObjBrowserSearch || '').trim().toLowerCase();

        let filtered = this.objectsCatalog.filter(item => {
            if (cat !== 'All' && item.category !== cat) return false;
            if (q) {
                const matchName = item.name.toLowerCase().includes(q);
                const matchCat = item.category.toLowerCase().includes(q);
                const matchFile = item.file.toLowerCase().includes(q);
                if (!matchName && !matchCat && !matchFile) return false;
            }
            return true;
        });

        if (status) {
            status.textContent = `Showing ${Math.min(filtered.length, 120)} of ${filtered.length} objects (${cat})`;
        }

        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-sub); padding: 30px;">No matching objects found. Try another search term or category.</div>';
            return;
        }

        const getCatIcon = (c) => {
            if (c.includes('Castle') || c.includes('Fort')) return '🏰';
            if (c.includes('Furniture') || c.includes('Throne')) return '🪑';
            if (c.includes('Nature') || c.includes('Cave')) return '🌲';
            if (c.includes('Bridge') || c.includes('Gate')) return '🌉';
            if (c.includes('Architecture') || c.includes('Building')) return '🏛️';
            if (c.includes('Prop')) return '🕯️';
            return '📦';
        };

        const itemsToRender = filtered.slice(0, 120);
        itemsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'obj-card';
            card.innerHTML = `
                <div class="obj-card-header">
                    <span class="obj-card-icon">${getCatIcon(item.category)}</span>
                    <div style="flex: 1; min-width: 0;">
                        <div class="obj-card-title" title="${item.name}">${item.name}</div>
                        <div style="font-size: 9.5px; color: var(--text-sub); font-family: monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.file}</div>
                    </div>
                </div>
                <div class="obj-card-meta">
                    <span class="obj-card-cat">${item.category}</span>
                </div>
                <button class="btn-add-obj">+ Add to Scene</button>
            `;

            card.querySelector('.btn-add-obj').addEventListener('click', (e) => {
                e.stopPropagation();
                this.addShapeToBackground(item.file, item.name);
            });

            grid.appendChild(card);
        });

        if (filtered.length > 120) {
            const moreCard = document.createElement('div');
            moreCard.style.gridColumn = '1 / -1';
            moreCard.style.textAlign = 'center';
            moreCard.style.padding = '10px';
            moreCard.innerHTML = `<span style="font-size: 11px; color: var(--text-sub);">Use the search box above to narrow down among the remaining ${filtered.length - 120} objects.</span>`;
            grid.appendChild(moreCard);
        }
    }

    handleViewportClick(e) {
        if (!this.camera || !this.backgroundMeshes || this.backgroundMeshes.length === 0) return;
        const canvas = document.getElementById('canvas3d');
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const mouse = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        const visibleBgMeshes = this.backgroundMeshes.filter(m => m.visible);
        const intersects = raycaster.intersectObjects(visibleBgMeshes, true);

        if (intersects.length > 0) {
            const hit = intersects[0].object;
            const target = hit.userData.parentShapeGroup || hit;
            this.selectBackgroundObject(target);
        }
    }

    updateTextureSwapperUI() {
        const listEl = document.getElementById('texture-swapper-list');
        if (!listEl) return;
        listEl.innerHTML = '';

        const allMeshes = [];
        this.partsMeshes.forEach(m => allMeshes.push({ mesh: m, isBg: false }));
        this.backgroundMeshes.forEach(m => allMeshes.push({ mesh: m, isBg: true }));

        if (allMeshes.length === 0) {
            listEl.innerHTML = '<div style="font-size: 12px; color: var(--text-sub);">No model or background loaded.</div>';
            return;
        }

        allMeshes.forEach(({ mesh, isBg }, idx) => {
            const item = document.createElement('div');
            item.className = 'swapper-item';

            const isPlug = mesh.userData.isPlug;
            const isCustom = !!mesh.userData.customTexture;
            const hasTex = !!(mesh.material && mesh.material.map);

            let previewSrc = '';
            if (mesh.userData.currentCanvas) {
                try { previewSrc = mesh.userData.currentCanvas.toDataURL(); } catch (e) {}
            } else if (mesh.material && mesh.material.map && mesh.material.map.image) {
                const img = mesh.material.map.image;
                if (img.toDataURL) {
                    try { previewSrc = img.toDataURL(); } catch (e) {}
                } else if (img.src) {
                    previewSrc = img.src;
                }
            }

            let badgeText = isCustom ? 'Custom Texture' : (hasTex ? 'Original Texture' : 'No Texture');
            if (isBg) badgeText = `🏰 [BG] ${badgeText}`;

            item.innerHTML = `
                <div class="swapper-info">
                    <div class="swapper-preview" style="${previewSrc ? `background-image: url('${previewSrc}');` : (hasTex ? (isBg ? 'background: #f59e0b;' : 'background: #06b6d4;') : 'background: #334155;')}"></div>
                    <div style="display: flex; flex-direction: column;">
                        <span class="swapper-name" title="${mesh.name}">${isBg ? '🏰 ' : (isPlug ? '⚔️ ' : '')}${mesh.name}</span>
                        <span style="font-size: 10px; color: ${isCustom ? 'var(--accent-cyan)' : (isBg ? 'var(--warning)' : 'var(--text-sub)')};">
                            ${badgeText}
                        </span>
                    </div>
                </div>
                <div class="swapper-actions">
                    <button class="btn-view-tex" data-idx="${idx}" title="View & Download Texture (.DXT & .PNG)">View</button>
                    <button class="btn-swap" data-idx="${idx}" title="Swap texture with custom PNG, JPG, or DXT file">Swap</button>
                    ${isCustom ? `<button class="btn-reset-tex" data-idx="${idx}" title="Reset to original texture">Reset</button>` : ''}
                </div>
            `;

            item.querySelector('.btn-view-tex').addEventListener('click', (e) => {
                e.stopPropagation();
                this.openTextureModal(mesh);
            });

            item.querySelector('.btn-swap').addEventListener('click', (e) => {
                e.stopPropagation();
                this.activeSwapperMesh = mesh;
                const fileInput = document.getElementById('swapper-file-input');
                if (fileInput) {
                    fileInput.value = '';
                    fileInput.click();
                }
            });

            const resetBtn = item.querySelector('.btn-reset-tex');
            if (resetBtn) {
                resetBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.resetTextureForMesh(mesh);
                });
            }

            listEl.appendChild(item);
        });
    }

    openTextureModal(mesh) {
        if (!mesh) return;
        const modal = document.getElementById('texture-modal');
        if (!modal) return;

        const modalTitle = document.getElementById('tex-modal-title');
        const canvasEl = document.getElementById('tex-modal-canvas');
        const filenameEl = document.getElementById('tex-modal-filename');
        const dimsEl = document.getElementById('tex-modal-dims');
        const formatEl = document.getElementById('tex-modal-format');
        const btnDxt = document.getElementById('btn-download-dxt');
        const btnPng = document.getElementById('btn-download-png');

        const cleanPartName = (mesh.userData.partName || mesh.name || 'texture').replace(/[^a-zA-Z0-9_-]/g, '_');
        const texName = mesh.userData.texFileName || `${cleanPartName}.dxt`;

        if (modalTitle) modalTitle.textContent = `Texture: ${texName}`;
        if (filenameEl) filenameEl.textContent = texName;

        // Resolve canvas image for display
        let srcCanvas = mesh.userData.currentCanvas;
        if (!srcCanvas && mesh.material && mesh.material.map && mesh.material.map.image) {
            const img = mesh.material.map.image;
            if (img instanceof HTMLCanvasElement) {
                srcCanvas = img;
            } else if (img instanceof Image || img.width) {
                const c = document.createElement('canvas');
                c.width = img.width || img.naturalWidth || 256;
                c.height = img.height || img.naturalHeight || 256;
                const ctx = c.getContext('2d');
                ctx.drawImage(img, 0, 0);
                srcCanvas = c;
            }
        }

        if (srcCanvas && canvasEl) {
            canvasEl.width = srcCanvas.width;
            canvasEl.height = srcCanvas.height;
            const ctx = canvasEl.getContext('2d');
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            ctx.drawImage(srcCanvas, 0, 0);
            if (dimsEl) dimsEl.textContent = `${srcCanvas.width} × ${srcCanvas.height} px`;
        } else if (canvasEl) {
            canvasEl.width = 256;
            canvasEl.height = 256;
            const ctx = canvasEl.getContext('2d');
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, 256, 256);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No texture loaded', 128, 128);
            if (dimsEl) dimsEl.textContent = 'N/A';
        }

        // Format detection
        let formatStr = 'Unknown';
        if (mesh.userData.decodedDxt && mesh.userData.decodedDxt.format) {
            formatStr = `DXT (${mesh.userData.decodedDxt.format})`;
        } else if (mesh.userData.rawDxtBuffer) {
            formatStr = 'DirectX DXT';
        } else if (mesh.userData.customTexture) {
            formatStr = 'Custom Bitmap';
        } else if (texName.toLowerCase().endsWith('.dxt')) {
            formatStr = 'DXT Texture';
        }
        if (formatEl) formatEl.textContent = formatStr;

        // Download DXT Button Handler
        if (btnDxt) {
            const newBtnDxt = btnDxt.cloneNode(true);
            btnDxt.parentNode.replaceChild(newBtnDxt, btnDxt);
            newBtnDxt.addEventListener('click', async () => {
                let buffer = mesh.userData.rawDxtBuffer;
                if (!buffer && mesh.userData.texUrl) {
                    try {
                        this.showToast('Downloading .DXT data...');
                        buffer = await this.fetchBuffer(mesh.userData.texUrl);
                        mesh.userData.rawDxtBuffer = buffer;
                    } catch (e) {
                        console.warn('Could not fetch DXT buffer:', e);
                    }
                }

                if (buffer) {
                    const blob = new Blob([buffer], { type: 'application/octet-stream' });
                    const downloadName = texName.toLowerCase().endsWith('.dxt') ? texName : `${texName}.dxt`;
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = downloadName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    this.showToast(`Successfully downloaded ${downloadName}`);
                } else {
                    alert('Original .DXT file is not available for this custom texture. Please download in .PNG format.');
                }
            });
        }

        // Download PNG Button Handler
        if (btnPng) {
            const newBtnPng = btnPng.cloneNode(true);
            btnPng.parentNode.replaceChild(newBtnPng, btnPng);
            newBtnPng.addEventListener('click', () => {
                if (canvasEl) {
                    const pngName = (texName.replace(/\.[^/.]+$/, '') || 'texture') + '.png';
                    canvasEl.toBlob((blob) => {
                        if (!blob) return;
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = pngName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        this.showToast(`Successfully downloaded ${pngName}`);
                    }, 'image/png');
                }
            });
        }

        modal.style.display = 'flex';
    }

    async applyTextureSwap(mesh, file) {
        if (!mesh || !file) return;

        this.showLoading(`Applying texture ${file.name}...`);
        try {
            let texture = null;
            let hasAlpha = false;

            // Save default texture backup if not exists
            if (!mesh.userData.defaultTexture) {
                mesh.userData.defaultTexture = mesh.material.map || null;
                mesh.userData.defaultTransparent = mesh.material.transparent || false;
                mesh.userData.defaultAlphaTest = mesh.material.alphaTest || 0;
                mesh.userData.defaultRawDxtBuffer = mesh.userData.rawDxtBuffer;
                mesh.userData.defaultDecodedDxt = mesh.userData.decodedDxt;
                mesh.userData.defaultCurrentCanvas = mesh.userData.currentCanvas;
                mesh.userData.defaultTexFileName = mesh.userData.texFileName;
            }

            if (file.name.toLowerCase().endsWith('.dxt')) {
                const buffer = await file.arrayBuffer();
                const decoded = DxtDecoder.decode(buffer);
                texture = new THREE.CanvasTexture(decoded.canvas);
                hasAlpha = decoded.hasAlpha;

                mesh.userData.rawDxtBuffer = buffer;
                mesh.userData.decodedDxt = decoded;
                mesh.userData.currentCanvas = decoded.canvas;
                mesh.userData.texFileName = file.name;
            } else {
                // PNG, JPG, BMP, WEBP
                const dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const img = new Image();
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = dataUrl;
                });

                texture = new THREE.Texture(img);
                texture.needsUpdate = true;

                const c = document.createElement('canvas');
                c.width = img.naturalWidth || img.width || 256;
                c.height = img.naturalHeight || img.height || 256;
                const ctx = c.getContext('2d');
                ctx.drawImage(img, 0, 0);

                mesh.userData.rawDxtBuffer = null;
                mesh.userData.decodedDxt = null;
                mesh.userData.currentCanvas = c;
                mesh.userData.texFileName = file.name;
            }

            texture.flipY = false;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            if (THREE.SRGBColorSpace) {
                texture.colorSpace = THREE.SRGBColorSpace;
            }

            mesh.userData.customTexture = texture;
            mesh.material.map = texture;
            mesh.material.transparent = hasAlpha;
            mesh.material.alphaTest = hasAlpha ? 0.2 : 0.0;
            mesh.material.needsUpdate = true;

            // Update UI list thumbnail
            this.updateTextureSwapperUI();

        } catch (err) {
            console.error('Failed to swap texture:', err);
            alert('Failed to apply texture: ' + err.message);
        } finally {
            this.hideLoading();
        }
    }

    resetTextureForMesh(mesh) {
        if (!mesh) return;
        if (mesh.userData.defaultTexture !== undefined) {
            mesh.material.map = mesh.userData.defaultTexture;
            mesh.material.transparent = mesh.userData.defaultTransparent || false;
            mesh.material.alphaTest = mesh.userData.defaultAlphaTest || 0;
            mesh.material.needsUpdate = true;
            mesh.userData.customTexture = null;

            if (mesh.userData.defaultCurrentCanvas !== undefined) {
                mesh.userData.rawDxtBuffer = mesh.userData.defaultRawDxtBuffer;
                mesh.userData.decodedDxt = mesh.userData.defaultDecodedDxt;
                mesh.userData.currentCanvas = mesh.userData.defaultCurrentCanvas;
                mesh.userData.texFileName = mesh.userData.defaultTexFileName;
            }

            this.updateTextureSwapperUI();
        }
    }

    resetAllTextures() {
        this.partsMeshes.forEach(m => {
            if (m.userData.customTexture) {
                this.resetTextureForMesh(m);
            }
        });
        this.backgroundMeshes.forEach(m => {
            if (m.userData.customTexture) {
                this.resetTextureForMesh(m);
            }
        });
        this.showToast('All textures reset to original');
    }

    findWristJoint(slot) {
        if (!this.skeletonData || !this.skeletonData.flatJoints) return -1;
        const flatJoints = this.skeletonData.flatJoints;

        const isRight = slot === 'right';
        const primaryPatterns = isRight
            ? [/right.*wrist/i, /r_wrist/i, /r.*wrist/i, /right.*hand/i, /r_hand/i, /r.*hand/i]
            : [/left.*wrist/i, /l_wrist/i, /l.*wrist/i, /left.*hand/i, /l_hand/i, /l.*hand/i];

        // 1. Try exact matching primary patterns
        for (const pattern of primaryPatterns) {
            for (let i = 0; i < flatJoints.length; i++) {
                const jName = (flatJoints[i].name || '').toLowerCase();
                if (pattern.test(jName)) {
                    return i;
                }
            }
        }

        // 2. Secondary fallback: search for 'wrist' or 'hand' and check joint index position or name
        for (let i = 0; i < flatJoints.length; i++) {
            const jName = (flatJoints[i].name || '').toLowerCase();
            if (isRight && (jName.includes('wrist') || jName.includes('hand')) && !jName.includes('left') && !jName.includes('l_')) {
                return i;
            }
            if (!isRight && (jName.includes('wrist') || jName.includes('hand')) && (jName.includes('left') || jName.includes('l_'))) {
                return i;
            }
        }

        // 3. Fallback: if character has at least 15 joints, return a typical arm bone index
        if (flatJoints.length > 20) {
            return isRight ? Math.floor(flatJoints.length * 0.45) : Math.floor(flatJoints.length * 0.55);
        }

        return 0;
    }

    async equipWeapon(weaponFilename, slot = 'right') {
        this.showLoading(`Equipping ${weaponFilename}...`);
        try {
            this.unequipWeapon(slot);
            const jointIndex = this.findWristJoint(slot);

            let mesh = null;
            let cleanName = weaponFilename;

            // Check if weapon is from Item/ or .n3cplug
            const isPlug = weaponFilename.toLowerCase().endsWith('.n3cplug') || weaponFilename.startsWith('Item/');

            if (isPlug) {
                const plugPath = this.resolveItemRelPath(weaponFilename);
                const plugUrl = `${this.baseUrl}${plugPath}`;
                const plugBuffer = await this.fetchBuffer(plugUrl);
                const plugData = N3CPlugParser.parse(plugBuffer);

                let meshFileName = plugData.meshPath;
                let texFileName = plugData.texPath;

                // Fallback from catalog if not in plug binary
                if (!meshFileName && this.allModels) {
                    const catItem = this.allModels.find(m => m.file === weaponFilename || m.plugFile === weaponFilename);
                    if (catItem) {
                        meshFileName = catItem.meshFile;
                        texFileName = catItem.texFile;
                        cleanName = catItem.name || cleanName;
                    }
                }

                if (!meshFileName) {
                    throw new Error(`Mesh file for ${weaponFilename} not found.`);
                }

                const meshPath = this.resolveItemRelPath(meshFileName);
                const meshBuffer = await this.fetchBuffer(`${this.baseUrl}${meshPath}`);

                let meshData = null;
                if (meshFileName.toLowerCase().endsWith('.n3pmesh')) {
                    meshData = N3PMeshParser.parse(meshBuffer);
                } else {
                    meshData = N3SkinParser.parse(meshBuffer);
                }

                if (!meshData || !meshData.positions) {
                    throw new Error('Weapon geometry is empty or failed to load.');
                }

                let texture = null;
                let hasAlpha = false;
                if (texFileName) {
                    try {
                        const texPath = this.resolveItemRelPath(texFileName);
                        const texBuffer = await this.fetchBuffer(`${this.baseUrl}${texPath}`);
                        const decodedDxt = DxtDecoder.decode(texBuffer);
                        texture = new THREE.CanvasTexture(decodedDxt.canvas);
                        texture.flipY = false;
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                        hasAlpha = decodedDxt.hasAlpha;
                    } catch (e) {}
                }

                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(meshData.positions, 3));
                geometry.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
                geometry.setAttribute('uv', new THREE.BufferAttribute(meshData.uvs, 2));
                if (!meshData.normals || meshData.normals.length === 0) {
                    geometry.computeVertexNormals();
                }

                const matTextured = new THREE.MeshLambertMaterial({
                    map: texture,
                    color: texture ? 0xffffff : 0xd1d5db,
                    transparent: hasAlpha,
                    alphaTest: hasAlpha ? 0.2 : 0.0,
                    depthWrite: true,
                    side: THREE.DoubleSide
                });

                cleanName = cleanName.replace(/^Item\//i, '').replace(/\.n3cplug$/i, '');
                mesh = new THREE.Mesh(geometry, matTextured);
                mesh.name = `[${slot === 'right' ? 'R-Hand' : 'L-Hand'}] ${cleanName}`;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.userData = {
                    originalMaterial: matTextured,
                    isPlug: true,
                    equipSlot: slot,
                    weaponName: cleanName,
                    texPath: texFileName
                };
            } else {
                // .n3chr weapon
                const chrUrl = `${this.baseUrl}Chr/${weaponFilename}`;
                const chrBuffer = await (await fetch(chrUrl)).arrayBuffer();
                const chrData = N3ChrParser.parse(chrBuffer);

                cleanName = weaponFilename.replace(/\.n3chr$/i, '');

                for (let i = 0; i < chrData.parts.length; i++) {
                    const partRelPath = chrData.parts[i];
                    const partUrl = `${this.baseUrl}${partRelPath}`;
                    const partBuffer = await (await fetch(partUrl)).arrayBuffer();
                    const partData = N3CPartParser.parse(partBuffer);

                    let meshData = null;
                    if (partData.skinPath) {
                        const skinBuffer = await (await fetch(`${this.baseUrl}${partData.skinPath}`)).arrayBuffer();
                        meshData = N3SkinParser.parse(skinBuffer);
                    }

                    if (meshData) {
                        let texture = null;
                        let hasAlpha = false;
                        if (partData.texPath) {
                            try {
                                const texBuffer = await (await fetch(`${this.baseUrl}${partData.texPath}`)).arrayBuffer();
                                const decodedDxt = DxtDecoder.decode(texBuffer);
                                texture = new THREE.CanvasTexture(decodedDxt.canvas);
                                texture.flipY = false;
                                texture.wrapS = THREE.RepeatWrapping;
                                texture.wrapT = THREE.RepeatWrapping;
                                if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                                hasAlpha = decodedDxt.hasAlpha;
                            } catch (e) {}
                        }

                        const geometry = new THREE.BufferGeometry();
                        geometry.setAttribute('position', new THREE.BufferAttribute(meshData.positions, 3));
                        geometry.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
                        if (!meshData.normals || meshData.normals.length === 0) {
                            geometry.computeVertexNormals();
                        }

                        const matTextured = new THREE.MeshLambertMaterial({
                            map: texture,
                            color: texture ? 0xffffff : 0xd1d5db,
                            transparent: hasAlpha,
                            alphaTest: hasAlpha ? 0.2 : 0.0,
                            depthWrite: true,
                            side: THREE.DoubleSide
                        });

                        mesh = new THREE.Mesh(geometry, matTextured);
                        mesh.name = `[${slot === 'right' ? 'R-Hand' : 'L-Hand'}] ${cleanName}`;
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        mesh.userData = {
                            originalMaterial: matTextured,
                            isPlug: true,
                            equipSlot: slot,
                            weaponName: cleanName,
                            texPath: partData.texPath
                        };
                        break;
                    }
                }
            }

            if (!mesh) {
                throw new Error(`Could not build geometry for weapon ${cleanName}.`);
            }

            // Compute socket matrix based on orientation state
            const rot = this.weaponOrientation[slot];
            const euler = new THREE.Euler(rot.rotX, rot.rotY, rot.rotZ, 'YXZ');
            const localMtx = new THREE.Matrix4().makeRotationFromEuler(euler);

            mesh.matrixAutoUpdate = false;
            mesh.matrix.copy(localMtx);

            if (this.currentModelGroup) {
                this.currentModelGroup.add(mesh);
            } else {
                this.scene.add(mesh);
            }
            this.partsMeshes.push(mesh);

            // Attach to skeletal joint if available
            if (jointIndex >= 0 && this.skeletonData && this.skeletonData.flatJoints) {
                this.plugAttachments.push({
                    mesh,
                    jointIndex,
                    localMatrix: localMtx,
                    equipSlot: slot
                });
                this.applyPlugTransforms();
            }

            this.equippedWeapons[slot] = mesh;

            // Update UI status
            const nameEl = document.getElementById(slot === 'right' ? 'eq-right-name' : 'eq-left-name');
            if (nameEl) nameEl.textContent = cleanName;
            const badge = document.getElementById('weapon-status-badge');
            if (badge) {
                badge.textContent = `Equipped (${slot})`;
                badge.style.background = 'rgba(16, 185, 129, 0.2)';
                badge.style.color = 'var(--success)';
            }

            this.updateTextureSwapperUI();
            this.showToast(`Equipped ${cleanName} to ${slot === 'right' ? 'Right Hand' : 'Left Hand'}!`);
        } catch (err) {
            console.error('Failed to equip weapon:', err);
            alert('Failed to equip weapon: ' + err.message);
        } finally {
            this.hideLoading();
        }
    }

    async equipCustomWeapon(file, slot = 'right') {
        if (!file) return;
        const name = file.name;
        const lower = name.toLowerCase();

        this.showLoading(`Uploading weapon ${name}...`);
        try {
            this.unequipWeapon(slot);
            const jointIndex = this.findWristJoint(slot);

            let geometry = null;
            let material = null;
            let cleanName = name;

            if (lower.endsWith('.obj')) {
                const text = await file.text();
                const objData = ObjParser.parse(text);
                geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(objData.positions, 3));
                geometry.setAttribute('normal', new THREE.BufferAttribute(objData.normals, 3));
                geometry.setAttribute('uv', new THREE.BufferAttribute(objData.uvs, 2));
                geometry.computeVertexNormals();

                material = new THREE.MeshStandardMaterial({
                    color: 0xcccccc,
                    roughness: 0.4,
                    metalness: 0.2,
                    side: THREE.DoubleSide
                });
                cleanName = objData.name || name.replace(/\.obj$/i, '');
            } else if (lower.endsWith('.n3cplug')) {
                const buffer = await file.arrayBuffer();
                const plugData = N3CPlugParser.parse(buffer);
                if (plugData.meshPath) {
                    const meshBuffer = await (await fetch(`${this.baseUrl}${plugData.meshPath}`)).arrayBuffer();
                    let meshData = plugData.meshPath.toLowerCase().endsWith('.n3pmesh') 
                        ? N3PMeshParser.parse(meshBuffer) 
                        : N3SkinParser.parse(meshBuffer);
                    
                    let texture = null;
                    if (plugData.texPath) {
                        try {
                            const texBuffer = await (await fetch(`${this.baseUrl}${plugData.texPath}`)).arrayBuffer();
                            const decoded = DxtDecoder.decode(texBuffer);
                            texture = new THREE.CanvasTexture(decoded.canvas);
                            texture.flipY = false;
                            if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
                        } catch (e) {}
                    }
                    geometry = new THREE.BufferGeometry();
                    geometry.setAttribute('position', new THREE.BufferAttribute(meshData.positions, 3));
                    geometry.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
                    geometry.setAttribute('uv', new THREE.BufferAttribute(meshData.uvs, 2));
                    if (!meshData.normals || meshData.normals.length === 0) {
                        geometry.computeVertexNormals();
                    }
                    material = new THREE.MeshLambertMaterial({
                        map: texture,
                        color: texture ? 0xffffff : 0xcccccc,
                        side: THREE.DoubleSide
                    });
                }
            } else if (lower.endsWith('.n3chr')) {
                return this.equipWeapon(name, slot);
            }

            if (!geometry) {
                throw new Error('Could not read weapon geometry from this file.');
            }

            const weaponMesh = new THREE.Mesh(geometry, material);
            weaponMesh.name = `[${slot === 'right' ? 'R-Hand' : 'L-Hand'}] ${cleanName}`;
            weaponMesh.castShadow = true;
            weaponMesh.receiveShadow = true;

            const rot = this.weaponOrientation[slot];
            const euler = new THREE.Euler(rot.rotX, rot.rotY, rot.rotZ, 'YXZ');
            const localMtx = new THREE.Matrix4().makeRotationFromEuler(euler);
            weaponMesh.matrixAutoUpdate = false;
            weaponMesh.matrix.copy(localMtx);

            weaponMesh.userData = {
                originalMaterial: material,
                isPlug: true,
                equipSlot: slot,
                weaponName: cleanName
            };

            if (this.currentModelGroup) {
                this.currentModelGroup.add(weaponMesh);
            } else {
                this.scene.add(weaponMesh);
            }
            this.partsMeshes.push(weaponMesh);

            if (jointIndex >= 0 && this.skeletonData && this.skeletonData.flatJoints) {
                this.plugAttachments.push({
                    mesh: weaponMesh,
                    jointIndex,
                    localMatrix: localMtx,
                    equipSlot: slot
                });
                this.applyPlugTransforms();
            }

            this.equippedWeapons[slot] = weaponMesh;

            const nameEl = document.getElementById(slot === 'right' ? 'eq-right-name' : 'eq-left-name');
            if (nameEl) nameEl.textContent = cleanName;
            const badge = document.getElementById('weapon-status-badge');
            if (badge) {
                badge.textContent = `Equipped (${slot})`;
                badge.style.background = 'rgba(16, 185, 129, 0.2)';
                badge.style.color = 'var(--success)';
            }

            this.updateTextureSwapperUI();
        } catch (err) {
            console.error('Failed to equip custom weapon:', err);
            alert('Failed to equip custom weapon: ' + err.message);
        } finally {
            this.hideLoading();
        }
    }

    unequipWeapon(slot) {
        const existing = this.equippedWeapons[slot];
        if (existing) {
            if (this.currentModelGroup) {
                this.currentModelGroup.remove(existing);
            } else {
                this.scene.remove(existing);
            }
            this.partsMeshes = this.partsMeshes.filter(m => m !== existing);
            this.plugAttachments = this.plugAttachments.filter(att => att.mesh !== existing);
            this.equippedWeapons[slot] = null;
        }

        const nameEl = document.getElementById(slot === 'right' ? 'eq-right-name' : 'eq-left-name');
        if (nameEl) nameEl.textContent = 'None';
        const badge = document.getElementById('weapon-status-badge');
        if (badge) {
            badge.textContent = 'Slot Ready';
            badge.style.background = 'rgba(6, 182, 212, 0.15)';
            badge.style.color = 'var(--accent-cyan)';
        }

        this.updateTextureSwapperUI();
    }
}

// Boot application
window.addEventListener('DOMContentLoaded', () => {
    window.koViewer = new App3D();
});
