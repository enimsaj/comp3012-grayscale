/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;


  
IOhandler.unzip(zipFilePath, pathUnzipped)
 .then((pathUnzipped)=>IOhandler.readDir(pathUnzipped))
 .then(async (data) => {
    let i = 0;
    await data.forEach((image) => {
        let pathIn = `${pathUnzipped}/${image}`;
        let pathOut = `${pathProcessed}/out${i++}.png`;
        IOhandler.grayScale(pathIn,pathOut)
        .then(()=>console.log("complete "+ pathOut))
         .catch((err)=>console.log(err))
      })
    })
    .catch((err)=>{console.log(err)});
    