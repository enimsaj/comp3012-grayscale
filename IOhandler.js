/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */
const unzipper = require("unzipper"),
  fs = require("fs").promises,
  PNG = require("pngjs").PNG,
  path = require("path");

const { createReadStream, createWriteStream } = require("fs");


/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .on('error',reject)
    .on('finish',resolve(pathOut))
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject)=>{
    fs.readdir(dir)
    .then(filenames => {
      let images = [];
      for (let filename of filenames) {
        if(path.extname(`${dir}/${filename}`) === ".png") images.push(filename);
      }
      resolve(images);
    })
    .catch((e)=>reject(e))    
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
 const grayScale = (pathIn, pathOut) => {
  
  return new Promise(async(resolve, reject)=>{ 
    createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed",async function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
  
          let gray = (this.data[idx] + this.data[idx+1] + this.data[idx+2])/3
          
          this.data[idx] = gray;
          this.data[idx + 1] = gray;
          this.data[idx + 2] = gray; 
          
        }
      }
      this.pack().pipe(createWriteStream(`${pathOut}`));
      resolve(`${pathOut}`);
    })
    .on("error",reject)
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
