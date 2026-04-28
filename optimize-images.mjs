import sharp from 'sharp';
import fs from 'fs';

async function optimizeImages() {
    console.log('Optimizing logo.png...');
    await sharp('./public/logo.png')
        .webp({ quality: 80 })
        .toFile('./public/logo.webp');

    console.log('Creating smaller logo for Navbar/Footer...');
    await sharp('./public/logo.png')
        .resize({ height: 80 }) // 80px should be plenty for height, saving size
        .webp({ quality: 80 })
        .toFile('./public/logo-sm.webp');

    console.log('Optimizing hero_industrial.png...');
    await sharp('./public/hero_industrial.png')
        .webp({ quality: 80 })
        .toFile('./public/hero_industrial.webp');

    console.log('Finished image optimization.');
}

optimizeImages().catch(console.error);
