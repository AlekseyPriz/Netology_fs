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
         if (err) return callback(err);
        info.content = data;
        return callback(null, info);
      })
    } else if (stats.isDirectory()) {
      info.type = 'directory';
      fs.readdir(path, { encoding: 'utf8' }, (err, files) => {
        if (err) return callback(err);
        info.childs = files;
        return callback(null, info);
      })
    } else {
      return callback(err);
    }
  });
};

