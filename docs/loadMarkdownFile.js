const fs = require('fs')
const path = require('path')
function readFileList(path, filesList, basePath) {
    const files = fs.readdirSync(path)
    files.forEach(function (itm, index) {
        const stat = fs.statSync(path + itm)
        if (stat.isDirectory()) {
            // 递归读取文件
            readFileList(path + itm + '/', filesList, basePath)
        } else {
            const obj = {} // 定义一个对象存放文件的路径和名字
            obj.path = path.replace(basePath, '/') // 路径
            obj.filename = itm // 名字
            filesList.push(obj)
        }
    })
}
const getFileList = (filePath) => {
    let filesList = []
    const basePath = path.join(__dirname, filePath)
    readFileList(basePath, filesList, basePath)
    return filesList
}
const getMarkDownFiles = () => {
    let res = []
    let keyMap = {}
    let result = []
    const files = getFileList('../docs/')
    files.map(item => {
        item.filename.indexOf('.md') > -1 && res.push(item)
    })
    res.map(item => {
        let groupName = item.path.match(/[^/][^/]*/)
        groupName = groupName ? groupName[0] : null
        if (groupName) {
            if (item.filename === 'README.md') {
                lastPath = item.path
            } else {
                lastPath = item.path + item.filename
            }
            keyMap[groupName] ?
                keyMap[groupName].children.push(lastPath) :
                keyMap[groupName] = {
                    title: groupName,
                    collapsable: true,
                    children: [lastPath]
                }
        } else {
            result.push(item.path)
        }
    })
    result = result.concat(Object.values(keyMap))
    console.log(`┏========= Gen sidebar =============`)
    console.log(JSON.stringify(result, null, 4))
    console.log(`┗ ==================================`)
    return result
}
module.exports = {
    getMarkDownFiles
}
