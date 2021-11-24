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


  
// IOhandler.unzip(zipFilePath, pathUnzipped)
 IOhandler.readDir(pathUnzipped)
 .then((data) => console.log(data))
 .catch();