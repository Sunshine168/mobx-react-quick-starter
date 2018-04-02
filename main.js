/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './src'

const render = Component => {
  ReactDOM.render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('app'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept(['./src/app', './src/store'], () => {
    const newApp = require('./src/app').default
    render(hot(module)(newApp))
  })
}
