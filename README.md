
# usage
```
yarn add pilipa-analytics --registry https://npmregistry.i-counting.cn/
import Pa from 'pilipa-analytics'
const pa = new Pa('appid', 'userAgent', {
  env: 'production', // dev || production
  trigger: true // 是否发送请求
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
```
