import md5 from './md5'
export function params (source: {[key: string]: any}) {
  const arr = []
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      arr.push(`${key}=${source[key]}`)
    }
  }
  return arr.join('&')
}
export function webFetch (url: string, payload?: any) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params(payload)
  })
}
export function wxFetch (url: string, payload?: any) {
  wx.request({
    url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: params(payload)
  })
}
export function myFetch (url: string, payload?: any) {
  my.httpRequest({
    url,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: params(payload)
  })
}
export function http (type: 'wx' | 'my' | 'web' | 'rn' = 'web', url: string, payload?: any) {
  if (type === 'my') {
    myFetch(url, payload)
  } else if (type === 'wx') {
    wxFetch(url, payload)
  } else {
    webFetch(url, payload)
  }
}
export function getRandomStr (len: number = 2) {
  let str = ''
  const template = 'abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 0; i < len; i++) {
    const index = Math.round(Math.random() * (template.length - 1))
    str += template[index]
  }
  return str
}
export function createUniqueId () {
  const str = new Date().getTime() + getRandomStr(32)
  return md5(str, 32)
}
export default {
  params,
  http,
  createUniqueId
}
