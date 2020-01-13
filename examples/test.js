const fs = require('fs');
const path =require('path');
console.log(__dirname)
console.log(fs.readdirSync(__dirname));
fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    console.log(fs.statSync(fullDir).isDirectory())
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  },{})
