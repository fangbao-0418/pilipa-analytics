declare const wx: {
  request: (payload: {
    url: string
    method?: 'GET' | 'POST'
    header?: any
    data?: any
  }) => any
  setStorageSync: (
    key: string,
    value: any
  ) => void
  getStorageSync: (key: string) => any
}
declare const my: {
  httpRequest: (payload: {
    url: string
    method?: 'GET' | 'POST'
    headers?: any
    data?: any
  }) => any
  setStorageSync: (payload: {
    key: string,
    data: any
  }) => void
  getStorageSync: (payload: {key: string}) => any
}
declare module 'react-native'
