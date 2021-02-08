#! /usr/bin/env node

let chalk = require('chalk');
let fs = require('fs');

let readStreamRoute = fs.createReadStream('node_modules/@medjs/mrc-gen/generator/route.js');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(chalk.yellow('Write your file name? '), name => {
    if(!fs.existsSync('./routes')){
        fs.mkdirSync('./routes')
    }
    let lowerName = name.charAt(0).toLowerCase() + name.slice(1);
    let uperName = name.charAt(0).toUpperCase() + name.slice(1);
    let pathRoute = "./routes/"+ lowerName +"Route.js";
    let wStreamRoute = fs.createWriteStream(pathRoute);
    readStreamRoute.on('data', (data)=>{
        wStreamRoute.write(data, (err)=>{
            if(err){
                console.log(err.message)
            }else{
                fs.readFile(pathRoute, 'utf8', function (err,data) {
                    if (err) {
                        return console.log(err);
                    }
                    let result = data.replace(/thingController/g,  lowerName+'Controller',);
                    fs.writeFile(pathRoute,  result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });  
                });
                console.log(chalk.green(`${lowerName}Route:`), chalk.green.bold('DONE'))
            }
        })
    })
    readline.close();
});