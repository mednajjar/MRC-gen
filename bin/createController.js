#! /usr/bin/env node


let chalk = require('chalk');
let fs = require('fs');

let readStreamController = fs.createReadStream('node_modules/@testcli/cli/generator/controller.js');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(chalk.yellow('Write your file name? '), name => {
    if(!fs.existsSync('./controllers')){
        fs.mkdirSync('./controllers')
    }
    let lowerName = name.charAt(0).toLowerCase() + name.slice(1);
    let uperName = name.charAt(0).toUpperCase() + name.slice(1);
    let pathController = "./controllers/"+ lowerName +"Controller.js";
    let wStreamController = fs.createWriteStream(pathController);
    readStreamController.on('data', (data)=>{
        wStreamController.write(data, (err)=>{
            if(err){
                console.log(err.message)
            }else{
                fs.readFile(pathController, 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    let result = data.replace(/Thing/g,  uperName,).replace(/thing/g,  lowerName).replace(/things/g, lowerName+"s");
                    fs.writeFile(pathController,  result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });  
                });
                console.log(chalk.green(`${lowerName}Controller:`), chalk.green.bold('DONE'))
            }
        })
    }) 
    readline.close();
});