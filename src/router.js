import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './component/loading'

const DevTools =
  process.env.NODE_ENV !== 'production' ? require('mobx-react-devtools').default : React.Fragment

const LoadableComponent = Loadable({
  loader: () => import('./screen/demo'),
  loading: Loading,
})

const FormDemo = Loadable({
  loader: () => import('./screen/form'),
  loading: Loading,
})

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path='/counter' exact component={LoadableComponent} />
        <Route path='/form' component={FormDemo} />
        <DevTools />
      </div>
    )
  }
}

export default AppRouter
