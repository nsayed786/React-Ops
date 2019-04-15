import React, { Component } from 'react'
// import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios'
// import ODBC from './ODBC';

class Client extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        selectedOption: "",

      }
    }
    
    handleChange = (e) =>{
      this.setState({selectedOption: e.target.value
        
        }, () => {
            // console.log(`Option selected:`, this.state.selectedOption);
            // console.log(`Option selected:`, this.props.clientData[0].client_id);

        })
        
        
    }
  

  render() {

  
    // console.log(this.state.selectedOption);
    const { selectedOption } = this.state

    const divStyle = {
      display: 'inline-block',
      color: "red"
    
    };


    return (
      <div className="form-group">
        <label htmlFor="select2" >Select Client</label>
        <select value={selectedOption} onChange={this.handleChange} className="form-control">
        <option value="" disabled>Select...</option>
        {
          this.props.clientData.map(clientname => 
          <option key={clientname.client_id} value={clientname.client_id}>
          {clientname.client_full_name}
          </option>
        )}
      </select><h2  style={divStyle}>{this.state.selectedOption}</h2>

      
        {/* <ODBC val={this.state.selectedOption}/> */}
        
        </div>
    )
  }
}

export default Client
