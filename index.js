import fs from 'fs';
import express from 'express';

const app = express();

const loadControllers = async (path) => {
    const controllers = {};

    const files = await fs.promises.readdir(path);

    for (const file of files) {
        const fullPath = `${path}/${file}`;
        const stats = await fs.promises.stat(fullPath);

        if (stats.isDirectory()) {
            controllers[file] = await loadControllers(fullPath);
        } else if (file.endsWith('Controller.js')) {
            console.log(`Loading controller: ${fullPath}`);
            const module = await import(`./${fullPath}`);
            const name = file.replace('.js', '');
            controllers[name] = module.default || module;
            app.use('/', controllers[name]); // import controller to app
        }
    }
};

await loadControllers('src/controllers/');
export const authentication = app;