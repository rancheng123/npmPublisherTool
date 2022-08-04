const exec = require("./exec");
let cwd = 'D:/depoly/frontend/base-npm-component'
let res = exec({
    command: `node ./replaceVersion.js ${cwd}`,
})

console.log('===================',res,'===================')
