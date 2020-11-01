const path = require('path');

const APP_ROOT = path.resolve(__dirname, '../');

module.exports = {
  ENTRY: path.join(APP_ROOT, 'src'),
  ENTRY_SRC: path.join(APP_ROOT, 'src'),
  OUTPUT: path.join(APP_ROOT, 'dist')
}