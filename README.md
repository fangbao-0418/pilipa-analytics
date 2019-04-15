
# usage
```
yarn add pilipa-analytics --registry https://npmregistry.i-counting.cn/
import Pa from 'pilipa-analytics'
const pa = new Pa('appid', 'userAgent', {
  env: 'production', // development || production
  trigger: true // 是否发送请求 默认true
})
// 页面追踪
pa.trackPage({
  title: '页面标题',
  location: '页面地址',
  referer: '上一页'
})
// 事件追踪
pa.trackEvent({
  labelId: '',
  eventId: ''.
  params: {
    // ....
  }
})

m站示例
import Pa from 'pilipa-analytics'
const pa = new Pa('pilipa-official-wap', window.navigator.userAgent, {
  env: winddow.location.hostname === 'm.pilipa.cn' ? 'production' : 'development',
  trigger: true // 是否发送请求 默认true
})
// 页面追踪
pa.trackPage({
  title: document.title,
  location: window.location.href,
  referer: document.referrer
})
```

