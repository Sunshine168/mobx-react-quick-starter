import React from 'react'
import { Route } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import Loadable from 'react-loadable'
import Loading from './component/loading'

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
