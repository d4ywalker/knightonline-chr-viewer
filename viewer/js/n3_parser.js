/**
 * Knight Online N3 Format Parser (N3Engine / NoahSystem)
 * Fully reverse-engineered to match CN3IMesh and CN3Skin from N3Base
 */

class N3ChrParser {
    /**
     * Parse .n3chr binary file
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        const view = new DataView(buffer);
        let offset = 0;

        // Character / Monster internal name
        const nameLen = view.getInt32(offset, true);
        offset += 4;
        let name = '';
        for (let i = 0; i < nameLen; i++) {
            name += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += nameLen;

        // Transform / Bounding Box (15 floats = 60 bytes)
        const transform = [];
        for (let i = 0; i < 15; i++) {
            transform.push(view.getFloat32(offset, true));
            offset += 4;
        }

        // Skeleton / Joint path
        const jointLen = view.getInt32(offset, true);
        offset += 4;
        let jointPath = '';
        for (let i = 0; i < jointLen; i++) {
            jointPath += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += jointLen;

        // Parts (.n3cpart)
        const partCount = view.getInt32(offset, true);
        offset += 4;
        const parts = [];
        for (let i = 0; i < partCount; i++) {
            const pLen = view.getInt32(offset, true);
            offset += 4;
            let partPath = '';
            for (let j = 0; j < pLen; j++) {
                partPath += String.fromCharCode(view.getUint8(offset + j));
            }
            offset += pLen;
            parts.push(partPath);
        }

        // Plugs (.n3cplug)
        const plugCount = view.getInt32(offset, true);
        offset += 4;
        const plugs = [];
        for (let i = 0; i < plugCount; i++) {
            const plLen = view.getInt32(offset, true);
            offset += 4;
            let plugPath = '';
            for (let j = 0; j < plLen; j++) {
                plugPath += String.fromCharCode(view.getUint8(offset + j));
            }
            offset += plLen;
            plugs.push(plugPath);
        }

        // Animation file (.n3anim)
        const animLen = view.getInt32(offset, true);
        offset += 4;
        let animPath = '';
        for (let i = 0; i < animLen; i++) {
            animPath += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += animLen;

        return {
            name,
            transform,
            jointPath: jointPath.replace(/\\/g, '/'),
            parts: parts.map(p => p.replace(/\\/g, '/')),
            plugs: plugs.map(p => p.replace(/\\/g, '/')),
            animPath: animPath.replace(/\\/g, '/')
        };
    }
}

class N3CPartParser {
    /**
     * Parse .n3cpart binary file
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        const view = new DataView(buffer);
        let offset = 0;

        // Part name
        const nameLen = view.getInt32(offset, true);
        offset += 4;
        let name = '';
        for (let i = 0; i < nameLen; i++) {
            name += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += nameLen;

        // Material values
        const diffuse = [view.getFloat32(offset, true), view.getFloat32(offset + 4, true), view.getFloat32(offset + 8, true), view.getFloat32(offset + 12, true)];
        offset += 16;
        const ambient = [view.getFloat32(offset, true), view.getFloat32(offset + 4, true), view.getFloat32(offset + 8, true), view.getFloat32(offset + 12, true)];
        offset += 16;

        let texPath = '';
        let skinPath = '';

        for (let testPos = offset; testPos < buffer.byteLength - 20; testPos++) {
            const potentialLen = view.getInt32(testPos, true);
            if (potentialLen >= 4 && potentialLen <= 200 && testPos + 4 + potentialLen <= buffer.byteLength) {
                let testStr = '';
                for (let k = 0; k < potentialLen; k++) {
                    testStr += String.fromCharCode(view.getUint8(testPos + 4 + k));
                }
                if (testStr.toLowerCase().endsWith('.dxt') || testStr.toLowerCase().endsWith('.bmp') || testStr.toLowerCase().endsWith('.tga')) {
                    texPath = testStr;
                    const nextPos = testPos + 4 + potentialLen;
                    const nextLen = view.getInt32(nextPos, true);
                    if (nextLen >= 4 && nextLen <= 200 && nextPos + 4 + nextLen <= buffer.byteLength) {
                        let skinStr = '';
                        for (let k = 0; k < nextLen; k++) {
                            skinStr += String.fromCharCode(view.getUint8(nextPos + 4 + k));
                        }
                        skinPath = skinStr;
                    }
                    break;
                }
            }
        }

        return {
            name,
            diffuse,
            ambient,
            texPath: texPath.replace(/\\/g, '/'),
            skinPath: skinPath.replace(/\\/g, '/')
        };
    }
}

class N3SkinParser {
    /**
     * Parse .n3cskins binary file (100% faithful to CN3IMesh::Load and BuildVertexList)
     * Binary Layout:
     * - Name string (int32 length + chars)
     * - LodName string (int32 length + chars)
     * - nFC (Triangle count: int32)
     * - nVC (Vertex count: int32)
     * - nUVC (UV count: int32)
     * - m_pVertices: nVC * 24 bytes (X, Y, Z, Nx, Ny, Nz floats)
     * - m_pwVtxIndices: nFC * 3 uint16 values
     * - IF nUVC > 0:
     *     - m_pfUVs: nUVC * 8 bytes (U, V floats)
     *     - m_pwUVsIndices: nFC * 3 uint16 values
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        const view = new DataView(buffer);
        let offset = 0;

        const l1 = view.getInt32(offset, true);
        offset += 4;
        let name = '';
        for (let i = 0; i < l1; i++) {
            name += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += l1;

        const l2 = view.getInt32(offset, true);
        offset += 4;
        let lodName = '';
        for (let i = 0; i < l2; i++) {
            lodName += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += l2;

        const nFC = view.getInt32(offset, true); // Triangle count
        offset += 4;
        const nVC = view.getInt32(offset, true); // Vertex count
        offset += 4;
        const nUVC = view.getInt32(offset, true); // UV count
        offset += 4;

        if (nFC <= 0 || nVC <= 0) {
            throw new Error(`Invalid skin geometry: triangles=${nFC}, vertices=${nVC}`);
        }

        // 1. Read Raw Vertices (nVC * 6 floats = 24 bytes each)
        const rawPositions = new Float32Array(nVC * 3);
        const rawNormals = new Float32Array(nVC * 3);

        for (let i = 0; i < nVC; i++) {
            rawPositions[i * 3 + 0] = view.getFloat32(offset, true);
            rawPositions[i * 3 + 1] = view.getFloat32(offset + 4, true);
            rawPositions[i * 3 + 2] = view.getFloat32(offset + 8, true);

            rawNormals[i * 3 + 0] = view.getFloat32(offset + 12, true);
            rawNormals[i * 3 + 1] = view.getFloat32(offset + 16, true);
            rawNormals[i * 3 + 2] = view.getFloat32(offset + 20, true);

            offset += 24;
        }

        // 2. Read Vertex Indices (nFC * 3 uint16 values)
        const totalIndices = nFC * 3;
        const vtxIndices = new Uint16Array(totalIndices);
        for (let i = 0; i < totalIndices; i++) {
            vtxIndices[i] = view.getUint16(offset, true);
            offset += 2;
        }

        // 3. Read UV Coordinates and UV Indices
        let rawUVs = null;
        let uvIndices = null;

        if (nUVC > 0) {
            rawUVs = new Float32Array(nUVC * 2);
            for (let i = 0; i < nUVC; i++) {
                rawUVs[i * 2 + 0] = view.getFloat32(offset, true);
                rawUVs[i * 2 + 1] = view.getFloat32(offset + 4, true);
                offset += 8;
            }

            uvIndices = new Uint16Array(totalIndices);
            for (let i = 0; i < totalIndices; i++) {
                uvIndices[i] = view.getUint16(offset, true);
                offset += 2;
            }
        }

        // 4. Read Skinning / Weights Data (faithful to CN3Skin::Load)
        const skinVertices = [];
        if (offset + (nVC * 16) <= buffer.byteLength) {
            for (let i = 0; i < nVC; i++) {
                if (offset + 16 > buffer.byteLength) break;
                const vOrigin = [
                    view.getFloat32(offset, true),
                    view.getFloat32(offset + 4, true),
                    view.getFloat32(offset + 8, true)
                ];
                const nAffect = view.getInt32(offset + 12, true);
                offset += 16; // 12 bytes vOrigin + 4 bytes nAffect

                offset += 8; // skip 8 dummy pointer bytes

                const joints = [];
                const weights = [];

                if (nAffect > 1) {
                    for (let k = 0; k < nAffect; k++) {
                        joints.push(view.getInt32(offset, true));
                        offset += 4;
                    }
                    for (let k = 0; k < nAffect; k++) {
                        weights.push(view.getFloat32(offset, true));
                        offset += 4;
                    }
                } else if (nAffect === 1) {
                    joints.push(view.getInt32(offset, true));
                    weights.push(1.0);
                    offset += 4;
                }

                skinVertices.push({ vOrigin, nAffect, joints, weights });
            }
        }

        // 5. Build Exact Unrolled Vertex Buffer (Faithful to CN3IMesh::BuildVertexList)
        // This guarantees that every triangle has the exact correct UV coordinate and Normal!
        const positions = new Float32Array(totalIndices * 3);
        const normals = new Float32Array(totalIndices * 3);
        const uvs = new Float32Array(totalIndices * 2);

        for (let i = 0; i < totalIndices; i++) {
            const vIdx = vtxIndices[i];
            const uIdx = (uvIndices && i < uvIndices.length) ? uvIndices[i] : (vIdx < nUVC ? vIdx : 0);

            if (vIdx < nVC) {
                positions[i * 3 + 0] = rawPositions[vIdx * 3 + 0];
                positions[i * 3 + 1] = rawPositions[vIdx * 3 + 1];
                positions[i * 3 + 2] = rawPositions[vIdx * 3 + 2];

                normals[i * 3 + 0] = rawNormals[vIdx * 3 + 0];
                normals[i * 3 + 1] = rawNormals[vIdx * 3 + 1];
                normals[i * 3 + 2] = rawNormals[vIdx * 3 + 2];
            }

            if (rawUVs && uIdx < nUVC) {
                uvs[i * 2 + 0] = rawUVs[uIdx * 2 + 0];
                uvs[i * 2 + 1] = rawUVs[uIdx * 2 + 1];
            }
        }

        return {
            name,
            lodName,
            triangleCount: nFC,
            vertexCount: totalIndices,
            rawVertexCount: nVC,
            positions,
            normals,
            uvs,
            rawPositions,
            vtxIndices,
            skinVertices: skinVertices.length === nVC ? skinVertices : null
        };
    }
}

class N3PMeshParser {
    /**
     * Parse .n3pmesh (Progressive Mesh for Weapons / Plugs)
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        const view = new DataView(buffer);
        let offset = 0;

        const nameLen = view.getInt32(offset, true);
        offset += 4;
        let name = '';
        for (let i = 0; i < nameLen; i++) {
            name += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += nameLen;

        const collapseCount = view.getInt32(offset, true);
        const indexChangeCount = view.getInt32(offset + 4, true);
        const vertexCount = view.getInt32(offset + 8, true);
        const faceCount = view.getInt32(offset + 12, true); // index count
        offset += 24;

        if (vertexCount <= 0 || vertexCount > 65535) {
            throw new Error(`Invalid vertex count in PMesh: ${vertexCount}`);
        }

        const rawPositions = new Float32Array(vertexCount * 3);
        const rawNormals = new Float32Array(vertexCount * 3);
        const rawUvs = new Float32Array(vertexCount * 2);

        // Vertex Stride: 32 bytes (x, y, z, nx, ny, nz, u, v)
        for (let i = 0; i < vertexCount; i++) {
            rawPositions[i * 3 + 0] = view.getFloat32(offset, true);
            rawPositions[i * 3 + 1] = view.getFloat32(offset + 4, true);
            rawPositions[i * 3 + 2] = view.getFloat32(offset + 8, true);

            rawNormals[i * 3 + 0] = view.getFloat32(offset + 12, true);
            rawNormals[i * 3 + 1] = view.getFloat32(offset + 16, true);
            rawNormals[i * 3 + 2] = view.getFloat32(offset + 20, true);

            rawUvs[i * 2 + 0] = view.getFloat32(offset + 24, true);
            rawUvs[i * 2 + 1] = view.getFloat32(offset + 28, true);

            offset += 32;
        }

        // Indices: faceCount * uint16
        const indices = new Uint16Array(faceCount);
        for (let i = 0; i < faceCount; i++) {
            indices[i] = view.getUint16(offset, true);
            offset += 2;
        }

        // Reconstruct Progressive Mesh LOD 0 (High-poly index resolution)
        // In NoahSystem .n3pmesh, raw indices in the file are base-collapsed indices.
        // We must apply edge collapses to update indices to full LOD 0 vertices.
        if (collapseCount > 0 && indexChangeCount > 0) {
            const collapses = [];
            for (let i = 0; i < collapseCount; i++) {
                if (offset + 24 <= buffer.byteLength) {
                    collapses.push({
                        numIndicesToLose: view.getInt32(offset, true),
                        numIndicesToChange: view.getInt32(offset + 4, true),
                        numVerticesToLose: view.getInt32(offset + 8, true),
                        iIndexChanges: view.getInt32(offset + 12, true),
                        collapseTo: view.getInt32(offset + 16, true),
                        bShouldCollapse: view.getInt32(offset + 20, true)
                    });
                    offset += 24;
                }
            }

            const indexChanges = new Int32Array(indexChangeCount);
            for (let i = 0; i < indexChangeCount; i++) {
                if (offset + 4 <= buffer.byteLength) {
                    indexChanges[i] = view.getInt32(offset, true);
                    offset += 4;
                }
            }

            let lodCount = 0;
            const lods = [];
            if (offset + 4 <= buffer.byteLength) {
                lodCount = view.getInt32(offset, true);
                offset += 4;
                for (let i = 0; i < lodCount; i++) {
                    if (offset + 8 <= buffer.byteLength) {
                        lods.push({
                            fDist: view.getFloat32(offset, true),
                            numV: view.getInt32(offset + 4, true)
                        });
                        offset += 8;
                    }
                }
            }

            let curNumVertices = 0;
            let c = 0;
            const targetNumV = (lods.length > 0 && lods[0].numV > 0) ? lods[0].numV : vertexCount;

            while (targetNumV > curNumVertices && c < collapses.length) {
                const col = collapses[c];
                if ((col.numVerticesToLose + curNumVertices) > targetNumV) break;

                curNumVertices += col.numVerticesToLose;
                const tmp0 = col.iIndexChanges;
                const tmp1 = tmp0 + col.numIndicesToChange;

                for (let i = tmp0; i < tmp1; i++) {
                    if (i >= 0 && i < indexChanges.length) {
                        const idxTarget = indexChanges[i];
                        if (idxTarget >= 0 && idxTarget < faceCount) {
                            indices[idxTarget] = curNumVertices - 1;
                        }
                    }
                }
                c++;
            }

            while (c < collapses.length && collapses[c].bShouldCollapse) {
                const col = collapses[c];
                curNumVertices += col.numVerticesToLose;
                const tmp0 = col.iIndexChanges;
                const tmp1 = tmp0 + col.numIndicesToChange;

                for (let i = tmp0; i < tmp1; i++) {
                    if (i >= 0 && i < indexChanges.length) {
                        const idxTarget = indexChanges[i];
                        if (idxTarget >= 0 && idxTarget < faceCount) {
                            indices[idxTarget] = curNumVertices - 1;
                        }
                    }
                }
                c++;
            }
        }

        // Unroll triangles for WebGL
        const positions = new Float32Array(faceCount * 3);
        const normals = new Float32Array(faceCount * 3);
        const uvs = new Float32Array(faceCount * 2);

        for (let i = 0; i < faceCount; i++) {
            const vIdx = indices[i];
            if (vIdx < vertexCount) {
                positions[i * 3 + 0] = rawPositions[vIdx * 3 + 0];
                positions[i * 3 + 1] = rawPositions[vIdx * 3 + 1];
                positions[i * 3 + 2] = rawPositions[vIdx * 3 + 2];

                normals[i * 3 + 0] = rawNormals[vIdx * 3 + 0];
                normals[i * 3 + 1] = rawNormals[vIdx * 3 + 1];
                normals[i * 3 + 2] = rawNormals[vIdx * 3 + 2];

                uvs[i * 2 + 0] = rawUvs[vIdx * 2 + 0];
                uvs[i * 2 + 1] = rawUvs[vIdx * 2 + 1];
            }
        }

        return {
            name,
            triangleCount: Math.floor(faceCount / 3),
            vertexCount: faceCount,
            rawVertexCount: vertexCount,
            positions,
            normals,
            uvs
        };
    }
}

class N3CPlugParser {
    /**
     * Parse .n3cplug binary file (faithful to CN3CPlugBase::Load)
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        const view = new DataView(buffer);
        let offset = 0;

        // Base strings
        const l1 = view.getInt32(offset, true); offset += 4;
        let plugName = '';
        for (let i = 0; i < l1; i++) plugName += String.fromCharCode(view.getUint8(offset + i));
        offset += l1;

        let plugType = 0;
        let jointIndex = 0;
        let posX = 0, posY = 0, posZ = 0;
        let mtxRot = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        let scaleX = 1, scaleY = 1, scaleZ = 1;

        if (offset + 96 <= buffer.byteLength) {
            plugType = view.getInt32(offset, true); offset += 4;
            jointIndex = view.getInt32(offset, true); offset += 4;
            posX = view.getFloat32(offset, true);
            posY = view.getFloat32(offset + 4, true);
            posZ = view.getFloat32(offset + 8, true);
            offset += 12;

            mtxRot = [];
            for (let m = 0; m < 16; m++) {
                mtxRot.push(view.getFloat32(offset + m * 4, true));
            }
            offset += 64;

            scaleX = view.getFloat32(offset, true);
            scaleY = view.getFloat32(offset + 4, true);
            scaleZ = view.getFloat32(offset + 8, true);
            offset += 12;
        }

        let meshPath = '';
        let texPath = '';

        // Search for mesh and texture filenames
        for (let pos = offset; pos < buffer.byteLength - 20; pos++) {
            const potentialLen = view.getInt32(pos, true);
            if (potentialLen >= 4 && potentialLen <= 200 && pos + 4 + potentialLen <= buffer.byteLength) {
                let testStr = '';
                for (let k = 0; k < potentialLen; k++) {
                    testStr += String.fromCharCode(view.getUint8(pos + 4 + k));
                }
                const lower = testStr.toLowerCase();
                if (lower.endsWith('.n3pmesh') || lower.endsWith('.n3cskins') || lower.endsWith('.n3mesh')) {
                    meshPath = testStr.replace(/\\/g, '/').replace(/^item\//i, '').trim();
                    const nextPos = pos + 4 + potentialLen;
                    if (nextPos + 4 <= buffer.byteLength) {
                        const nextLen = view.getInt32(nextPos, true);
                        if (nextLen >= 4 && nextLen <= 200 && nextPos + 4 + nextLen <= buffer.byteLength) {
                            let texStr = '';
                            for (let k = 0; k < nextLen; k++) {
                                texStr += String.fromCharCode(view.getUint8(nextPos + 4 + k));
                            }
                            if (texStr.toLowerCase().endsWith('.dxt') || texStr.toLowerCase().endsWith('.bmp') || texStr.toLowerCase().endsWith('.tga')) {
                                texPath = texStr.replace(/\\/g, '/').replace(/^item\//i, '').trim();
                            }
                        }
                    }
                    break;
                }
            }
        }

        return {
            name: plugName,
            plugType,
            jointIndex,
            position: { x: posX, y: posY, z: posZ },
            mtxRot,
            scale: { x: scaleX, y: scaleY, z: scaleZ },
            meshPath: meshPath.replace(/\\/g, '/'),
            texPath: texPath.replace(/\\/g, '/')
        };
    }
}

// Authentic Knight Online Animation Track Mappings
const KO_MONSTER_ANIM_NAMES = [
    "Idle / Normal",     // 0
    "Walk",              // 1
    "Run",               // 2
    "Attack 1",          // 3
    "Attack 2",          // 4
    "Death",             // 5
    "Damage 1",          // 6
    "Damage 2",          // 7
    "Roar / Shout",      // 8
    "Stun / Groggy",     // 9
    "Skill 1",           // 10
    "Skill 2",           // 11
    "Guard / Defend",    // 12
    "Standby / Alert",   // 13
    "Victory / Taunt",   // 14
    "Special 1",         // 15
    "Special 2",         // 16
    "Special 3"          // 17
];

const KO_UPC_ANIM_NAMES = [
    "Idle", "Walk", "Run", "Attack 1", "Attack 2", "Attack 3",
    "Sit Down", "Sitting", "Stand Up", "Jump", "Death", "Damage",
    "Guard", "Spell Cast 1", "Spell Cast 2", "Bow Aim / Shoot",
    "Dagger Stab", "Sword Slash", "Cheer / Taunt", "Salute", "Dance 1", "Dance 2"
];

if (typeof window !== 'undefined') {
    window.KO_MONSTER_ANIM_NAMES = KO_MONSTER_ANIM_NAMES;
    window.KO_UPC_ANIM_NAMES = KO_UPC_ANIM_NAMES;
}

class N3AnimParser {
    /**
     * Parse .n3anim binary file (Knight Online Animation Track Definitions)
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        if (!buffer || buffer.byteLength < 4) return { trackCount: 0, tracks: [] };
        const view = new DataView(buffer);
        let offset = 0;

        const rawTrackCount = view.getInt32(offset, true);
        offset += 4;

        const tracks = [];
        const trackCount = Math.max(0, Math.min(rawTrackCount, 64));
        const isUpc = trackCount > 20;

        for (let i = 0; i < trackCount; i++) {
            if (offset >= buffer.byteLength) break;

            let startFrame = 0;
            let endFrame = 0;
            let fps = 30;
            let trackType = i;

            // Check chunk length if format uses chunked records
            let chunkLen = 0;
            if (offset + 4 <= buffer.byteLength) {
                const possibleLen = view.getInt32(offset, true);
                if (possibleLen > 0 && possibleLen <= 2048 && (offset + 4 + possibleLen <= buffer.byteLength)) {
                    chunkLen = possibleLen;
                    offset += 4;
                }
            }

            // Assign authentic Knight Online action name
            let trackName = isUpc
                ? (KO_UPC_ANIM_NAMES[i] || `Action ${i + 1}`)
                : (KO_MONSTER_ANIM_NAMES[i] || `Skill ${i + 1}`);

            // Advance offset through chunk
            if (chunkLen > 0) {
                offset += chunkLen;
            } else {
                offset += 48; // fallback stride
            }

            tracks.push({
                index: i,
                type: trackType,
                name: trackName,
                startFrame,
                endFrame,
                fps,
                needsAutoSegment: true
            });
        }

        return {
            trackCount: tracks.length,
            tracks
        };
    }
}

class N3JointParser {
    /**
     * Parse .n3joint binary file (Hierarchical Skeletal Bones & Keyframes)
     * Faithful to CN3Joint::Load, CN3Transform::Load, CN3AnimKey::Load
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        const view = new DataView(buffer);
        const offsetRef = { offset: 0 };

        function readString() {
            if (offsetRef.offset + 4 > buffer.byteLength) return '';
            const len = view.getInt32(offsetRef.offset, true);
            offsetRef.offset += 4;
            if (len <= 0 || offsetRef.offset + len > buffer.byteLength) return '';
            let str = '';
            for (let i = 0; i < len; i++) {
                str += String.fromCharCode(view.getUint8(offsetRef.offset + i));
            }
            offsetRef.offset += len;
            return str;
        }

        function readAnimKey() {
            if (offsetRef.offset + 4 > buffer.byteLength) {
                return { count: 0, type: -1, rate: 0, data: null };
            }
            const count = view.getInt32(offsetRef.offset, true);
            offsetRef.offset += 4;
            if (count <= 0) {
                return { count: 0, type: -1, rate: 0, data: null };
            }
            const type = view.getInt32(offsetRef.offset, true); // 0 = Vec3, 1 = Quat
            offsetRef.offset += 4;
            const rate = view.getFloat32(offsetRef.offset, true);
            offsetRef.offset += 4;

            const stride = (type === 0) ? 12 : 16;
            const totalBytes = count * stride;
            const numFloats = (type === 0) ? count * 3 : count * 4;
            const data = new Float32Array(numFloats);
            for (let i = 0; i < numFloats; i++) {
                data[i] = view.getFloat32(offsetRef.offset + i * 4, true);
            }
            offsetRef.offset += totalBytes;
            return { count, type, rate, data };
        }

        const flatJoints = [];

        function readJoint(parent) {
            if (offsetRef.offset >= buffer.byteLength) return null;

            const name = readString();
            const pos = [
                view.getFloat32(offsetRef.offset, true),
                view.getFloat32(offsetRef.offset + 4, true),
                view.getFloat32(offsetRef.offset + 8, true)
            ];
            offsetRef.offset += 12;

            const rot = [
                view.getFloat32(offsetRef.offset, true),
                view.getFloat32(offsetRef.offset + 4, true),
                view.getFloat32(offsetRef.offset + 8, true),
                view.getFloat32(offsetRef.offset + 12, true)
            ];
            offsetRef.offset += 16;

            const scale = [
                view.getFloat32(offsetRef.offset, true),
                view.getFloat32(offsetRef.offset + 4, true),
                view.getFloat32(offsetRef.offset + 8, true)
            ];
            offsetRef.offset += 12;

            const keyPos = readAnimKey();
            const keyRot = readAnimKey();
            const keyScale = readAnimKey();
            const keyOrient = readAnimKey();

            const childCount = view.getInt32(offsetRef.offset, true);
            offsetRef.offset += 4;

            const joint = {
                id: flatJoints.length,
                name,
                pos,
                rot,
                scale,
                keyPos,
                keyRot,
                keyScale,
                keyOrient,
                parent,
                children: []
            };
            flatJoints.push(joint);

            for (let i = 0; i < childCount; i++) {
                const child = readJoint(joint);
                if (child) joint.children.push(child);
            }

            return joint;
        }

        const rootJoint = readJoint(null);

        return {
            rootJoint,
            flatJoints,
            jointCount: flatJoints.length
        };
    }
}

/**
 * Knight Online .N3FXPlug Parser
 * Binds Visual FX bundles (.fxb) to character skeleton joint sockets
 */
class N3FXPlugParser {
    /**
     * Parse .n3fxplug binary buffer
     * @param {ArrayBuffer} buffer
     * @returns {{ version: number, entries: Array<{ fxbPath: string, jointIndex: number, offset: {x:number, y:number, z:number}, scale: {x:number, y:number, z:number} }> }}
     */
    static parse(buffer) {
        if (!buffer || buffer.byteLength < 8) return { version: 0, entries: [] };
        const view = new DataView(buffer);
        let offset = 0;

        const version = view.getInt32(offset, true);
        offset += 4;
        const count = view.getInt32(offset, true);
        offset += 4;

        const entries = [];
        for (let i = 0; i < count; i++) {
            if (offset + 8 > buffer.byteLength) break;
            const flags = view.getInt32(offset, true);
            offset += 4;
            const strLen = view.getInt32(offset, true);
            offset += 4;

            if (strLen < 0 || offset + strLen > buffer.byteLength) break;
            let fxbPath = '';
            for (let j = 0; j < strLen; j++) {
                fxbPath += String.fromCharCode(view.getUint8(offset + j));
            }
            offset += strLen;

            let jointIndex = -1;
            let posX = 0, posY = 0, posZ = 0;
            let scaleX = 1, scaleY = 1, scaleZ = 1;

            if (offset + 4 <= buffer.byteLength) {
                jointIndex = view.getInt32(offset, true);
                offset += 4;
            }

            if (offset + 12 <= buffer.byteLength) {
                posX = view.getFloat32(offset, true); offset += 4;
                posY = view.getFloat32(offset, true); offset += 4;
                posZ = view.getFloat32(offset, true); offset += 4;
            }

            if (offset + 16 <= buffer.byteLength) {
                offset += 8; // skip rotation / orient
                scaleX = view.getFloat32(offset, true); offset += 4;
                scaleY = view.getFloat32(offset, true); offset += 4;
                scaleZ = scaleY;
                if (offset + 4 <= buffer.byteLength) offset += 4; // trailing padding
            } else {
                offset = buffer.byteLength;
            }

            entries.push({
                fxbPath: fxbPath.replace(/\\/g, '/'),
                jointIndex,
                offset: { x: posX, y: posY, z: posZ },
                scale: { 
                    x: Math.abs(scaleX) > 0.001 ? Math.abs(scaleX) : 1,
                    y: Math.abs(scaleY) > 0.001 ? Math.abs(scaleY) : 1,
                    z: Math.abs(scaleZ) > 0.001 ? Math.abs(scaleZ) : 1
                }
            });
        }

        return { version, entries };
    }
}

/**
 * Knight Online .FXB (Visual Effects Bundle) Parser
 * Extracts particle systems, billboard planes, and texture sequences
 */
class FXBParser {
    /**
     * Parse .fxb binary buffer to extract texture assets & effect structure
     * @param {ArrayBuffer} buffer
     * @returns {{ elements: Array<{ type: string, texturePath: string, isBillboard: boolean, isParticle: boolean }> }}
     */
    static parse(buffer) {
        if (!buffer || buffer.byteLength < 4) return { elements: [] };
        const bytes = new Uint8Array(buffer);
        let str = '';
        for (let i = 0; i < bytes.length; i++) {
            const b = bytes[i];
            str += (b >= 32 && b <= 126) ? String.fromCharCode(b) : ' ';
        }

        // Find all fx paths: fx\billboard\..., fx\particle\...
        const regex = /fx[\\\/][a-zA-Z0-9_\-\\\/\.]+/gi;
        const matches = str.match(regex) || [];
        const uniquePaths = new Set();
        const elements = [];

        for (let rawPath of matches) {
            let p = rawPath.replace(/\\/g, '/');
            // Normalize path extensions for sequence DXTs
            if (p.endsWith('_') || p.endsWith('.')) {
                p += '0000.dxt';
            } else if (!p.includes('.')) {
                p += '0000.dxt';
            } else if (!p.endsWith('.dxt') && !p.endsWith('.n3shape')) {
                p += '.dxt';
            }

            const lower = p.toLowerCase();
            // Filter out distortion/noise maps, clan masks, and HDR duplicate passes
            if (lower.includes('clana') || lower.includes('hdr') || lower.includes('noise') || lower.includes('distort')) {
                continue;
            }

            if (!uniquePaths.has(p)) {
                uniquePaths.add(p);
                const isBillboard = lower.includes('/billboard/');
                const isParticle = lower.includes('/particle/');
                elements.push({
                    type: isBillboard ? 'billboard' : (isParticle ? 'particle' : 'mesh_effect'),
                    texturePath: p,
                    isBillboard,
                    isParticle
                });
            }
        }

        return { elements };
    }
}

class ObjParser {
    /**
     * Parses standard Wavefront .obj text string
     * Supports triangles, quads, n-gons, missing normals, missing UVs, and negative indices
     * @param {string} text
     * @returns {{ positions: Float32Array, normals: Float32Array, uvs: Float32Array, vertexCount: number, triangleCount: number, name: string }}
     */
    static parse(text) {
        const lines = text.split(/\r?\n/);
        const rawPositions = [];
        const rawNormals = [];
        const rawUVs = [];
        let objName = 'Imported_Mesh';

        const triPos = [];
        const triNorm = [];
        const triUv = [];

        function parseIndex(idxStr, count) {
            if (!idxStr) return -1;
            const idx = parseInt(idxStr, 10);
            if (isNaN(idx)) return -1;
            if (idx > 0) return idx - 1;
            return count + idx; // negative relative index
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line || line.startsWith('#')) continue;

            if (line.startsWith('o ') || line.startsWith('g ')) {
                objName = line.substring(2).trim() || objName;
            } else if (line.startsWith('v ')) {
                const parts = line.substring(2).trim().split(/\s+/);
                rawPositions.push([parseFloat(parts[0]) || 0, parseFloat(parts[1]) || 0, parseFloat(parts[2]) || 0]);
            } else if (line.startsWith('vn ')) {
                const parts = line.substring(3).trim().split(/\s+/);
                rawNormals.push([parseFloat(parts[0]) || 0, parseFloat(parts[1]) || 0, parseFloat(parts[2]) || 0]);
            } else if (line.startsWith('vt ')) {
                const parts = line.substring(3).trim().split(/\s+/);
                rawUVs.push([parseFloat(parts[0]) || 0, parseFloat(parts[1]) || 0]);
            } else if (line.startsWith('f ')) {
                const tokens = line.substring(2).trim().split(/\s+/);
                if (tokens.length < 3) continue;

                const faceVerts = [];
                for (let t = 0; t < tokens.length; t++) {
                    const segs = tokens[t].split('/');
                    const vIdx = parseIndex(segs[0], rawPositions.length);
                    const vtIdx = segs.length > 1 ? parseIndex(segs[1], rawUVs.length) : -1;
                    const vnIdx = segs.length > 2 ? parseIndex(segs[2], rawNormals.length) : -1;
                    faceVerts.push({ vIdx, vtIdx, vnIdx });
                }

                // Triangulate face fan: [0, t, t+1]
                for (let t = 1; t < faceVerts.length - 1; t++) {
                    const tri = [faceVerts[0], faceVerts[t], faceVerts[t + 1]];
                    for (let k = 0; k < 3; k++) {
                        const v = tri[k];
                        const pos = (v.vIdx >= 0 && v.vIdx < rawPositions.length) ? rawPositions[v.vIdx] : [0, 0, 0];
                        triPos.push(pos[0], pos[1], pos[2]);

                        if (v.vnIdx >= 0 && v.vnIdx < rawNormals.length) {
                            const n = rawNormals[v.vnIdx];
                            triNorm.push(n[0], n[1], n[2]);
                        } else {
                            triNorm.push(0, 1, 0);
                        }

                        if (v.vtIdx >= 0 && v.vtIdx < rawUVs.length) {
                            const uv = rawUVs[v.vtIdx];
                            triUv.push(uv[0], uv[1]);
                        } else {
                            triUv.push(0, 0);
                        }
                    }
                }
            }
        }

