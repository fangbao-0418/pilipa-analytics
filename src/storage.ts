let rnAsyncStorage: any = {}
try {
  if (window && window.navigator && window.navigator.product === 'ReactNative') {
    rnAsyncStorage = require('react-native').AsyncStorage
  }
} catch (e) {
  rnAsyncStorage = {}
  // console.error(e)
} finally {
  console.log('')
}
export default {
  set (key: string, value: string, type: string = 'web') {
    if (type === 'wx') {
      try {
        wx.setStorageSync(key, value)
      } catch (e) { }
    } else if (type === 'my') {
      my.setStorageSync({
        key,
        data: value
      })
    } else if (type === 'rn') {
      try {
        rnAsyncStorage.setItem(key, value)
      } catch (e) {
        // throw new Error(e)
      }
    } else if (type === 'web') {
      const currentTime = new Date().getTime()
      const date: any = new Date(currentTime + 3600 * 24 * 30 * 12 * 20 * 1000)
      const str = `${key}=${value}; expires=${date.toUTCString()};`
      document.cookie = str
    }
  },
  async get (key: string, type = 'web') {
    let value = ''
    if (type === 'wx') {
      try {
        value = wx.getStorageSync(key)
      } catch (e) { }
    } else if (type === 'my') {
      const res = my.getStorageSync({key})
      value = res instanceof Object && res.data ? res.data : ''
    } else if (type === 'rn') {
      try {
        // const AsyncStorage = require('react-native')
        value = await rnAsyncStorage.getItem(key)
      } catch (e) {
        // throw new Error(e)
      }
    } else if (type === 'web') {
      if (key) {
        const arr: any = document.cookie.split('; ')
        for (const item of arr) {
          if (new RegExp(key + '=').test(item)) {
            value = item.substring(key.length + 1)
          }
        }
      } else {
        throw new Error('name is not empty')
      }
    }
    return value
  }
}
