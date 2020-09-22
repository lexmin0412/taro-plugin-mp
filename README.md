# taro-plugin-mp

taro小程序端插件，目前仅用于不同环境下project.config.json文件的动态生成。

查看更新日志请前往[CHANGELOG](https://github.com/cathe-zhang/taro-plugin-mp/blob/master/CHANGELOG.md)

## Usage

### 在不同的配置文件中配置不同的 APP_CONF.APPID

```js
// config/dev.js
module.exports = {
  defineConstants: {
    APP_CONF: {
      APPID: '"dev_app_id"',
    }
  }
}
```

```js
// config/pro.js
module.exports = {
  defineConstants: {
    APP_CONF: {
      APPID: '"pro_app_id"',
    }
  },
}
```

编译开始后，插件即可根据配置的不同 APPID 生成不同的 project.config.json 文件。

### 指定当前小程序为第三方开发模版小程序

第一步，在 config 文件中指定模版小程序 appid

```js
// config/index.js
module.exports = {
  defineConstants: {
    APP_CONF: {
      MP_TPL_APPID: '', // 这里写模版小程序appid
    }
  }
}
```

第二步，在package.json 中添加如下脚本

```json
{
  "scripts": {
    "build:mp-pro-tpl": "taro build --type weapp env=pro --tpl",  // --tpl 参数用于插件判断是否打包为模版小程序
  }
}
```

这样，在编译完成之后，打包的就是 APP_CONF 中指定的 MP_TPL_APPID 对应的第三方模版小程序了。
