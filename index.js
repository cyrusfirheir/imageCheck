
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

//  Set the path of the project folder base on whether it is run with nodejs or as an executable
let project_folder;
if(process.pkg){
    //  It is run as an executable
    project_folder = path.dirname(process.execPath)

}else{
    //  It is run with nodejs
    project_folder = __dirname
}

let source;
let sourceFileName;

inquirer
  .prompt([
    {
      name: 'sourceFileName',
      message: '\n   Enter entry point:',
      default: 'index.html'
    }
  ])
  .then(answers => {

    sourceFileName = answers.sourceFileName;

    if (!fs.existsSync(path.join(project_folder, '/checker/', sourceFileName))) {
      console.log(`\n   \x1b[31m\x1b[1mNo source file found!\x1b[0m\n`);
      console.log(`   Place a valid html file along with assets in the 'checker' folder and try again...`);
    } else {

      source = fs.readFileSync(path.join(project_folder, '/checker/', sourceFileName), 'utf8');

      /*
        <img src="djaksd.webm">
        url(lol.jpg)
        [img[a32edc/asdje\ade.mp4]]
        [img[hom e.svg]]
        [img[home.webp][Home]]
        [img[home.jpeg][Home][$done to true]]
        [img[Go home|home.jpg]]
        [img[Go home|home.png][Home]]
        [img[Go home|home.gif][Home][$done to true]]
      */

      let imgRegex = /(?:(?:\-\>)|(?:\|)|(?:\")|(?:\[)|(?:\()|(?:\&quot\;))([0-9a-zA-Z\\\/\^\&\'\@\{\}\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+?\.(?:(?:png)|(?:jpg)|(?:jpeg)|(?:gif)|(?:svg)|(?:webp)|(?:webm)|(?:mp4)))(?:(?:\<\-)|(?:\")|(?:\])|(?:\))|(?:\&quot\;))/gi;

      let imgSources = [...source.matchAll(imgRegex)];

      let found = [];
      let missing = [];

      if (imgSources !== null) {
        for (let i = 0; i < imgSources.length; i++) {
          let ipath = imgSources[i][1].replace(/\\/gi, "/").trim();
          let prj = path.join(project_folder, '/checker/');
          _ipath = (ipath.substr(0,2) === "./") ? prj+ipath.substr(2) : prj+ipath;

          if (fs.existsSync(_ipath)) {
            found.push(ipath);
          } else {
            missing.push(ipath);
          }
        }
      }

      let unique = (value, index, self) => {
        return self.indexOf(value) === index;
      }

      found = found.filter(unique);
      missing = missing.filter(unique).sort(function(a, b){
        return b.length - a.length;
      });

      let falsePositives = [];

      console.log(`\n   Reference(s) found  : ${found.length + missing.length}`);
      console.log(`   Working sources     : ${found.length}`);
      console.log(`   Missing sources     : ${missing.length}\n`);

      if (missing.length !== 0) {
        console.log(`   =======================================`);
        console.log(`   The following source(s) is/are missing:`);
        console.log(`   =======================================\n`);

        for (let m = 0; m < missing.length; m++) {
          if (!missing[m].includes("/")) {
            falsePositives = [...falsePositives, missing[m]];
          } else {
            console.log(`   \x1b[31m\x1b[1m"${missing[m]}"\x1b[0m`);
          }
        }
      }

      if (falsePositives.length !== 0) {
        console.log(`\n   ======================`);
        console.log(`   Possible false alarms:`);
        console.log(`   ======================\n`);

        for (let p = 0; p < falsePositives.length; p++) {
          console.log(`   \x1b[33m\x1b[1m"${falsePositives[p]}"\x1b[0m`);
        }
      }
    }

    console.log(`\n   Press any key to exit...`);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));

  });
