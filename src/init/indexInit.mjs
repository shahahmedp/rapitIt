import inquirer from 'inquirer';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export const initialInquire = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project folder?',
    },
    {
      type: 'list',
      name: 'database',
      message: 'What database are you using?',
      choices: ['MongoDB', 'PostgreSQL'],
    },
    {
      type: 'confirm',
      name: 'useAWS',
      message: 'Are you using AWS?',
    },
    {
      type: 'input',
      name: 'awsS3Bucket',
      message: 'Enter the name of your AWS S3 bucket (if applicable):',
      when: (answers) => answers.useAWS,
    },
    {
      type: 'input',
      name: 'emailConfig',
      message: 'Enter your email configuration:',
      choices: ["SMTP_HOST", "SMTP_PORT", "MAILING_USERNAME", "MAILING_PASSWORD"]
    },
    {
      type: 'list',
      name: 'logger',
      message: 'Which logger are you using?',
      choices: ['Winston', 'log4js', 'pino', 'bunyan'],
    },
  ]);

  if (!answers.confirm) {
    console.log('Okay, maybe next time.');
    return;
  }

  const projectPath = path.join(__dirname, answers.projectName);

  // Create project folder
  fs.mkdirSync(projectPath);

  // Clone Git repository
  const gitRepoUrl = 'https://github.com/shahahmedp/rapitIt.git'; // Replace with your Git repository URL
  exec(`git clone ${gitRepoUrl} ${projectPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cloning repository: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Cloning repository stderr: ${stderr}`);
      return;
    }
    console.log(`Repository cloned to ${projectPath}`);
  });
};

initialInquire();
