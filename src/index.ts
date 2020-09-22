/**
 * 用于在项目打包之前根据环境生成不同的project.config.json
 */

const fs = require('fs')
import isTPL from './isTPL'

export default (ctx) => {
  const {
    initialConfig: {
      defineConstants: {
        APP_CONF,
      }
    },
    helper: {
      chalk
    },
    runOpts
  } = ctx

  const isMpTemplate = isTPL()
  ctx.onBuildStart(() => {
    console.log('');
    console.log(chalk.yellow('插件 '), 'taro-plugin-mp');
    console.log(chalk.greenBright('开始 '), '准备生成project.config.json文件');
    console.log(chalk.magentaBright('读取 '), '小程序appid ', APP_CONF.APPID);
    const USE_APPID = isMpTemplate ? APP_CONF.MP_TPL_APPID : APP_CONF.APPID

    // 已存在则直接读取本地文件
    if (fs.existsSync('./project.config.json')) {
      const projectConfigTemplate = fs.readFileSync('./project.config.json').toString().split('\n');
      const pageLine = projectConfigTemplate.findIndex(item => item.indexOf('appid') > -1);

      // appid替换
      projectConfigTemplate[pageLine] = `  "appid": "${USE_APPID}",`;
      const templateStr = `${projectConfigTemplate.join('\n')}`;

      // 项目名称替换
      const nameLine = projectConfigTemplate.findIndex(item => item.indexOf('projectname') > -1);
      projectConfigTemplate[nameLine] = `  "projectname": "${runOpts.config.projectName}",`;
      
      fs.writeFileSync('./project.config.json', templateStr);
    } else {
      // 否则根据模版新建文件
      const projectConfig = `
{
  "miniprogramRoot": "./dist",
  "projectname": "${runOpts.config.projectName||'Taro2.x项目模板'}",
  "description": "taro2.0项目模板",
  "appid": "${USE_APPID}",
  "setting": {
    "urlCheck": true,
    "es6": false,
    "postcss": false,
    "minified": false
  },
	"compileType": "miniprogram",
	"condition": {
		"search": {
			"current": -1,
			"list": []
		},
		"conversation": {
			"current": -1,
			"list": []
		},
		"plugin": {
			"current": -1,
			"list": []
		},
		"game": {
			"list": []
		},
		"miniprogram": {
			"current": 2,
			"list": [
				{
					"id": -1,
					"name": "首页",
					"pathName": "pages/index/index",
					"query": "",
					"scene": null
				}
			]
		}
	}
}
`
      fs.writeFileSync('./project.config.json', projectConfig)
    }

    console.log(chalk.blueBright('结束 '), 'project.config.json生成成功✅');
    console.log('');
  });
}

