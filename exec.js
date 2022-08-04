var chalk = require('chalk');
var child_process = require('child_process');
var iconv = require('iconv-lite');
var encoding = 'cp936';
encoding = 'utf-8';
var binaryEncoding = 'binary';


function parseCode(out){
    return iconv.decode(new Buffer(out, binaryEncoding), encoding)
}


let exec = ({
    command,cwd
            })=>{
    try{
        let res = child_process.execSync(command,{
            cwd: cwd,
            encoding: 'binary'
        })


        res = parseCode(res)

        console.log(chalk.green(res))
        return res
    }catch (err){


        let stdout = parseCode(err.stdout)
        let stderr = parseCode(err.stderr)

        console.log(stdout, stderr);
    }


}

module.exports = exec
