const fs = require('fs');
const path = require('path');
const allowedExtensions = ['.png', '.svg'];

let files = fs.readdirSync('.');
files = files.filter((f) => allowedExtensions.includes(path.extname(f)) && !f.includes('-dark-'));
console.log(files);
// process.exit()

let htmlContent = fs.readFileSync('index.html');
htmlContent = htmlContent.toString();

const classes = [];
const elements = [];
for (let file of files) {
	const className = file.split('.')[0];
	classes.push(`.${className} {  background-image: url('${file}');}`);
	elements.push(`<div class="imgs background-imgs ${className}"><small>${className.split('-')[0]}</small></div>`);
	// console.log(classes.at(-1));
	// console.log(elements.at(-1));
}

const htmlStyleSplit = htmlContent.split('/* end-of-style */');
const newHtml = [htmlStyleSplit[0]];
newHtml.push(classes.join('\n'));
newHtml.push('/* end-of-style */');
const htmlImageSplit = htmlStyleSplit[1].split('<!-- end-of-images -->');
newHtml.push(htmlImageSplit[0]);
newHtml.push(elements.join('\n'));
newHtml.push('<!-- end-of-images -->');
newHtml.push(htmlImageSplit[1]);

fs.writeFileSync('index.html', newHtml.join('\n'));
