/**
 * Knight Online DXT / NTF Texture Decoder
 * Decodes NoahSystem NTF / DXT textures (DXT1, DXT3, DXT5) to standard RGBA ImageData
 */
class DxtDecoder {
    /**
     * Decode an ArrayBuffer containing Knight Online .DXT file data
     * @param {ArrayBuffer} buffer
     * @returns {{ width: number, height: number, format: string, rgba: Uint8ClampedArray, canvas: HTMLCanvasElement }}
     */
    static decode(buffer) {
        const view = new DataView(buffer);
        let offset = 0;

        // Header: name length + string
        const nameLen = view.getInt32(offset, true);
        offset += 4;
        let texName = '';
        for (let i = 0; i < nameLen; i++) {
            texName += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += nameLen;

        // Magic "NTF\x03" (or similar version)
        const magic0 = view.getUint8(offset);
        const magic1 = view.getUint8(offset + 1);
        const magic2 = view.getUint8(offset + 2);
        const magic3 = view.getUint8(offset + 3);
        offset += 4;

        // Dimensions
        const width = view.getInt32(offset, true);
        offset += 4;
        const height = view.getInt32(offset, true);
        offset += 4;

        // Format: "DXT1", "DXT3", "DXT5"
        let format = '';
        for (let i = 0; i < 4; i++) {
            format += String.fromCharCode(view.getUint8(offset + i));
        }
        offset += 4;

        const mipCount = view.getInt32(offset, true);
        offset += 4;

        const rgba = new Uint8ClampedArray(width * height * 4);
        const blockBytes = buffer.slice(offset);

        if (format === 'DXT1') {
            DxtDecoder.decodeDXT1(new Uint8Array(blockBytes), width, height, rgba);
        } else if (format === 'DXT3') {
            DxtDecoder.decodeDXT3(new Uint8Array(blockBytes), width, height, rgba);
        } else if (format === 'DXT5') {
            DxtDecoder.decodeDXT5(new Uint8Array(blockBytes), width, height, rgba);
        } else {
            console.warn('Unknown or uncompressed texture format:', format, 'falling back to gray default');
            rgba.fill(180);
        }

        // Check if texture actually uses transparency (DXT3/DXT5 or semi-transparent pixels)
        let hasAlpha = false;
        if (format === 'DXT3' || format === 'DXT5') {
            for (let i = 3; i < rgba.length; i += 4) {
                if (rgba[i] < 240) {
                    hasAlpha = true;
                    break;
                }
            }
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(width, height);
        imgData.data.set(rgba);
        ctx.putImageData(imgData, 0, 0);

        return {
            name: texName,
            width,
            height,
            format,
            rgba,
            canvas,
            hasAlpha
        };
    }

    /**
     * DXT1 (BC1) Decoder
     */
    static decodeDXT1(bytes, width, height, rgba) {
        let blockOffset = 0;
        const numBlocksX = Math.ceil(width / 4);
        const numBlocksY = Math.ceil(height / 4);

        for (let by = 0; by < numBlocksY; by++) {
            for (let bx = 0; bx < numBlocksX; bx++) {
                if (blockOffset + 8 > bytes.length) break;

                const c0 = bytes[blockOffset] | (bytes[blockOffset + 1] << 8);
                const c1 = bytes[blockOffset + 2] | (bytes[blockOffset + 3] << 8);

                const r0 = ((c0 >> 11) & 0x1f) * 255 / 31;
                const g0 = ((c0 >> 5) & 0x3f) * 255 / 63;
                const b0 = (c0 & 0x1f) * 255 / 31;

                const r1 = ((c1 >> 11) & 0x1f) * 255 / 31;
                const g1 = ((c1 >> 5) & 0x3f) * 255 / 63;
                const b1 = (c1 & 0x1f) * 255 / 31;

                const colors = [
                    [r0, g0, b0, 255],
                    [r1, g1, b1, 255],
                    [0, 0, 0, 255],
                    [0, 0, 0, 255]
                ];

                if (c0 > c1) {
                    colors[2][0] = (2 * r0 + r1) / 3;
                    colors[2][1] = (2 * g0 + g1) / 3;
                    colors[2][2] = (2 * b0 + b1) / 3;
                    colors[3][0] = (r0 + 2 * r1) / 3;
                    colors[3][1] = (g0 + 2 * g1) / 3;
                    colors[3][2] = (b0 + 2 * b1) / 3;
                } else {
                    colors[2][0] = (r0 + r1) / 2;
                    colors[2][1] = (g0 + g1) / 2;
                    colors[2][2] = (b0 + b1) / 2;
                    colors[3][3] = 0; // transparent
                }

                let lookup = (bytes[blockOffset + 4] | (bytes[blockOffset + 5] << 8) | (bytes[blockOffset + 6] << 16) | (bytes[blockOffset + 7] << 24)) >>> 0;
                blockOffset += 8;

                for (let py = 0; py < 4; py++) {
                    for (let px = 0; px < 4; px++) {
                        const x = bx * 4 + px;
                        const y = by * 4 + py;
                        if (x < width && y < height) {
                            const code = lookup & 3;
                            lookup >>>= 2;
                            const col = colors[code];
                            const pixelIndex = (y * width + x) * 4;
                            rgba[pixelIndex] = col[0];
                            rgba[pixelIndex + 1] = col[1];
                            rgba[pixelIndex + 2] = col[2];
                            rgba[pixelIndex + 3] = col[3];
                        } else {
                            lookup >>>= 2;
                        }
                    }
                }
            }
        }
    }

    /**
     * DXT3 (BC2) Decoder
     */
    static decodeDXT3(bytes, width, height, rgba) {
        let blockOffset = 0;
        const numBlocksX = Math.ceil(width / 4);
        const numBlocksY = Math.ceil(height / 4);

        for (let by = 0; by < numBlocksY; by++) {
            for (let bx = 0; bx < numBlocksX; bx++) {
                if (blockOffset + 16 > bytes.length) break;

                // 8 bytes of explicit 4-bit alpha
                const alphaBytes = bytes.subarray(blockOffset, blockOffset + 8);
                blockOffset += 8;

                // Color block (same as DXT1)
                const c0 = bytes[blockOffset] | (bytes[blockOffset + 1] << 8);
                const c1 = bytes[blockOffset + 2] | (bytes[blockOffset + 3] << 8);

                const r0 = ((c0 >> 11) & 0x1f) * 255 / 31;
                const g0 = ((c0 >> 5) & 0x3f) * 255 / 63;
                const b0 = (c0 & 0x1f) * 255 / 31;

                const r1 = ((c1 >> 11) & 0x1f) * 255 / 31;
                const g1 = ((c1 >> 5) & 0x3f) * 255 / 63;
                const b1 = (c1 & 0x1f) * 255 / 31;

                const colors = [
                    [r0, g0, b0],
                    [r1, g1, b1],
                    [(2 * r0 + r1) / 3, (2 * g0 + g1) / 3, (2 * b0 + b1) / 3],
                    [(r0 + 2 * r1) / 3, (g0 + 2 * g1) / 3, (b0 + 2 * b1) / 3]
                ];

                let lookup = (bytes[blockOffset + 4] | (bytes[blockOffset + 5] << 8) | (bytes[blockOffset + 6] << 16) | (bytes[blockOffset + 7] << 24)) >>> 0;
                blockOffset += 8;

                for (let py = 0; py < 4; py++) {
                    const rowAlpha = alphaBytes[py * 2] | (alphaBytes[py * 2 + 1] << 8);
                    for (let px = 0; px < 4; px++) {
                        const x = bx * 4 + px;
                        const y = by * 4 + py;
                        const a = ((rowAlpha >> (px * 4)) & 0x0f) * 17;
                        if (x < width && y < height) {
                            const code = lookup & 3;
                            lookup >>>= 2;
                            const col = colors[code];
                            const pixelIndex = (y * width + x) * 4;
                            if (a < 10) {
                                rgba[pixelIndex] = 0;
                                rgba[pixelIndex + 1] = 0;
                                rgba[pixelIndex + 2] = 0;
                                rgba[pixelIndex + 3] = 0;
                            } else {
                                rgba[pixelIndex] = col[0];
                                rgba[pixelIndex + 1] = col[1];
                                rgba[pixelIndex + 2] = col[2];
                                rgba[pixelIndex + 3] = a;
                            }
                        } else {
                            lookup >>>= 2;
                        }
                    }
                }
            }
        }
    }

    /**
     * DXT5 (BC3) Decoder
     */
    static decodeDXT5(bytes, width, height, rgba) {
        let blockOffset = 0;
        const numBlocksX = Math.ceil(width / 4);
        const numBlocksY = Math.ceil(height / 4);

        for (let by = 0; by < numBlocksY; by++) {
            for (let bx = 0; bx < numBlocksX; bx++) {
                if (blockOffset + 16 > bytes.length) break;

                const a0 = bytes[blockOffset];
                const a1 = bytes[blockOffset + 1];
                const alphas = [a0, a1, 0, 0, 0, 0, 0, 0];
                if (a0 > a1) {
                    for (let i = 1; i <= 6; i++) {
                        alphas[i + 1] = ((7 - i) * a0 + i * a1) / 7;
                    }
                } else {
                    for (let i = 1; i <= 4; i++) {
                        alphas[i + 1] = ((5 - i) * a0 + i * a1) / 5;
                    }
                    alphas[6] = 0;
                    alphas[7] = 255;
                }

                // 6 bytes of 3-bit alpha indices (48 bits = 16 x 3)
                const aBits = bytes.subarray(blockOffset + 2, blockOffset + 8);
                blockOffset += 8;

                // Color block
                const c0 = bytes[blockOffset] | (bytes[blockOffset + 1] << 8);
                const c1 = bytes[blockOffset + 2] | (bytes[blockOffset + 3] << 8);

                const r0 = ((c0 >> 11) & 0x1f) * 255 / 31;
                const g0 = ((c0 >> 5) & 0x3f) * 255 / 63;
                const b0 = (c0 & 0x1f) * 255 / 31;

                const r1 = ((c1 >> 11) & 0x1f) * 255 / 31;
                const g1 = ((c1 >> 5) & 0x3f) * 255 / 63;
                const b1 = (c1 & 0x1f) * 255 / 31;

                const colors = [
                    [r0, g0, b0],
                    [r1, g1, b1],
                    [(2 * r0 + r1) / 3, (2 * g0 + g1) / 3, (2 * b0 + b1) / 3],
                    [(r0 + 2 * r1) / 3, (g0 + 2 * g1) / 3, (b0 + 2 * b1) / 3]
                ];

                let lookup = (bytes[blockOffset + 4] | (bytes[blockOffset + 5] << 8) | (bytes[blockOffset + 6] << 16) | (bytes[blockOffset + 7] << 24)) >>> 0;
                blockOffset += 8;

                let aIndexBits = 0n;
                for (let i = 0; i < 6; i++) {
                    aIndexBits |= (BigInt(aBits[i]) << BigInt(i * 8));
                }

                for (let py = 0; py < 4; py++) {
                    for (let px = 0; px < 4; px++) {
                        const shift = BigInt((py * 4 + px) * 3);
                        const aIdx = Number((aIndexBits >> shift) & 0x07n);
                        const x = bx * 4 + px;
                        const y = by * 4 + py;

                        if (x < width && y < height) {
                            const code = lookup & 3;
                            lookup >>>= 2;
                            const col = colors[code];
                            const pixelIndex = (y * width + x) * 4;
                            const aVal = alphas[aIdx];
                            if (aVal < 20) {
                                rgba[pixelIndex] = 0;
                                rgba[pixelIndex + 1] = 0;
                                rgba[pixelIndex + 2] = 0;
                                rgba[pixelIndex + 3] = 0;
                            } else {
                                rgba[pixelIndex] = col[0];
                                rgba[pixelIndex + 1] = col[1];
                                rgba[pixelIndex + 2] = col[2];
                                rgba[pixelIndex + 3] = aVal;
                            }
                        } else {
                            lookup >>>= 2;
                        }
                    }
                }
            }
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DxtDecoder;
}
