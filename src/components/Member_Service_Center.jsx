import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './Header.css'

class Member_Service_Center extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: '',
            division: "차량",
            category: "칭찬",
            title: '',
            contents: '',
            result: '',
        }
    }

    click_home(){
        window.location.reload();
    }
    click_rent(){
        this.setState({state_1:'r'});
    }
    click_reservation(){
        this.setState({state_1:'e'});
    }
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});
        window.location.reload();
    }
    divisionChange(e){
        this.setState({division:e.target.value});
    }
    categoryChange(e){
        this.setState({category:e.target.value});
    }
    titleChange(e){
        this.setState({title:e.target.value});
    }
    contentsChange(e){
        this.setState({contents:e.target.value});
    }

    //uplaod
    setUpload(opts){
        fetch('/upload_service_center', {
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
            }
        }.bind(this))
    }

    submitGit_Upload(){
        this.setUpload({
            division: this.state.division,
            category: this.state.category,
            title: this.state.title,
            contents: this.state.contents,
            email: cookie.load('email'),
            name: cookie.load('name'),
            phone: cookie.load('phone')
        });
    }

    click_upload(){
        if(this.state.division=="" || this.state.category=="" || this.state.title=="" || this.state.contents==""){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }
        
        this.submitGit_Upload();
    }

    render(){
        let writing_Form = (
            <div>
                <table className="non_member_service_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="500">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 의견 작성 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr>
                                            <th> 
                                                구분
                                            </th>
                                            <td>
                                               <select onChange={this.divisionChange.bind(this)} className="select_base">
                                                    <option value="차량">차량</option>
                                                    <option value="사이트">사이트</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                카테고리
                                            </th>
                                            <td>
                                                <select onChange={this.categoryChange.bind(this)} className="select_base">
                                                    <option value="칭찬">칭찬</option>
                                                    <option value="불만">불만</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                제목
                                            </th>
                                            <td>
                                                <input type="text" onChange={this.titleChange.bind(this)} size="49" className="input_notice_title" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 
                                                내용
                                            </th>
                                            <td>
                                                <textarea rows={10} cols={57} onChange={this.contentsChange.bind(this)} className="input_notice_contents" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.click_upload.bind(this)} className="non_member_service_table_button"> 등록 </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        return writing_Form;
    }
}

export default Member_Service_Center;