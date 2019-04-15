import React, { Component } from 'react'
import {regster} from './UserFunction'

class Register extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
          first_name: '',
          last_name: '',
         email: '',
         password: '',
         errors: {}
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

        if (this.validateForm()) {
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        regster(newUser).then(res => {
                this.props.history.push('/login')
            
        })
    }
    }
    
    validateForm(){
         let first_name = this.state.first_name
         let last_name = this.state.last_name
         let email = this.state.email
         let password = this.state.password
         let errors = {};

            let formIsValid = true

            if(!first_name){
                formIsValid = false
                errors["first_name"] = "*Please enter your first_name.";
            }

            if(!last_name){
                formIsValid = false
                errors["last_name"] = "*Please enter your last_name.";
            }

            if(!email){
                formIsValid = false
                errors["email"] = "*Please enter your email.";
            }

            if(!password){
                formIsValid = false
                errors["password"] = "*Please enter your password.";
            }

            this.setState({
                errors: errors
              });

              return formIsValid;
    }
    
  render() {
    const  errorMsg= {
        color: 'red',
        // margin_bottom: '12px',
        margin: '0px',
        padding: '0px'

      };
    return (
      <div className='container'>
          <div className='row'>
              <div className='col-md-6 mt-5 mx-auto'>
                  <form onValidate onSubmit={this.onSubmit}>
                    <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input type='text'
                         className='form-control' 
                         name='first_name'
                        placeholder='Enter First Name'
                        value={this.state.first_name}
                        onChange={this.onChange}></input>
                    </div>
                    <div style={errorMsg}>{this.state.errors.first_name}</div>

                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input type='text'
                         className='form-control' 
                         name='last_name'
                        placeholder='Enter Last Name'
                        value={this.state.last_name}
                        onChange={this.onChange}></input>
                    </div>
                    <div style={errorMsg}>{this.state.errors.last_name}</div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type='email'
                         className='form-control' 
                         name='email'
                        placeholder='Enter email'
                        value={this.state.email}
                        onChange={this.onChange}></input>
                    </div>
                    <div style={errorMsg}>{this.state.errors.email}</div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type='password'
                         className='form-control' 
                         name='password'
                        placeholder='Enter password'
                        value={this.state.password}
                        onChange={this.onChange}></input>
                    </div>
                    <div style={errorMsg}>{this.state.errors.password}</div>
                    <button type='submit' className='btn btn-lg btn-primary btn-block'>
                    Register
                    </button>
                  </form>
              </div>
          </div>
        
      </div>
    )
  }
}

export default Register
