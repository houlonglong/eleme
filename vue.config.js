const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname,'./src/components/'),
        'common': path.resolve(__dirname,'./src/common/'),
        'components': path.resolve(__dirname,'./src/components/')
      }
    }
  }
}