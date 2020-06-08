"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ctx, options) => {
    const { ENV_LIST } = options;
    const { initialConfig: { defineConstants: { APP_CONF } }, helper: { chalk } } = ctx;
    ctx.onBuildStart(() => {
        console.log(ctx.helper.chalk.yellow('插件 '), 'taro-plugin-check-env');
        console.log(ctx.helper.chalk.greenBright('开始 '), '检查环境变量');
        for (const key in ENV_LIST) {
            if (ENV_LIST.hasOwnProperty(key)) {
                const element = ENV_LIST[key];
                if (!APP_CONF[key]) {
                    console.log(chalk.red('错误 '), `缺少环境变量: ${element} - ${key}`);
                    throw '环境变量检查不通过';
                }
                else {
                    console.log(`${chalk.magentaBright('读取 ')}`, `${key} `, APP_CONF[key]);
                }
            }
        }
        console.log(chalk.blueBright('结束 '), '环境变量检查通过✅');
        console.log('');
    });
};
//# sourceMappingURL=index.js.map