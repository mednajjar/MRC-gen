#! /usr/bin/env node

let chalk = require('chalk');
let fs = require('fs');

let readStreamController = fs.createReadStream('node_modules/@medjs/mrc-gen/generator/controller.js');
let readStreamModel = fs.createReadStream('node_modules/@medjs/mrc-gen/generator/model.js');
let readStreamRoute = fs.createReadStream('node_modules/@medjs/mrc-gen/generator/route.js');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(chalk.yellow('Write your file name? '), name => {
    
    if(!fs.existsSync('./models')){
        fs.mkdirSync('./models')
    }
    if(!fs.existsSync('./controllers')){
        fs.mkdirSync('./controllers')
    }
    if(!fs.existsSync('./routes')){
        fs.mkdirSync('./routes')
    }
    let lowerName = name.charAt(0).toLowerCase() + name.slice(1);
    let uperName = name.charAt(0).toUpperCase() + name.slice(1);
    let pathModel = "./models/"+ uperName +".js";
    //--------------------------------------------------
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
    //------------------------------------------------
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
    //------------------------------------------------
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

