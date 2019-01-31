const {getMarkDownFiles} = require('../loadMarkdownFile')
module.exports = {
    serviceWorker: true,
    themeConfig: {
        docsDir: 'docs',
        docsBranch: 'docs',
        editLinks: true,
        sidebarDepth: 3,
        sidebar: getMarkDownFiles()
    }
}
