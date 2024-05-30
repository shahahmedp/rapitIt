import inquirer from 'inquirer';
import path from 'path';
import fs from "fs";
import { execSync } from "child_process";
import { fileURLToPath } from 'url';
import events from 'events'
import { updateConfig } from "./removeTools.mjs"

// Suppress MaxListenersExceededWarning
events.EventEmitter.defaultMaxListeners = 20;

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
      type: 'input',
      name: 'awsS3Bucket',
      message: 'Enter the name of your AWS S3 bucket Name(if applicable):',
      when: (answers) => answers.amazonS3Upload,
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

  const taskList = [
    //all files of repo
    '*',
    //remove the enquirer
    '!enquirer/*',
    //tools 
    '!src/utils/*',
    'src/utils/index.ts',
    'src/utils/responseFormat.ts',
    //config task list
    '!src/config/*',
    'src/config/config.ts',
  ];

  // Process user's input
  if (answers?.confirm) {
    const projectPath = path.join(__dirname, '../../' ,answers.projectName).replace(/%20/g, ' ');
    const getBooleanKeys = (obj) => Object.fromEntries(Object.entries(obj).filter(([key, value]) => typeof value === 'boolean' && key != 'confirm' && value));
    //adding confirmation tools
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
         //database configuration
        console.log("answers.database 1", answers.database);
        if (answers.database === 'both') {
          taskList.push('src/db/mongoDB/');
          taskList.push('src/db/postgresSQL/');
          console.log("answers.database 2", answers.database);
        } else if (answers.database === 'mongoDB') {
          removePath(`${projectPath}/src/db/postgresSQL`)
          console.log("answers.database 2", answers.database);
        } else if (answers.database === 'postgreSQL') {
          removePath(`${projectPath}/src/db/mongoDB`)
          console.log("answers.database 2", answers.database);
        }
        updateConfig(answers, projectPath)
        console.log(`Repository cloned to ${projectPath}`, taskList);
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

function removePath(targetPath) {
  console.log("removePath 1", targetPath);
  if (fs.existsSync(targetPath)) {
    if (fs.lstatSync(targetPath).isDirectory()) {
      fs.readdirSync(targetPath).forEach((file) => {
        const curPath = path.join(targetPath, file);
        if (fs.lstatSync(curPath).isDirectory()) {
          removePath(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
        console.log("removePath 2", targetPath);
      });
      console.log("removePath 3", targetPath);
      fs.rmdirSync(targetPath);
    } else {
      console.log("removePath 4", targetPath);
      fs.unlinkSync(targetPath);
    }
  }
  console.log("removePath 12", fs.existsSync(targetPath));
}
