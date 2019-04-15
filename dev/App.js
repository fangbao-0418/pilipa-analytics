import React from 'react'
import Pa from '../src'
const pa = new Pa('appdemo', 'custom ua', {
  // trigger: true,
  env: 'dev'
})
console.log(pa, 'pa')
export default class App extends React.Component {
  componentDidMount () {
    pa.trackPage({
      title: '测试',
      location: '/abc',
      referer: '/b'
    })
  }
  render () {
    return (
      <div>
        <button
          onClick={() => {
            // pa.trackPage({
            //   title: 'abc',
            //   location: '/abc'
            // })
            pa.trackEvent({
              labelId: 'a',
              eventId: 'b',
              params: {
                a: '222',
                b: '233'
              }
            })
          }}
        >点击</button>
      </div>
    )
  }
}
