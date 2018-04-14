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

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path='/counter' component={LoadableComponent} />
        <DevTools />
      </div>
    )
  }
}

export default AppRouter