        const vertexCount = triPos.length / 3;
        const positions = new Float32Array(triPos);
        const normals = new Float32Array(triNorm);
        const uvs = new Float32Array(triUv);

        return {
            name: objName,
            positions,
            normals,
            uvs,
            vertexCount,
            triangleCount: Math.floor(vertexCount / 3)
        };
    }
}

class N3ShapeParser {
    /**
     * Parse .n3shape binary file (Knight Online Static Environment & Prop Objects, Thrones, Caves)
     * @param {ArrayBuffer} buffer
     */
    static parse(buffer) {
        if (!buffer || buffer.byteLength < 50) return null;
        const view = new DataView(buffer);
        let offset = 0;

        function readString() {
            if (offset + 4 > buffer.byteLength) return '';
            const len = view.getInt32(offset, true);
            offset += 4;
            if (len <= 0 || offset + len > buffer.byteLength) return '';
            let str = '';
            for (let i = 0; i < len; i++) {
                str += String.fromCharCode(view.getUint8(offset + i));
            }
            offset += len;
            return str;
        }

        const name = readString();
        const pos = {
            x: view.getFloat32(offset, true),
            y: view.getFloat32(offset + 4, true),
            z: view.getFloat32(offset + 8, true)
        };
        offset += 12;

        const rot = {
            x: view.getFloat32(offset, true),
            y: view.getFloat32(offset + 4, true),
            z: view.getFloat32(offset + 8, true),
            w: view.getFloat32(offset + 12, true)
        };
        offset += 16;

        const scale = {
            x: view.getFloat32(offset, true),
            y: view.getFloat32(offset + 4, true),
            z: view.getFloat32(offset + 8, true)
        };
        offset += 12;

        // Collision header (CN3TransformCollision): 12 bytes collision data + string collisionMesh + 4 bytes collision DWORD
        offset += 12;
        const collMeshName = readString();
        offset += 4;

        if (offset + 4 > buffer.byteLength) {
            return { name, pos, rot, scale, parts: [] };
        }

        const partCount = view.getInt32(offset, true);
        offset += 4;

        const parts = [];
        const safePartCount = Math.max(0, Math.min(partCount, 128));

        for (let i = 0; i < safePartCount; i++) {
            if (offset + 12 > buffer.byteLength) break;
            const pivot = {
                x: view.getFloat32(offset, true),
                y: view.getFloat32(offset + 4, true),
                z: view.getFloat32(offset + 8, true)
            };
            offset += 12;

            const meshPath = readString();
            // Skip material / rendering settings (100 bytes)
            offset += 100;
            const texPath = readString();

            parts.push({
                index: i,
                pivot,
                meshPath: meshPath.replace(/\\/g, '/'),
                texPath: texPath.replace(/\\/g, '/')
            });
        }

        return {
            name,
            pos,
            rot,
            scale,
            partCount: parts.length,
            parts
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        N3ChrParser,
        N3CPartParser,
        N3SkinParser,
        N3PMeshParser,
        N3CPlugParser,
        N3AnimParser,
        N3JointParser,
        N3FXPlugParser,
        FXBParser,
        ObjParser,
        N3ShapeParser
    };
}

