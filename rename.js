const fs = require('fs');
const path = require('path');
const allowedExtensions = ['.png', '.svg'];

let files = fs.readdirSync('.');
files = files.filter((f) => allowedExtensions.includes(path.extname(f)));

for (let file of files) {
	const extname = path.extname(file);
	let basename = path.basename(file);
  // if (basename.includes('.')) {
  //   console.log(file.replace(/\.+/,'.'), file);
  // }
	// basename = basename.replaceAll('.', '-');
  // const newFile = `${basename}.${extname}`;
  fs.renameSync(file, file.replace(/\.+/,'.'));
}
