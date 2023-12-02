const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

function includeControllers(dir) {
    // Read all files in the given directory
    const files = fs.readdirSync(dir);

    // Traverse each file/directory
    files.forEach(file => {
        const filePath = path.join(dir, file);

        // Check if it's a directory
        if (fs.statSync(filePath).isDirectory()) {
            // Recursively include controllers in the subdirectory
            includeControllers(filePath);
        } else {
            // Import and mount the controller if it's a file
            const controller = require(filePath);
            console.log(`registering ${filePath}`)
            app.use('/', controller);
        }
    });
}

const controllersDir = path.join(__dirname, 'controller');
includeControllers(controllersDir);
// module.exports = app;
exports.authentication = app;
