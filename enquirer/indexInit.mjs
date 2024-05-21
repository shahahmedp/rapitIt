import inquirer from 'inquirer';
import path from 'path';
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from 'url';
//import { removeNotSelectedTools } from "./removeTools.mjs"

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      choices: ['MongoDB', 'PostgreSQL', 'both'],
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
      type: 'input',
      name: 'awsS3Bucket',
      message: 'Enter the name of your AWS S3 bucket Name(if applicable):',
      when: (answers) => answers.useAWS,
    },
    {
      type: 'confirm',
      name: 'emailNodemailer',
      message: 'Are you using nodemailer?',
    },
    {
      type: 'input',
      name: 'SMTP_HOST',
      message: 'What is the SMTP HOST?',
      default: '**********.amazonaws.com',
      skip: (answers) => !answers.emailNodemailer,
    },
    {
      type: 'input',
      name: 'SMTP_PORT',
      message: 'What is the SMTP PORT?',
      default: '587',
      skip: (answers) => !answers.emailNodemailer,
    },
    {
      type: 'input',
      name: 'MAILING_USERNAME',
      message: 'What is the MAILING USERNAME?',
      default: 'AKIA********************',
      skip: (answers) => !answers.emailNodemailer,
    },
    {
      type: 'password',
      name: 'MAILING_PASSWORD',
      message: 'What is the MAILING PASSWORD?',
      default: '************',
      skip: (answers) => !answers.emailNodemailer,
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

  const taskList = [
    '*',
    '!src/utils/*',
    'src/utils/index.ts',
    'src/utils/responseFormat.ts',
    '!src/config/*',
    'src/config/config.ts',
  ];

  // Process user's input
  if (answers?.confirm) {
    const projectPath = path.join(__dirname, '../../' ,answers.projectName).replace(/%20/g, ' ');
    const getBooleanKeys = (obj) => Object.fromEntries(Object.entries(obj).filter(([key, value]) => typeof value === 'boolean' && key != 'confirm' && value));
    const taskNameKeys = Object.keys(getBooleanKeys(answers))
    taskNameKeys.forEach((task)=>{
      taskList.push(`src/utils/${task}.ts`);
      if(task === "emailNodemailer"){
        taskList.push(`src/config/${task}Transporter.ts`);
      }
      if(task === "redis"){
        taskList.push(`src/config/${task}Client.ts`);
      }
    })
    // Create project folder
    try {
      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
        console.log("Directory created successfully.");
        const gitRepoUrl = 'https://github.com/shahahmedp/rapitIt.git';
        process.chdir(projectPath);

        // Initialize a sparse checkout
        execSync('git init');
        execSync(`git remote add origin ${gitRepoUrl}`);
        execSync('git sparse-checkout init');

        // Add the entire repository to the sparse checkout
        execSync('git sparse-checkout set .');

        // Exclude all files in src/utils except index.ts and responseFormat.ts
        fs.writeFileSync('.git/info/sparse-checkout', taskList.join('\n'));

        // Pull from the repository
        execSync('git pull origin main');
          //removeNotSelectedTools(taskNameKeys, projectPath)
        console.log(`Repository cloned to ${projectPath}`);
      }else {
        console.log(`This folder *${projectPath}* already exist`)
        initialInquire();
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('Okay, maybe next time.');
  }
}
initialInquire();
