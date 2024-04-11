import { writeFileSync } from 'fs';
import { decompressFrames, parseGIF } from 'gifuct-js';
import sharp from 'sharp'


const MEMORY_SIZE = 512;
const DISPLAY_SIZE = 80;
const gifSize = Math.min(Math.floor(Math.sqrt(MEMORY_SIZE)), DISPLAY_SIZE)
const PIXEL_SIZE = 5;
const MAX_DISPLAY_BUFFER_SIZE = 300

sharp("ricardohat.gif", {
    animated: true,
}).resize(gifSize, gifSize).toBuffer({ resolveWithObject: true }).then(({ data: buffer, info }) => {
    const frames = decompressFrames(parseGIF(buffer), true)

    const patchLength = frames[0].patch.length
    console.log("🚀 ~ patchLength:", patchLength)

    const code = [];
    let currentDisplayBufferSize = 0;

    frames.slice(0, 1).forEach((frame, index) => {

        const image = sharp({
            create: {
                background: { b: 255, alpha: 255, g: 255, r: 255 },
                height: frame.dims.height * 10,
                width: frame.dims.width * 10,
                channels: 4
            }
        }).png()

        const pixels = getRgbaArray(frame.patch)

        const groupedPixels = groupPixelsByColor(pixels)

        for (const entry of groupedPixels.entries()) {
            const r = entry[0].split("-")[0];
            const g = entry[0].split("-")[1];
            const b = entry[0].split("-")[2];
            const a = entry[0].split("-")[3];

            code.push(`draw color ${r} ${g} ${b}`)


            entry[1].forEach(pixel => {
                const indexInInitialBuffer = pixels.indexOf(pixel)
                const x = indexInInitialBuffer % gifSize;
                const y = Math.floor(indexInInitialBuffer / gifSize)

                code.push(`draw rect ${x} ${y} ${PIXEL_SIZE} ${PIXEL_SIZE}`)
                currentDisplayBufferSize++;

                if (currentDisplayBufferSize >= MAX_DISPLAY_BUFFER_SIZE)
                    emptyBuffer()
            })

            if (currentDisplayBufferSize > 0)
                emptyBuffer()

            function emptyBuffer() {
                code.push("drawflush display1")
                currentDisplayBufferSize = 0

            }

        }
    })
})



function getRgbaArray(buffer) {
    if (!(buffer instanceof Uint8ClampedArray))
        throw new Error("Given argument is not a buffer");

    const array = [];
    for (let i = 0;i < buffer.length;i += 4) {
        array.push([buffer[i], buffer[i + 1], buffer[i + 2], buffer[i + 3]])
    }
    return array;
}

function groupPixelsByColor(pixels) {
    const groupings = new Map();
    pixels.forEach(pixel => {
        const key = `${pixel[0]}-${pixel[1]}-${pixel[2]}-${pixel[3]}`
        if (groupings.has(key))
            groupings.get(key).push(pixel);
        else
            groupings.set(key, [pixel]);
    })
    return groupings
}