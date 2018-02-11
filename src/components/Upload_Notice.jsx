import React from 'react'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'

import './Header.css'

class Upload_Notice extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            content: '',
        }
    }

    titleChange(e){
        this.setState({title:e.target.value});
    }
    contentChange(e){
        this.setState({content:e.target.value});
    }

    // uplaod
    click_uplaod(){
        console.log("click_upload")
        if(this.state.title=='' || this.state.content==''){
            alert("빠짐없이 다 입력해주세요");
        } else {
            this.submitUpload();
        }
    }
    submitUpload(){
        console.log("submitUpload")
        this.setUploadNotice({
            title: this.state.title,
            content: this.state.content
        })
    }
    setUploadNotice(opts){
        console.log("setUploadNotice")
        fetch('/upload_notice', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result=="true"){
                document.location.href = "/";
            }else{
                alert("업로드에 실패하였습니다."); 
            }
        }.bind(this))
    }

    render(){
        let writing_Form = (
            <div>
                <table className="input_notice_table">
                    <tbody>
                        <tr>
                            <td>
                                제목
                            </td>
                            <td>
                                <input type="text" onChange={this.titleChange.bind(this)} size="49" className="input_notice_title"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                내용
                            </td>
                            <td>
                                <textarea rows={10} cols={57} onChange={this.contentChange.bind(this)} className="input_notice_contents" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td colSpan={2} align="center">
                                <button onClick={this.click_uplaod.bind(this)} className="input_notice_button"> 등록 </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        return writing_Form;
    }
}

export default Upload_Notice;