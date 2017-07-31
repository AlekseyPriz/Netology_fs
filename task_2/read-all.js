const fs = require('fs');
const conf = { encoding: 'utf8' };

function readDir(path) {
  return new Promise((done, fail) => {
    fs.readdir(path, conf, (err, files) => {
      if (err) {
        fail(err);
      } else {
        done(files);
      }
    })
  });
};

function readFile(fileName, filePath) {
  return new Promise((done, fail) => {
    fs.readFile(filePath + fileName, conf, (err, content) => {
      if (err) {
        fail(err);
      } else {
        done(content);
      }
    })
  });
};

module.exports = path => {
  return readDir(path)
    .then(filesArr => Promise.all(filesArr.map(file => {
      return readFile(file, path).then(content => {
        return {name:file, content}
      })
    })))
};