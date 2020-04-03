import React, { Component } from 'react';
import axios from 'axios';
const BaseUrl = 'https://serverfileupload.herokuapp.com/';

class FileList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fileArr: [],
            searchResultArr: [],
            refresh: false
        }
    }


    //To fetch all uploaded files
    componentDidMount() {
        console.log("Did mount")
       this.refreshFileList();
    }

    componentWillReceiveProps() {
        console.log("Will recieve prps")
       this.refreshFileList();
    }

    //To fetch all uploaded files
    refreshFileList = () => {
        axios.get(`${BaseUrl}listfiles`).then(response => {
            console.log("@@@@@@@@@@@@");
            console.log(response.data);
            this.setState({
                fileArr: response.data,
                searchResultArr: response.data
            })
        }).catch(error => {
            if (error.response) {
                alert(`Error : ${error.response.data.message}`);
            } else {
                alert(`${error}`)
            }
            console.log(error);
        })
    }



    //To delete a uploaded file
    deleteFile = id => {
        if (id) {
            if (window.confirm(`Do you want to delete the item ${id}?`)) {
                const url = `${BaseUrl}deletefile/`;
                axios.delete(`${url}${id}`).then(response => {
                    console.log(response);
                    this.refreshFileList()
                }).catch(error => {
                    if (error.response) {
                        alert(`Error : ${error.response.data.message}`);
                    } else {
                        alert(`${error}`)
                    }
                    console.log(error);
                })
            }
        } else {
            alert("Unable to delete a file");
        }
    }


    //Search file by ID or Name
    searchHandler = searchText => {
        var originalArr = this.state.fileArr
        var resArr = originalArr.filter(function (file) {
            return (file.FileID.includes(searchText.target.value.toLowerCase()));
            //((file.fileId.includes(searchText.target.value)) ||
        });
        if ((searchText.target.value) !== "") {
            this.setState({
                fileArr: resArr
            })
        } else {
            console.log("empty search")
            this.setState({
                fileArr: this.state.searchResultArr
            })
        }

        if (resArr.length === 0) {
            this.setState({
                fileArr: this.state.searchResultArr
            })
        }
    }



    renderTableData() {
        console.log(this.props)
        return this.state.fileArr.map((file) => {
            const { FileID, FileName, FileSize, FileUploadedDate } = file //destructuring
            console.log("----INSIDE RENDER -----")
            return (
                <tr key={FileID}>
                    <td></td>
                    <td>{FileID}</td>
                    <td>{FileName}</td>
                    <td>{(new Date(FileUploadedDate)).toString()}</td>
                    <td>{FileSize}</td>
                    <td><button className="delete" onClick={() => this.deleteFile(FileID)}>Delete</button></td>
                </tr>
            )
        })
    }


    render(props) {
        if (this.state.fileArr.length > 0) {
            return (
                <div>
                    <h2>Uploaded Files List:</h2>
                    <div className="search">
                        <input type="text" placeholder="Search file by id" onChange={this.searchHandler}></input>
                    </div>
                    <div className="tableDiv">
                        <table className="css-serial">
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>File Id</th>
                                    <th>File Name</th>
                                    <th>Last Uploaded Date</th>
                                    <th>File Size (Bytes)</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Uploaded Files List:</h2>
                    <p>No files uploaded</p>
                </div>
            )
        }
    }
}

export default FileList