# taro-plugin-mp

taro小程序端插件，目前仅用于不同环境下project.config.json文件的动态生成。

## Usage

在不同的配置文件中配置不同的 APP_CONF.APPID

```js
// config/dev.js
module.exports = {
  defineConstants: {
    APP_CONF: {
      APPID: '"dev_app_id"',
    }
  },
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