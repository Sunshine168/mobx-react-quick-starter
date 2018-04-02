/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { decorate, observable, action } from 'mobx'

import { Container } from './component'

type Props = {
  count: number,
  increase: () => void,
  decrease: () => void,
}

const TestElement = styled.div`
  background: url(${require('../../assets/images/koa-mids.png')});
  width: 100px;
  height: 100px;
`

@inject(stores => ({
  count: stores.counter.count,
  increase: stores.counter.increase,
  decrease: stores.counter.decrease,
}))
@observer
class Demo extends Component<Props> {
  tempCount = 0

  @action.bound
  tempIncrease() {
    this.tempCount += 1
  }

  render() {
    console.log('render234')
    return (
      <Container>
        <button onClick={this.props.increase}>+</button>
        <button onClick={this.props.decrease}>-</button>
        <div>{this.props.count}</div>
        <div>{this.tempCount}</div>
        <TestElement />
      </Container>
    )
  }
}

export default decorate(Demo, { tempCount: observable })
