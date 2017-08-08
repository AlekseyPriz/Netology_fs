const fs = require('fs');



module.exports = (path, callback) => {

  let info = {
    type: undefined,
    content: undefined,
    path: path,
    childs: undefined
  };

  fs.stat(path, (err, stats) => {
    if (stats.isFile()) {
      info.type = 'file';
      fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
         if (err) collback(err);
        info.content = data;
        callback(null, info);
      })
    } else if (stats.isDirectory()) {
      info.type = 'directory';
      fs.readdir(path, { encoding: 'utf8' }, (err, files) => {
        if (err) throw err;
        info.childs = files;
        callback(null, info);
      })
    } else {
      let err = new Error('Что - то пошло не так');
    }
  });
};

