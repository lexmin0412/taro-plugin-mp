"use strict";
/**
 * 用于在项目打包之前根据环境生成不同的project.config.json
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
exports.default = (ctx) => {
    const { initialConfig: { defineConstants: { APP_CONF } }, helper: { chalk } } = ctx;
    ctx.onBuildStart(() => {
        console.log(chalk.yellow('插件 '), 'taro-plugin-mp');
        console.log(chalk.greenBright('开始 '), '准备生成project.config.json文件');
        console.log(chalk.magentaBright('读取 '), '小程序appid ', APP_CONF.APPID);
        const projectConfig = `
{
  "miniprogramRoot": "./dist",
  "projectname": "taro-template",
  "description": "taro2.0项目模板",
  "appid": ${APP_CONF.APPID},
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
`;
        fs.writeFileSync('./project.config.json', projectConfig);
        console.log(chalk.blueBright('结束 '), 'project.config.json生成成功✅');
    });
};
//# sourceMappingURL=index.js.map