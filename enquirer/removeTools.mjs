import fs from "fs";
//const path = require('path');

// Define the functions and imports to be removed
let importsToRemove = [
    "import { emailNodemailer } from './emailNodemailer';",
    "import { amazonS3Upload } from './amazonS3Upload';"
];

let functionsToRemove = [
    "export { amazonS3Upload };",
    "export { emailNodemailer };"
];
// const filterImportsAndFunctions = (tools) => {
//     const toolSet = new Set(tools);
  
//     importsToRemove = importsToRemove.filter(imp => {
//       return !Array.from(toolSet).some(tool => imp.includes(tool));
//     });
  
//     functionsToRemove = functionsToRemove.filter(func => {
//       return !Array.from(toolSet).some(tool => func.includes(tool));
//     });
//   };
  
export const removeNotSelectedTools = (tools, indexPath) => {
    
    // Read the contents of index.ts
    //filterImportsAndFunctions(tools);
    // fs.readFile(indexPath, 'utf8', (err, data) => {
    //   if (err) {
    //     return console.error(`Error reading file: ${err.message}`);
    //   }
    // Remove the specified imports
      //let result = data;
      console.log("reached removeNotSelectedTools");
    //   importsToRemove.forEach(importStatement => {
    //     const regex = new RegExp(`^.*${importStatement}.*$`, 'gm');
    //     result = result.replace(regex, '');
    //   });

    //   // Remove the specified functions
    //   functionsToRemove.forEach(func => {
    //     const regex = new RegExp(func.replace(/[\s{}()=.;]/g, '\\$&'), 'gs');
    //     result = result.replace(regex, '');
    //   });

    //   // Write the modified content back to index.ts
    //   fs.writeFile(indexPath, result, 'utf8', err => {
    //     if (err) {
    //       return console.error(`Error writing file: ${err.message}`);
    //     }
    //     console.log('Successfully removed specified contents from index.ts');
    //   });
  //  });

}
