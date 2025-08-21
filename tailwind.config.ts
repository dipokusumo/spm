import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
// Optional if you want automatic RTL variants
// import rtl from 'tailwindcss-rtl';

const config: Config = {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.ts',
        './resources/js/**/*.tsx',
        './resources/js/**/*.vue',
        '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        animate,
        typography,
        // rtl,  // uncomment if you install and want automatic RTL support
    ],
    darkMode: 'class',
};

export default config;
