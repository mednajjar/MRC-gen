#! /usr/bin/env node

let chalk = require('chalk');
let fs = require('fs');

let readStreamModel = fs.createReadStream('node_modules/@medjs/mrc-gen/generator/model.js');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(chalk.yellow('Write your file name? '), name => {
    if(!fs.existsSync('./models')){
        fs.mkdirSync('./models')
    }
    let lowerName = name.charAt(0).toLowerCase() + name.slice(1);
    let uperName = name.charAt(0).toUpperCase() + name.slice(1);
    let pathModel = "./models/"+ uperName +".js";
    let wStreamModel = fs.createWriteStream(pathModel);
    readStreamModel.on('data', (data)=>{        
        wStreamModel.write(data, (err)=>{
            if(err){
                console.log(err.message)
            }else{
                fs.readFile(pathModel, 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    let result = data.replace(/modelSchema/g,  lowerName+'Schema',).replace(/Model/g,  uperName);
                    fs.writeFile(pathModel,  result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });  
                });
                console.log(chalk.green(`${uperName} Model:`), chalk.green.bold('DONE'))
            }
        })
    })
    readline.close();
});