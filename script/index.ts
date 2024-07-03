// index.ts
import * as fs from 'fs';
import * as path from 'path';
import { Command } from 'commander';
const inquirer = require('inquirer');

const program = new Command();

program
    .version('1.0.0')
    .description('CLI tool to automate writing blog markdown files')
    .action(async () => {
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter the article name:'
            },
            {
                type: 'editor',
                name: 'content',
                message: 'Write your article content:',
            },
        ];
        const { name, content } = await inquirer.prompt(questions);

            // Prepare markdown content
            const markdownContent = `---
  title: ${name}
  author: zzq
  pubDatetime: ${new Date().toISOString()}
  modDatetime: ${new Date().toISOString()}
  slug: ${new Date().toISOString()}
  featured: true
  draft: false
  tags:
    - 后端
    - 前端
  ogImage: ""
  description: ${name}
  canonicalURL: ""
  ---
  
  ## Table of contents

  ${content}
  `;

            // Write to file
            const currentYear = new Date().getFullYear().toString();
            const yearFolderPath = path.join(process.cwd(), 'src/content/blog', currentYear);
            if (!fs.existsSync(yearFolderPath)) {
                fs.mkdirSync(yearFolderPath);
            }
            const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}.md`;
            const filePath = path.join(yearFolderPath, fileName);

            console.log(`Markdown file "${fileName}" created successfully at "${filePath}"`);
    });

program.parse(process.argv);
