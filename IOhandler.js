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
  
const createReadStream = require('fs').createReadStream;

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
  return new Promise((resolve)=>{
    fs.readdir(dir)
    .then(filenames => {
      let images = [];
      for (let filename of filenames) {
        if(filename.includes('.png')) images.push(filename);
      }
      resolve(images);
    })    
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


};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
