import React from 'react'
import ReactDOM from 'react-dom'

class ImageTest extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            url:'',
            formdata:''
        }
    }
    fileChange(e){
        var formData  = new FormData();
        var data = e.currentTarget.files;

        for(var name in data) {
            formData.append(name, data[name]);
            console.log(name + ", " + e.currentTarget.files[name]);
        }

        this.setState({formdata:formData});
    }

    setUpload(){
        var PATH = "http://localhost:5000/public/upload_image/";        

        fetch('/upload_image', {
            method: 'POST',
            body: this.state.formdata
        })
        .then((response) => {return response.json(); })
        .then((json) => { this.setState({url:PATH + json.url}); })
    }

    UploadCheck(e){
        /*if(this.state.file==""){
            alert("파일을 선택해주세요.");
            return;
        }*/

        if(this.state.formdata == ""){
            alert("파일을 선택해주세요.");
            return;
        }

        this.setUpload();
    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.fileChange.bind(this)} name="uploadfile" />
                <input type="hidden" name="token" value="{{.}}"/>
                <button onClick={this.UploadCheck.bind(this)}>Upload</button>
                <img src={this.state.url} />
                <br />                                                                                                                                                                                                                  
            </div>
        )
    }
}

module.exports = ImageTest;