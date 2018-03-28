/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './src'

const render = Component => {
  ReactDOM.render(
    <AppContainer warnings={false}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('app'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept(['./src', './src/store'], () => {
    const newApp = require('./src').default
    render(newApp)
  })
}
