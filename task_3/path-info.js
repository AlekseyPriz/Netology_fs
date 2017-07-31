const fs = require('fs');

var info = {
  type: undefined,
  content: undefined,
  path: undefined,
  childs: undefined
};

module.exports = (path, callback) => {

  info.path = path;
  let stats = fs.statSync(path);

  if (stats.isFile()) {
      info.type = 'file';
      info.content = fs.readFileSync(path,  { encoding: 'utf8' });
      callback(null, info);
  } else if (stats.isDirectory()) {
      info.type = 'directory';
      info.childs = fs.readdirSync(path);
      callback(null, info);
  } else {
      let err = new Error('Что - то пошло не так');
      callback(err);
  }
};