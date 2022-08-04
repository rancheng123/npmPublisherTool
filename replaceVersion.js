var child_process = require('child_process')
var fs = require('fs')

start()
function start(){

    var programDir = process.argv[2]



    var res = child_process.execSync('npm view --registry http://10.0.0.44:4873/ zq-component  versions')

    var versions = res.toString().match(/\d+\.\d+\.\d+/g)
    var latestVersion = versions[versions.length - 1]
    var versionArr = latestVersion.split('.')


    var newVersion = [
        versionArr[0],
        versionArr[1],
        (Number(versionArr[2]) + 1).toString()
    ].join('.')



    var res = fs.readFileSync(programDir + '/package.json')
    var oldPackageJson = res.toString()
    var newContent = oldPackageJson.replace(/\"version\"\:\s*\"\d+\.\d+\.\d+\"/,(match)=>{
        return '"version":"'+ newVersion +'"'
    })
    fs.writeFileSync(programDir + '/package.json', newContent)

    process.stdout.write(`---newVersionStart ${newVersion} newVersionEnd----`)

}

