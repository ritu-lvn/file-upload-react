
import React, { Component } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
const BaseUrl = 'https://server-file-upload.herokuapp.com/';


class FileUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            isFileSelected: false,
            uploadPercentage: 10
        }
    }


    changeHandler = event => {
        console.log("file selected")
        if (event.target.files[0] != null) {
            var FileSize = event.target.files[0].size / 1024 / 1024; // in MB
            if (FileSize > 1) {
                alert('File size exceeds 1 MB');
                this.setState({
                    selectedFile: null,
                    isFileSelected: false
                })
                document.getElementById("fileControl").value = "";
            } else {
                console.log("file selected")
                this.setState({
                    selectedFile: event.target.files[0],
                    isFileSelected: true
                })
            }
        } else {
            console.log("file not selected")
            this.setState({
                selectedFile: null,
                isFileSelected: false
            })
        }
    }


    uploadFile = fileToUpload => {

        const url = `${BaseUrl}uploadfile`;
        const formData = new FormData();
        formData.append('myFile', fileToUpload)

        var config = {
            onUploadProgress: function (progressEvent) {

                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                console.log(this.uploadPercentage);
                if (percent < 100) {
                    this.setState({ uploadPercentage: percent })
                }
            }
        };


        axios.post(url, formData, config).then(response => {
            console.log("Indside RESPONSE")
            console.log(response);
            this.props.refresh();
            document.getElementById("fileControl").value = "";
            this.setState({ selectedFile: null, isFileSelected: false, uploadPercentage: 100 }, () => {
                setTimeout(() => {
                    this.setState({ uploadPercentage: 0 })
                }, 1000);
            })
        }).catch(error => {
            console.log(error.response);
            if (error.response) {
                alert(`Error : ${error.response.data.message}`);
            } else {
                alert(`${error}`);
            }
        })
    }


    render() {
        const { uploadPercentage } = this.state;
        return (
            <div className='fileUpload'>
                <div>
                    <h2>Upload Files:</h2>
                    <input type="file" id="fileControl" accept=".txt,.jpeg,.pdf,.json,.odt,.jpeg,.png,.jpg" name="file" onChange={this.changeHandler}></input>
                    {this.state.isFileSelected ? <button className="upload" onClick={() => this.uploadFile(this.state.selectedFile)}>Upload</button> : null}
                </div>
                <br></br>
                <div>
                    {uploadPercentage > 0 && <ProgressBar striped animated now={uploadPercentage} active label={`${uploadPercentage}%`} />}
                </div>
                <br></br>
                <div>
                    <label> <p>  Only upload the text, pdf, json and image files.
                            </p> And file size should be less than 1MB.</label>
                </div>
            </div>
        )
    }
}

export default FileUpload
