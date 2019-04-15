import React, { Component } from 'react'
import {login} from './UserFunction'

class Login extends Component {
    

    constructor(props) {
      super(props)
    
      this.state = {
         email: '',
         password: '',
         errors: ''
      }

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            console.log(user)
            console.log(res)
            if(res.data.token){
                localStorage.setItem('usertoken', res.data.token)
                this.props.history.push('/profile')
            }
            else{
                this.setState({
                    errors: res.data.error
                }, console.log(this.state.errors))
            }
        })
    }
    
  render() {
    const h4Style = {
        color: 'red',
        text: 'center'
      };
    return (
      <div className='container'>
          <div className='row'>
              <div className='col-md-6 mt-5 mx-auto'>
                  <form onValidate onSubmit={this.onSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>
                    <h5 style={h4Style}>{this.state.errors}</h5>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type='email'
                         className='form-control' 
                         name='email'
                        placeholder='Enter email'
                        value={this.state.email}
                        onChange={this.onChange}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type='password'
                         className='form-control' 
                         name='password'
                        placeholder='Enter password'
                        value={this.state.password}
                        onChange={this.onChange}></input>
                    </div>
                    <button type='submit' className='btn btn-primary btn-md'>
                    Sign In
                    </button>
                  </form>
              </div>
          </div>
        
      </div>
    )
  }
}

export default Login
