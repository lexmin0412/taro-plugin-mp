const argV = process.argv

/**
 * 判断是否打包为模版项目 如果是则做相关处理
 */
const isTPL = () => {
  let isTPL = false
  const isTPLParamIndex = argV.findIndex(item => item.indexOf('--tpl') > -1)
  if (isTPLParamIndex > -1) {
    isTPL = true
  }
  return isTPL
}

export default isTPL
