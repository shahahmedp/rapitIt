/* eslint-disable no-undef */
import inquirer from 'inquirer';
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';
import events from 'events'
import { exec } from 'child_process';
//const rimraf = require()
import { rimraf } from "rimraf"

// Suppress MaxListenersExceededWarning
events.EventEmitter.defaultMaxListeners = 20;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tools = ["emailNodemailer", "redis", "amazonS3Upload"]
// const dbRemove = {
//   mongoDB:{
//     opo:"postgreSQL",
//     filePath : path.join(__dirname, `../src/db/`),
//     fileWrite : path.join(__dirname, `../src/db/index.ts`),
//     contentLocation: ["/import { initPostgres, db as postgresDb } from '\.\/postgreSQL';\n/", "/(?:if\s*\(dbConfig\.type\s*===\s*dbConstants\.POSTGRES\s*\)\s*{\s*await\s*initPostgres\(\);\s*\/\/return\s*postgresDb;\s*}\s*else\s*{\s*logger\.error\({\s*message:\s*'Unsupported\s*database\s*type'\s*}\);\s*}\s*\n*\s*)+/"]
//   },

// }

const initialInquire = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project folder?',
      default: 'newDamcoRepo'
    },
    {
      type: 'rawlist',
      name: 'database',
      message: 'What database are you using?',
      choices: ['mongoDB', 'postgreSQL', 'both'],
    },
    {
      type: 'confirm',
      name: 'redis',
      message: 'Are you using redis cashing?',
    },
    {
      type: 'confirm',
      name: 'amazonS3Upload',
      message: 'Are you using AWS S3?',
    },
    {
      type: 'confirm',
      name: 'emailNodemailer',
      message: 'Are you using nodemailer?',
    },
    {
      type: 'input',
      name: 'SMTP_HOST',
      message: `What is the SMTP HOST?`,
      default: '**********.amazonaws.com',
      when: (answers) => answers.emailNodemailer,
    },
    {
      type: 'input',
      name: 'SMTP_PORT',
      message: 'What is the SMTP PORT?',
      default: '587',
      when: (answers) => answers.emailNodemailer,
    },
    {
      type: 'input',
      name: 'MAILING_USERNAME',
      message: 'What is the MAILING USERNAME?',
      default: 'AKIA********************',
      when: (answers) => answers.emailNodemailer,
    },
    {
      type: 'password',
      name: 'MAILING_PASSWORD',
      message: 'What is the MAILING PASSWORD?',
      default: '************',
      when: (answers) => answers.emailNodemailer,
    },
    {
      type: 'rawlist',
      name: 'logger',
      message: 'Which logger are you using?',
      choices: ['Winston', 'log4js'],
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you ready to proceed?',
    },
  ]);
  // Process user's input
  if (answers?.confirm) {
    try {
      const getBooleanKeys = (obj) => Object.fromEntries(Object.entries(obj).filter(([key, value]) => typeof value === 'boolean' && key != 'confirm' && value));
      //adding confirmation tools
      const tools2 = Object.keys(getBooleanKeys(answers))
      const toolsRemove  = tools.filter(item => !tools2.includes(item));
      if(toolsRemove.length){
        toolsRemove.map(async (obj)=>{
          console.log("obj", obj)
          const filePath = path.join(__dirname, `../src/tools/${obj}.ts`);
          await removeFile(filePath)
          if(obj === "emailNodemailer"){
            await removeFile(path.join(__dirname, `../src/config/${obj}Transporter.ts`))
          }
          if(obj === "redis"){
            await removeFile(path.join(__dirname, `../src/config/${obj}Client.ts`))
          }
        })
      }

      //remove unwanted folder
      if (answers.database === 'mongoDB') {
        await removePath(path.join(__dirname, `../src/db/postgreSQL`))
      }
      if (answers.database === 'postgreSQL') {
        await removePath(path.join(__dirname, `../src/db/mongoDb`))
      }
      removePatternsFromGitignore()
      await removePath(path.join(__dirname, `../enquirer`))
      //excecuting gitinit
      exec('git init', { cwd: path.join(__dirname, `../`) }, (error, stdout, stderr) => {
        if (error) {
          console.error('Error initializing git repository:', error);
          return;
        }
        console.log(stdout);
  
        if (stderr) {
          console.error('Git init stderr:', stderr);
        }
      });
    } catch (err) {
      initialInquire();
      console.error(err);
    } finally{
      console.log("*******************************************Auto repo setup is complete********************************************");
    }
  } else {
    console.log('Okay, maybe next time.');
  }
}
initialInquire();

const removeFile = async (filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`File removed: ${filePath}`);
    } catch (err) {
      if (err.code === 'EPERM') {
        console.error(`Permission error removing file: ${filePath}. Try running with elevated permissions.`);
      } else if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
      } else {
        console.error(`Error removing file: ${filePath}`, err);
      }
    }
  } else {
    console.error(`File does not exist: ${filePath}`);
  }
};

async function removePath(targetPath) {
  if (fs.existsSync(targetPath)) {
    if (fs.lstatSync(targetPath).isDirectory()) {
      fs.readdirSync(targetPath).forEach(async (file) => {
        const curPath = path.join(targetPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          await removePath(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(targetPath);
    } else {
      fs.unlinkSync(targetPath);
    }
  }
}

const removePatternsFromGitignore = async () => {
  const filePath = path.join(__dirname, `../.gitignore`);

  try {
    //update .gitignore
    rimraf.sync(path.join(__dirname, `../.git`));
    // Read the contents of the .gitignore file
    let gitignoreContent = fs.readFileSync(filePath, 'utf8');

    // Remove the specified patterns
    gitignoreContent = gitignoreContent
      .replace(/bin\n/g, '') // Remove 'bin\n'
      .replace(/build\n/g, '') // Remove 'build\n'
      .replace(/emquirer\n/g, '') // Remove 'emquirer\n'
      .replace(/\.debug\.json\n/g, 'example/*'); // Remove '*.debug.json\n'

    // Write the updated content back to the .gitignore file
    fs.writeFileSync(filePath, gitignoreContent, 'utf8');

    console.log('Updated .gitignore file successfully.');
  } catch (err) {
    console.error('Error updating .gitignore file:', err);
  }
};