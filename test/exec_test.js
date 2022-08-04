const exec = require("../exec");
let cwd = 'D:/depoly/frontend/base-npm-component'
let res = exec({
    command: `node ${cwd}/replaceVersion.js`,
    cwd,
})

let newVersion = res.match(/newVersionStart[\w\W]*newVersionEnd/)[0]
    .replace('newVersionStart','')
    .replace('newVersionEnd','')
    .trim()

console.log(newVersion,'---version-----')
