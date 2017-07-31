const fs = require('fs');
const conf = { encoding: 'utf8' };

module.exports.read = path => {
  return new Promise((done, fail) => {
    fs.readFile(path, conf, (err, content) => {
      if (err) {
        fail(err);
      } else {
        done(content)
      }
    })
  });
};

module.exports.write = (file, data) => {
  return new Promise((done, fail) => {
    fs.writeFile(file, data, conf, err => {
      if (err) {
        fail(err);
      } else {
          done(file);
      }
    } )
  })
};