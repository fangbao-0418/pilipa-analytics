import storage from './storage'
import _ from './utils'
export interface ConfigProps {
  env?: 'development' | 'production'
  /** 是否发送请求 */
  trigger?: boolean
  /** 采集接口 */
  url?: string
}
const origin: {[type: string]: string} = {
  development: 'https://x-collector.i-counting.cn',
  production: 'https://collector.i-counting.cn'
}
class Pa {
  public appid: string
  public env: 'web' | 'wx' | 'rn' | 'my' = this.getEnv()
  public config = {
    env: 'development',
    trigger: true,
    url: ''
  }
  public origin: string
  public url: string
  /** 唯一身份id */
  public uniquedId: string
  public ua: string
  public constructor (appid: string, ua?: string | ConfigProps, config?: ConfigProps) {
    this.appid = appid
    if (ua !== undefined) {
      if (ua instanceof Object && config === undefined) {
        this.config = Object.assign({}, this.config, ua)
        this.ua = this.getUa()
      } else if (typeof ua === 'string') {
        this.ua = String(ua)
        this.config = Object.assign({}, this.config, config)
      } else {
        throw new Error('参数不正确')
      }
    } else {
      this.ua = this.getUa()
    }
    this.setEnv(config.env)
    this.getUniquedId()
  }
  public async getUniquedId () {
    this.uniquedId = await storage.get('gcookie', this.env)
    if (!this.uniquedId) {
      this.uniquedId = _.createUniqueId()
      storage.set('gcookie', this.uniquedId, this.env)
    }
    return this.uniquedId
  }
  public setEnv (env: 'development' | 'production') {
    this.config.env = env
    this.origin = origin[env]
    this.url = this.config.url ? this.config.url : this.origin + '/log.gif'
  }
  public getEnv () {
    let env: 'web' | 'wx' | 'my' | 'rn' = 'web'
    try {
      if (wx) {
        return env = 'wx'
      }
    } catch (e) {
    }
    try {
      if (my) {
        return env = 'my'
      }
    } catch (e) {
    }
    if (window && window.navigator && window.navigator.product === 'ReactNative') {
      env = 'rn'
    } else if (document) {
      env = 'web'
    } else {
      throw new Error('未知环境')
    }
    return env
  }
  /** 页面追踪 */
  public async trackPage (payload: {
    /** 网页标题 */
    title: string
    /** 当前url */
    location: string
    /** 来源url */
    referer: string
  }) {
    const params = {
      _aid: this.appid,
      _lid: 'page',
      _eid: 'pageview',
      _gc: await this.getUniquedId(),
      _ua: this.ua
    }
    const query = _.params(params)
    this.send(query, payload)
  }
  /** 事件追踪 */
  public async trackEvent (eventParams: {
    labelId: string
    eventId: string
    params: any
  }) {
    const params = {
      _aid: this.appid,
      _lid: eventParams.labelId,
      _eid: eventParams.eventId,
      _gc: await this.getUniquedId(),
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
    if (this.config.trigger) {
      _.http(this.env, this.url + '?' + query, params)
    }
  }
}
export default Pa
