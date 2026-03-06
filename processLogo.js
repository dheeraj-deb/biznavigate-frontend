const { Jimp } = require('jimp');

async function fixLogo() {
    try {
        const image = await Jimp.read('public/logo.jpg');
        // Remove the huge bounding box natively
        image.autocrop();

        // Loop through pixels, if white/whitish make them completely transparent
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y) => {
            const idx = (image.bitmap.width * y + x) << 2;
            const r = image.bitmap.data[idx + 0];
            const g = image.bitmap.data[idx + 1];
            const b = image.bitmap.data[idx + 2];

            if (r > 240 && g > 240 && b > 240) {
                image.bitmap.data[idx + 3] = 0; // Purely Transparent
            }
        });

        await image.write('public/logo.png');
        console.log('Successfully generated transparent cropped logo!');
    } catch (e) {
        console.error(e);
    }
}

fixLogo();
