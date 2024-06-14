const fs = require('fs');
const path = require('path');

// Function to get the extension of a file
function getExtension(filename) {
    return path.extname(filename).slice(1);
}

// Function to create a new directory if it does not exist
function ensureDirectoryExistence(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
}

// Function to organize files in a directory
function organizeDirectory(directoryPath) {
    // Read the contents of the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Unable to read directory:', err);
            return;
        }

        // Process each file in the directory
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            if (fs.lstatSync(filePath).isFile()) {
                const extension = getExtension(file);

                // Skip files without an extension
                if (extension === '') {
                    return;
                }

                const destinationDir = path.join(directoryPath, extension);
                ensureDirectoryExistence(destinationDir);

                const destinationPath = path.join(destinationDir, file);

                // Move the file to the new directory
                fs.rename(filePath, destinationPath, (err) => {
                    if (err) {
                        console.error('Error moving file:', err);
                    } else {
                        console.log(`Moved ${file} to ${destinationDir}`);
                    }
                });
            }
        });
    });
}

// Replace this with the directory you want to organize
const directoryToOrganize = 'C:\\Users\\satya\\Downloads';
organizeDirectory(directoryToOrganize);
