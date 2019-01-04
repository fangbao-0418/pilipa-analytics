import storage from './storage'
import _ from './utils'

class Pa {
  public appid: string
  public ua: string
  public env: 'web' | 'wx' | 'my' = this.getEnv()
  public origin = 'https://x-collector.i-counting.cn/'
  public url = this.origin + 'log.gif'
  /** 唯一身份id */
  public uniquedId = storage.get('gcookie', this.env) || ''
  public constructor (appid: string, ua?: string) {
    this.appid = appid
    this.ua = ua || this.getUa()
    if (!this.uniquedId) {
      this.uniquedId = _.createUniqueId()
      storage.set('gcookie', this.uniquedId, this.env)
    }
  }
  public getEnv () {
    let env: 'web' | 'wx' | 'my' = 'web'
    try {
      if (wx) {
        env = 'wx'
      }
    } catch (e) {
    }
    try {
      if (my) {
        env = 'my'
      }
    } catch (e) {
    }
    return env
  }
  /** 页面追踪 */
  public trackPage (payload: {
    /** 网页标题 */
    title: string
    /** 当前url */
    location: string
    /** 来源url */
    referer: string
  }) {
    const params = {
      _lid: 'page',
      _eid: 'pageview',
      _gc: this.uniquedId,
      _ua: this.ua
    }
    const query = _.params(params)
    this.send(query, payload)
  }
  /** 事件追踪 */
  public trackEvent (eventParams: {
    labelId: string
    eventId: string
    params: any
  }) {
    const params = {
      _lid: eventParams.labelId,
      _eid: eventParams.eventId,
      _gc: this.uniquedId,
      _ua: this.ua
    }
    const query = _.params(params)
    this.send(query, eventParams.params)
  }
  public getUa () {
    let ua = ''
    if (this.getEnv() === 'web') {
      ua = window.navigator.userAgent
    }
    return ua
  }
  public send (query: string, params?: any) {
    _.http(this.env, this.url + '?' + query, params)
  }
}
export default Pa
