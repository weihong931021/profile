const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('/Users/weihong/Documents/profolio/public/resume.pdf');
pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('/Users/weihong/Documents/profolio/public/resume-text.txt', data.text);
    console.log("Extracted to resume-text.txt");
}).catch(console.error);
