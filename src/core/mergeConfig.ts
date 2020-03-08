import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'
const strats = Object.create(null)
function defaultStrat(val1: any, val2: any): any {
  // 先取config2，没有就去config1
  return typeof val2 !== 'undefined' ? val2 : val1
}
function fromVal2Strat(val1: any, val2: any): any {
  // 只取config2
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat // 对于字段'url','params','data'，只取config2
})
const stratKeysDeepMerge = ['header']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
// config1是默认配置，config2是自定义配置
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      // 如果config2该项没有
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2[key])
  }
  return config
}
