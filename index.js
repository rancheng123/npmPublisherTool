let cwd = 'D:/depoly/frontend/base-npm-component'

let inquirer = require('inquirer') ;
let fetch =require("node-fetch") ;
const exec = require("./exec");
// 设置项目属性
inquirer.prompt([
    {
        type: 'editor',
        name: 'log_content',
        message: '请输入更新日志:'
    }
    ])
    .then(answers => {
        let envBranch = process.argv[2]
        let {log_content} = answers
        publish(envBranch,log_content)

    })


function publish(envBranch,log_content){


    console.log(envBranch)

    if(!(envBranch === 'dev' || envBranch === 'stg' ||  envBranch === 'master')){
        console.log('请输入正确的分支名称， 如dev,stg,master')
        return;
    }

    exec({
        command: 'git checkout dev',
        cwd,
    })

    exec({
        command: 'git pull',
        cwd,
    })


    let res = exec({
        command: `node ./replaceVersion.js ${cwd}`,
    })



    let newVersion = res.match(/newVersionStart[\w\W]*newVersionEnd/)[0]
        .replace('newVersionStart','')
        .replace('newVersionEnd','')
        .trim()



    exec({
        command: `npm run copy:style && npm run buildCore && npm run addEslintDisable`,
        cwd,
    })

    exec({
        command: `npm publish --registry http://10.0.0.44:4873/ --tag ${envBranch}`,
        cwd,
    })




    fetch("http://localhost:3001/release/logs/update", {
        "body": JSON.stringify({
            version: newVersion,
            contents: log_content
        }),
        "method": "POST"
    }).then((res)=>{
        return res.json()
    }).then((res)=>{
        console.log(res)
    });


}




