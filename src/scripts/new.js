import superb from 'superb';
import { prompt } from 'inquirer';
import { sync as mkdirpSync } from 'mkdirp';
import moment from 'moment';
import { safeDump as dumpYaml } from 'js-yaml';
import { slugify } from 'underscore.string';
import { writeFileSync } from 'fs';
import open from 'open';

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter a title : ',
    default: `My next ${superb()} post`
  },
  {
    type: 'input',
    name: 'path',
    message: 'Set a path    : ',
    default: answers => slugify(answers.title)
  }
];

prompt(questions).then((answers) => {
  const dir = `./pages/blog/${answers.path}`;
  mkdirpSync(dir);
  const fm = {
    title: answers.title,
    date: moment().format('MM/DD/YYYY'),
    draft: true
  };
  const fileString = `---\n${dumpYaml(fm)}---\n`;
  writeFileSync(`${dir}/index.md`, fileString, {
    encoding: 'utf-8'
  });
  console.log(`\n${dir}`); // eslint-disable-line
  open(`${dir}/index.md`);
});
