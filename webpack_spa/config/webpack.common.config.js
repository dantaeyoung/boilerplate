// webpack plugins
var path = require('path');

const srcDir = path.resolve(__dirname, '..', 'app');
const distDir = path.resolve(__dirname, '..', 'dist');

module.exports = {
	srcDir: srcDir,
	distDir: distDir,
  entry: {
    'app': [
      srcDir + '/main.js'
    ]
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules']
  }
  
};
