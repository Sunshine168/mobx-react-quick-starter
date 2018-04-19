import React, { Component } from 'react'
import MobxForm from 'mobx-react-form'
import { observer } from 'mobx-react'

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'required|email|string|between:5,25',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25',
  },
  {
    name: 'passwordConfirm',
    label: 'Password Confirmation',
    placeholder: 'Confirm Password',
    rules: 'required|string|same:password',
  },
]

@observer
export default class FormDemo extends Component {
  constructor(props) {
    super(props)
    this.form = new MobxForm({ fields })
  }
  render() {
    return (
      <div>
        <input {...this.form.$('email').bind()} />
        <input {...this.form.$('passwordConfirm').bind()} type='checkbox' />
        <button
          onClick={() => {
            this.form.$('passwordConfirm').set('disabled', true)
          }}
        >
          updated
        </button>
      </div>
    )
  }
}
