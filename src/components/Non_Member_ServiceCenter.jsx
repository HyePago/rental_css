import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'

import './Header.css'

class Non_Member_ServiceCenter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned:'',
            name: '',
            email: '',
            certification_number: '',
            input_certification_number: '',
            phone_0: "010",
            phone_1: '',
            phone_2: '',
            division: "차량",
            category: "칭찬",
            title: '',
            contents: '',
            result: '',
            divison: '',
        }
    }

    click_home(){
        this.setState({returned:'h'});
    }
    click_sign_up(){
        this.setState({returned:'s'});
    }
    click_sign_in(){
        this.setState({returned:'i'});
    }
    click_ImageTest(){
        this.setState({returned:'t'});
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    emailChange(e){
        this.setState({email:e.target.value});
    }
    certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }
    phone_0Change(e){
        this.setState({phone_0:e.target.value});
    }
    phone_1Change(e){
        this.setState({phone_1:e.target.value});
    }
    phone_2Change(e){
        this.setState({phone_2:e.target.value});
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
    click_upload(){
        if(this.state.name=="" || this.state.email=="" || this.state.phone_0=="" || this.state.phone_1=="" || this.state.phone_2=="" || this.state.input_certification_number=="" || this.state.division=="" || this.state.category=="" || this.state.title=="" || this.state.contents==""){
            alert("빠짐없이 다 입력해주십시오");
            return;
        }
        this.submitGit_email_certification();
    }

    //upload
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
                alert("업로드에 성공하셨습니다.");
                document.location.href = "/";
            }
        }.bind(this))
    }

    submitGit_Upload(){
        this.setUpload({
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone_0+""+this.state.phone_1+""+this.state.phone_2,
            division: this.state.division,
            category: this.state.category,
            title: this.state.title,
            contents: this.state.contents
        })
    }

    //email
    emailAuthentication(opts){
        fetch('/email', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        //.then((json) => { this.setState({result:json.result}); })
    }

    submitGit_email(){
        if(this.state.email == ''){
            alert("이메일을 입력해주세요.");
            return;
        }

        var min = 100000;
        var max = 999999;
        var certification_number = parseInt(min + (Math.random() * (max-min)));

        this.setState({certification_number:certification_number});

        this.emailAuthentication({
            email: this.state.email,
            certification_number: certification_number
        });
    }

    email_certification(opts){
        fetch('/email_certification', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "false"){
                alert("인증번호를 다시 한 번 확인해주시길 바랍니다.");
                return;
            }

            this.submitGit_Upload();
        }.bind(this))
    }
    submitGit_email_certification(){
        this.email_certification({
            email: this.state.email,
            certification_number: this.state.input_certification_number
        })
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
                                                <table width="500">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="sign_up_logo"> 고객 정보 </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table className="email_certification_table">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                이름
                                                            </th>
                                                            <td>
                                                                <input type="text" onChange={this.nameChange.bind(this)} className="base_input"/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                이메일
                                                            </th>
                                                            <td>
                                                                <input type="text" name="email" onChange={this.emailChange.bind(this)}  className="base_input"/>
                                                                &nbsp;&nbsp;<button type="button" onClick={this.submitGit_email.bind(this)} className="find_id_email_send_button"> 인증번호 전송 </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                인증번호
                                                            </th>
                                                            <td>
                                                                <input type="number" onChange={this.certification_numberChange.bind(this)} className="base_input"/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                                전화번호
                                                            </th>
                                                            <td>
                                                                <select onChange={this.phone_0Change.bind(this)} className="mypage_phone_select">
                                                                    <option id="010" value="010">010</option>
                                                                    <option id="011" value="011">011</option>
                                                                    <option id="017" value="017">017</option>
                                                                </select>
                                                                &nbsp; - &nbsp;
                                                                <input type="number" max="9999" size="4" onChange={this.phone_1Change.bind(this)} className="mypage_phone_input"/>
                                                                &nbsp; - &nbsp;
                                                                <input type="number" max="9999" size="4" onChange={this.phone_2Change.bind(this)} className="mypage_phone_input"/>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width="500">
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
                                                                <select onChange={this.categoryChange.bind(this)}  className="select_base">
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
                                                                <textarea rows={10} cols={57} onChange={this.contentsChange.bind(this)}  className="input_notice_contents"/>
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
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        
        return writing_Form;
    }
}

export default Non_Member_ServiceCenter;