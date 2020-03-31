import './App.css';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {

  constructor(props){
    super(props)
  }
  
  refreshFileList = () => {
    console.log("File uploaded succesfully");
    this.setState({state:this.state});
  }

  
  render() {
    return (
      <div className="App">
        <h1 className='header'>File Uploading App</h1>
        <h1 className='footer'>&copy; 2020 sasken.com</h1>
        <hr className="dotted"></hr>
        <div className="fileUpload">
          <FileUpload refresh = {this.refreshFileList}></FileUpload>
        </div>
        <div className="fileList">
          <FileList></FileList>
        </div>
      </div>
    )
  }
}

export default App
