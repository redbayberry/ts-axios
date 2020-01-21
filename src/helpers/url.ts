import { isDate, isPlainObject } from './util'
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any) {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values: string[]
    if (Array.isArray(val)) {
      values = val
      key += '[]' //如果是数组，那么请求是`/base/get?foo[]=bar&foo[]=baz'`，所有key就是key加上[]
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        //如果是日期
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        //如果是对象
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedparmas = parts.join('&')
  if (serializedparmas) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedparmas
  }
  return url
}
