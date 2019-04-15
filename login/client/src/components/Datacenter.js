import React, { Component } from 'react'
// import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Client from './Client';
import {clients} from './UserFunction'

class DataCenter extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        selectedDC: "",
        clientData: [],

      }
    }
    
    handleChange = (e) =>{
      
      this.setState({selectedDC: e.target.value
        
        }, () => {

            const client = {
                dc: this.state.selectedDC,
            }

            clients(client).then(res => {
                console.log(client.dc)
                console.log(res)
                if(client.dc){
                   this.setState({
                        clientData: res.data,


                   }) 
                    // localStorage.setItem('usertoken', res.data.token)
                    // this.props.history.push('/profile')

                    console.log(client.dc)
                }
                else{
                    this.setState({
                        errors: res.data.error
                    }, console.log(this.state.errors))
                }
            })

    })}
        
    

  render() {

    const { clientData } = this.state


  
    // console.log(this.state.selectedOption);
    const { selectedDC } = this.state;

    const DC = [
      { value: 'CH3', label: 'CH3' },
      { value: 'LO5', label: 'LO5' },
      { value: 'S1', label: 'S1' },
      { value: 'AZCA', label: 'AZCA' },
      { value: 'AZSG', label: 'AZSG' },
      { value: 'AZDE', label: 'AZDE' },
      { value: 'AZAU', label: 'AZAU' },
      { value: 'AZBR', label: 'AZBR' }
    ];
    

    return (
      <div className="form-group">
        <label htmlFor="select2" >Select DataCenter</label>
        {/* <Select 
           value={selectedOption}
            onChange={this.handleChange}
            options={DC}
        /> */}
  <select value={selectedDC} onChange={this.handleChange} className="form-control" name="datacenter">
        <option value="" >Select...</option>
        { 
          DC.map((dc,i) => 
          <option key={i} value={dc.value}>
          {dc.label}
          </option>
        )}
      </select>
      <Client clientData={clientData} />
        </div>
                            
    )

  }

}

export default DataCenter
