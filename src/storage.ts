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
    } else {
      const currentTime = new Date().getTime()
      const date: any = new Date(currentTime + 3600 * 24 * 30 * 12 * 20 * 1000)
      const str = `${key}=${value}; expires=${date.toUTCString()};`
      document.cookie = str
    }
  },
  get (key: string, type = 'web') {
    let value = ''
    if (type === 'wx') {
      try {
        value = wx.getStorageSync(key)
      } catch (e) { }
    } else if (type === 'my') {
      const res = my.getStorageSync({key})
      value = res instanceof Object && res.data ? res.data : ''
    } else {
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
