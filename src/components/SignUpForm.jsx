import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"
import { Link } from 'react-router-dom'
import './Sign_Up_Style.css'

class SignUpForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            username: '',
            username_ch: '',
            password: '',
            password_confirm: '',
            email: '',
            phone_0: '010',
            phone_1: '',
            phone_2: '',
            license_category: '1',
            license_type: '1',
            license_number_0: '1',
            license_number_1: '',
            license_number_2: '',
            license_number_3: '',
            date_if_issue: '',
            aptitude_test: '',
            result: '',
            signed: 'up',
            certification_number: '',
            input_certification_number: '',
        };
    }

    setSignUp(opts){
        fetch('/sign_up', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == true){
                alert("회원가입에 성공하였습니다.");
                document.location.href = "/";
            }else if(this.state.result == "email"){
                alert("인증번호를 다시 한 번 확인해주시길 바랍니다.");
            }else{
                alert("만들어놓은 아이디가 있는지 확인해주시길 바랍니다.");
            }
        }.bind(this));
    }

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
            email:this.state.email,
            certification_number:certification_number
        });
    }

    submitGit(){
        this.setSignUp({
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone_0+""+this.state.phone_1+""+this.state.phone_2,
            license_category: this.state.license_category,
            license_type: this.state.license_type,
            license_number: this.state.license_number_0+""+this.state.license_number_1+""+this.state.license_number_2+""+this.state.license_number_3,
            date_if_issue: this.state.date_if_issue,
            aptitude_test: this.state.aptitude_test,
            certification_number: this.state.input_certification_number
        });
    }


    chkPwd(){
        var pw = this.state.password;
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        var blank_pattern = /[\s]/g;

        if(pw.length<8 || pw.length>16){
            alert("9자리 ~ 16자리 이내로 입력해주세요.");
            return false;
        }
        else if(blank_pattern.test(pw)==true){
            alert("비밀번호는 공백없이 입력해주세요.");
            return false;
        }
        else if(num<0 || eng<0 || spe<0){
            alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.")
            return false;
        }
        else{
            return true;
        }
    }

    nameChange(e){
        this.setState({name:e.target.value});
    }
    usernameChange(e){
        this.setState({username:e.target.value});
    }
    passwordChange(e){
        this.setState({password:e.target.value});
    }
    password_confirmChange(e){
        this.setState({password_confirm:e.target.value});
    }
    emailChange(e){
        this.setState({email:e.target.value});
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
    license_categoryChange(e){
        this.setState({license_category:e.target.value});
    }
    license_typeChange(e){
        this.setState({license_type: e.target.value});
    }
    license_number_0Change(e){
        this.setState({license_number_0: e.target.value})
    }
    license_number_1Change(e){
        this.setState({license_number_1: e.target.value});
    }
    license_number_2Change(e){
        this.setState({license_number_2: e.target.value});
    }
    license_number_3Change(e){
        this.setState({license_number_3: e.target.value});
    }
    date_if_issueChange(e){
        var date_if = e.target.value;
        date_if = date_if.replace(/\-/g,'');
        this.setState({date_if_issue:date_if});
    }
    aptitude_testChange(e){
        var date_if = e.target.value;
        date_if = date_if.replace(/\-/g,'');
        this.setState({aptitude_test:date_if});
    }
    input_certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }

   /* maxLengthCheck(object){
        if(object.value.length>object.maxLength){
            object.value=object.value.slice(0, object.max.length);
        }
    }*/

    idOverlap(username){
        if(this.state.username.length<4 || this.state.username.length>15){
            alert("아이디를 5자리 ~ 15자리 이내로 입력해주세요.");
            return;
        }
        else{
            fetch('/id_overlap', {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'username='+this.state.username
            })
            .then((response) => { return response.json(); })
            .then((json) => { this.setState({username_ch:json.users}); })
            .then(function(){
                if(this.state.username_ch == 116){
                    alert("사용 가능한 아이디입니다.");
                    return;
                }
                else{
                    alert("이미 사용중인 아이디입니다, 다른 아이디를 입력해주십시오.");
                }
            }.bind(this));
        }
    }

    SignUpCheck(){
        if(this.state.name=="" || this.state.username=="" || this.state.password=="" || this.state.password_confirm=="" || this.state.email=="" || this.state.phone_1=="" || this.state.phone_2=="" || this.state.license_number_1=="" || this.state.license_number_2=="" || this.state.license_number_3==""){
            alert("빠짐없이 다 입력해주십시오.");
            return;
        }

        if(this.state.username.length<4 || this.state.username.length>15){
            alert("아이디를 5자리 ~ 15자리 이내로 입력해주세요.")
            return;
        }
        else{
            fetch('/id_overlap', {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: 'username='+this.state.username
            })
            .then((response) => { return response.json(); })
            .then((json) => { this.setState({username_ch:json.users}); })
            .then(function(){
                if(this.state.username_ch == 116){
                }
                else{
                    alert("이미 사용중인 아이디입니다, 다른 아이디를 입력해주십시오.");
                    return;                    
                }
            }.bind(this));
        }

        if(!(this.chkPwd())){
            return;
        }
        if(this.state.password != this.state.password_confirm){
            alert("비밀번호 확인을 확인해주세요.");
            return;
        }

        this.submitGit();
    }

    //&nbsp;&nbsp;<span>{this.state.password_confirm_feedback}</span>
    
    render(){
        let sign_up_Form = (
            <div>
                <table width="940" className="sign_up_out_table">
                    <tbody>
                        <form name="write_form_member" method="post">
                            <tr>
                                <td>
                                    <div className="sign_up_logo"> 회원가입 폼 </div>
                                </td>
                            </tr>
                            <tr height={2} bgcolor="cadetblue">
                                <td></td>
                            </tr>
                            <tr height="372px">
                                <td colSpan={2}>
                                    <table width="780" className="sign_up_inner_table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="940" className="singup_innertable">
                                                        <tbody>
                                                            <tr>
                                                                <th>이름</th>
                                                                <td>
                                                                    <input type="text" onChange={this.nameChange.bind(this)} size={7} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>아이디</th>
                                                                <td>
                                                                    <input type="text" onChange={this.usernameChange.bind(this)} maxLength={15} size={15} />
                                                                    <button type="button" onClick={this.idOverlap.bind(this)} className="sign_up_inner_table_button">아이디 중복 확인</button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>비밀번호</th>
                                                                <td>
                                                                    <input type="password" onChange={this.passwordChange.bind(this)} maxLength={16} size={16} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>비밀번호 확인</th>
                                                                <td>
                                                                    <input type="password" onChange={this.password_confirmChange.bind(this)} maxLength={16} size={16} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>이메일</th>
                                                                <td>
                                                                    <input type="text" onChange={this.emailChange.bind(this)} />
                                                                    <button type="button" onClick={this.submitGit_email.bind(this)} className="sign_up_inner_table_button"> 인증번호 전송 </button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>인증번호</th>
                                                                <td>
                                                                    <input type="number" onChange={this.input_certification_numberChange.bind(this)} size={7} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>전화번호</th>
                                                                <td>
                                                                    <select onChange={this.phone_0Change.bind(this)} className="sign_up_phone_select">
                                                                        <option id="010" value="010">010</option>
                                                                        <option id="011" value="011">011</option>
                                                                        <option id="017" value="017">017</option>
                                                                    </select>
                                                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                                                    <input type="number" onChange={this.phone_1Change.bind(this)} max={9999} maxLength={4} size={4} className="sign_up_phone_input" />
                                                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                                                    <input type="number" onChange={this.phone_2Change.bind(this)} max={9999} maxLength={4} size={4} className="sign_up_phone_input" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>면허구분</th>
                                                                <td>
                                                                    <select onChange={this.license_categoryChange.bind(this)} className="sign_up_license_cateogry_select">
                                                                        <option id="1" value="1"> 국내 </option>
                                                                        <option id="2" value="2"> 국외 </option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>면허 종류</th>
                                                                <td>
                                                                    <select onChange={this.license_typeChange.bind(this)} className="sign_up_license_type_select">
                                                                        <option id="1" value="1">1종대형</option>
                                                                        <option id="2" value="2">1종보통</option>
                                                                        <option id="3" value="3">2종보통</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>면허증 번호</th>
                                                                <td>
                                                                    <select onChange={this.license_number_0Change.bind(this)} className="sign_up_license_number_select">
                                                                        <option id="1" value="1">서울</option>
                                                                        <option id="2" value="2">11</option>
                                                                    </select>
                                                                    &nbsp;
                                                                    <input type="text" size={2} maxLength={2} onChange={this.license_number_1Change.bind(this)} className="sign_up_license_number_1" />
                                                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                                                    <input type="text" size={6} maxLength={6} onChange={this.license_number_2Change.bind(this)} className="sign_up_license_number_2" />
                                                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                                                    <input type="text" size={2} maxLength={2} onChange={this.license_number_3Change.bind(this)} className="sign_up_license_number_3" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>면허발급일자</th>
                                                                <td>
                                                                    <input type="date" onChange={this.date_if_issueChange.bind(this)} className="sign_up_date" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>적성검사</th>
                                                                <td>
                                                                    <input type="date" onChange={this.aptitude_testChange.bind(this)} className="sign_up_date" />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr height={2} bgcolor="cadetblue">
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} align="center">
                                                    <div id="member_button">
                                                        <button type="button" onClick={this.SignUpCheck.bind(this)} className="sign_up_finish_button"> 회원가입</button>
                                                        <Link to="/"><button className="sign_up_finish_button"> 취소</button></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </form>
                    </tbody>
                </table>
            </div>
        )

        return sign_up_Form;
    }
}

export default SignUpForm;