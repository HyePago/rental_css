import  React from 'react'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'

import { Link } from 'react-router-dom'

import history from './history'

class Mypage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            phone_0: cookie.load('phone').slice(0,3),
            phone_1: cookie.load('phone').slice(3,7),
            phone_2: cookie.load('phone').slice(7,11),
            license_category: cookie.load('license_category'),
            license_type: cookie.load('license_type'),
            license_number_0: cookie.load('license_number').slice(0,1),
            license_number_1: cookie.load('license_number').slice(1,3),
            license_number_2: cookie.load('license_number').slice(3,9),
            license_number_3: cookie.load('license_number').slice(9,11),
            date_if_issue: cookie.load('date_if_issue').slice(0,10),
            aptitude_test: cookie.load('aptitude_test').slice(0,10),
            result: '',
            password: '',
            update_password: '',
            update_password_confirm: '',
            password_feedback: '',
            email: '',
            input_certification_number: '',
        }
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
        this.setState({license_type:e.target.value});
    }
    license_number_0Change(e){
        this.setState({license_number_0:e.target.value});
    }
    license_number_1Change(e){
        this.setState({license_number_1:e.target.value});
    }
    license_number_2Change(e){
        this.setState({license_number_2:e.target.value});
    }
    license_number_3Change(e){
        this.setState({license_number_3:e.target.value});
    }
    date_if_issueChange(e){
        this.setState({date_if_issue:e.target.value});
    }
    aptitude_testChange(e){
        this.setState({aptitude_test:e.target.value});
    }
    passwordChange(e){
        this.setState({password:e.target.value});
    }
    update_passwordChange(e){
        this.setState({update_password:e.target.value});
    }
    update_password_confirmChange(e){
        this.setState({update_password_confirm:e.target.value});
    }
    emailChange(e){
        this.setState({email:e.target.value});
    }
    input_certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }

    //update
    cancel_click(){
        document.location.href = "/";
    }
    setUpdate(opts){
        fetch('/update_user_impormation', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result == "true"){
                alert("정보수정이 성공적으로 완료되었습니다.");

                cookie.save('phone', this.state.phone_0+""+this.state.phone_1+""+this.state.phone_2, {path: '/'});
                cookie.save('license_category', this.state.license_category, {path:'/'});
                cookie.save('license_type', this.state.license_type, {path: '/'});
                cookie.save('license_number', this.state.license_number_0+""+this.state.license_number_1+""+this.state.license_number_2+""+this.state.license_number_3, {path: '/'});
                cookie.save('date_if_issue', this.state.date_if_issue, {path: '/'});
                cookie.save('aptitude_test', this.state.aptitude_test, {path: '/'});
            }
        }.bind(this));
    }
    submitGit_update(){
        this.setUpdate({
            email: cookie.load('email'),
            phone: this.state.phone_0+""+this.state.phone_1+""+this.state.phone_2,
            license_category: this.state.license_category,
            license_type: this.state.license_type,
            license_number: this.state.license_number_0+""+this.state.license_number_1+""+this.state.license_number_2+""+this.state.license_number_3,
            date_if_issue: this.state.date_if_issue,
            aptitude_test: this.state.aptitude_test
        })
    }
    update_click(){
        if(this.state.phone_0=='' || this.state.phone_1=='' || this.state.phone_2=='' || this.state.license_category=='' || this.state.license_type=='' || this.state.license_number_0=='' || this.state.license_number_1=='' || this.state.license_number_2=='' || this.state.license_number_3=='' || this.state.date_if_issue=='' || this.state.aptitude_test==''){
            alert("빠짐없이 입력해주세요.");
        } else{
            this.submitGit_update();
        }
    }

    //password
    mypage_password_update_button_click(){
        this.setState({returned:2});
    }
    mypage_email_update_button_click(){
        this.setState({returned:3});
    }
    check_Update_Password(){
        var pw = this.state.update_password;
        var num = pw.search(/[0-9]/g);
        var eng = pw.search(/[a-z]/ig);
        var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        var blank_pattern = /[\s]/g;

        if(pw.length < 8 || pw.length > 16){
            alert("9자리 ~ 16자리 이내로 입력해주세요.");
            this.setState({password_feedback:'false'});
        } else if(blank_pattern.test(pw) == true){
            alert("비밀번호는 공백없이 입력해주세요.");
            this.setState({password_feedback:'false'});
        } else if(num < 0 || eng < 0 || spe < 0){
            alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
            this.setState({password_feedback:'false'});
        } else if(this.state.update_password != this.state.update_password_confirm){
            alert("비밀번호 확인을 다시 한 번 확인해주시길 바랍니다.");
            this.setState({password_feedback:'false'});
        } else {
            this.setState({password_feedback:'true'});
        }
    }
    changeThePwd(opts){
        fetch('/mypage_change_pwd', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result, id:json.id}); })
        .then(function(){
            if(this.state.result == "true"){
                alert("비밀번호 변경에 성공하셨습니다.");
                this.setState({returned:1});
            }else{
                alert("현재 비밀번호가 일치하는 지 확인해 주시길 바랍니다.");
                return;
            }
        }.bind(this))
    }
    submit_Password(){
        if(this.state.password=='' || this.state.update_password=='' || this.state.update_password_confirm==''){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }
        this.check_Update_Password();
        if(this.state.password_feedback=='true'){
            this.changeThePwd({
                email: cookie.load('email'),
                password: this.state.password,
                update_password: this.state.update_password
            })
        }

        return;
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
    submitGit_sendEmail(){
        if(this.state.email == ''){
            alert("이메일을 입력해주세요");
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
    setCertification(opts){
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

            this.submitGit_updateEmail();
        }.bind(this))
    }
    submitGit_certification(){
        this.setCertification({
            email:this.state.email,
            certification_number:this.state.input_certification_number
        })
    }
    click_update_email(){
        if(this.state.email=='' || this.state.input_certification_number==''){
            alert("빠짐없이 입력해주세요.");
            return;
        }

        this.submitGit_certification();
    }
    setUpateEmail(opts){
        fetch('/update_email', {
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
                alert("실패하였습니다.");
                return;
            }

            cookie.save('email', this.state.email, {path: '/'});
            this.setState({returned:1});
        }.bind(this))
    }
    submitGit_updateEmail(){
        this.setUpateEmail({
            email:cookie.load('email'),
            update_email: this.state.email
        })
    }

    //cancel
    update_cancel(){
        this.setState({returned:1});
    }

    render(){
        let changing_impormation_Form = (
            <div>
                <table width="640" className="mypage_out_table">
                    <tbody>
                        <form name="write_form_member" method="post">
                            <tr>
                                <td>
                                    <div className="mypage_logo"> 정보수정 </div>
                                </td>
                            </tr>
                            <tr height={2} bgcolor="cadetblue">
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <table width="640" className="mypage_table">
                                        <tbody>
                                            <tr>
                                                <th> 이름 </th>
                                                <td>
                                                    {cookie.load('name')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 아이디 </th>
                                                <td>
                                                    {cookie.load('username')}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 비밀번호 </th>
                                                <td>
                                                    <button type="button" className="mypage_button" onClick={this.mypage_password_update_button_click.bind(this)}> 비밀번호 변경 </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    이메일
                                                </th>
                                                <td>
                                                    {cookie.load('email')} &nbsp; <button className="mypage_button" onClick={this.mypage_email_update_button_click.bind(this)}> 이메일 변경</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    전화번호
                                                </th>
                                                <td>
                                                    <select defaultValue={cookie.load('phone').slice(0,3)} className="mypage_phone_select" onChange={this.phone_0Change.bind(this)}>
                                                        <option id="010" value="010">010</option>
                                                        <option id="011" value="011">011</option>
                                                        <option id="017" value="017">017</option>
                                                    </select>
                                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                                    <input type="number" name="phone_1" max="9999" maxLength={4} size="4" defaultValue={cookie.load('phone').slice(3,7)} className="mypage_phone_input" onChange={this.phone_1Change.bind(this)}></input>
                                                    &nbsp;&nbsp;-&nbsp;&nbsp;
                                                    <input type="number" name="phone_2" max="9999" maxLength={4} size="4" defaultValue={cookie.load('phone').slice(7,11)} className="mypage_phone_input" onChange={this.phone_2Change.bind(this)}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 면허구분 </th>
                                                <td>
                                                    <select defaultValue={cookie.load('license_category')} className="mypage_license_cateogry_select" onChange={this.license_categoryChange.bind(this)}>
                                                        <option id="1" value="1"> 국내 </option>
                                                        <option id="2" value="2"> 국외 </option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 면허종류 </th>
                                                <td>
                                                    <select defaultValue={cookie.load('license_type')} className="mypage_license_type_select" onChange={this.license_typeChange.bind(this)}>
                                                        <option id="1" value="1">1종대형</option>
                                                        <option id="2" value="2">1종보통</option>
                                                        <option id="3" value="3">2종보통</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 면허증 번호 </th>
                                                <td>
                                                    <select defaultValue={cookie.load('license_number').slice(0,1)} className="mypage_license_number_select" onChange={this.license_number_0Change.bind(this)}>
                                                        <option id="1" value="1">서울</option>
                                                        <option id="2" value="2">11</option>
                                                    </select>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <input type="text" size="2" maxLength={2} defaultValue={cookie.load('license_number').slice(1,3)} className="mypage_license_number_1" onChange={this.license_number_1Change.bind(this)}></input>
                                                    &nbsp;-&nbsp;
                                                    <input type="text" size="6" maxLength={6} defaultValue={cookie.load('license_number').slice(3,9)} className="mypage_license_number_2" onChange={this.license_number_2Change.bind(this)}></input>
                                                    &nbsp;-&nbsp;
                                                    <input type="text" size="2" maxLength={2} defaultValue={cookie.load('license_number').slice(9,11)} className="mypage_license_number_3" onChange={this.license_number_3Change.bind(this)}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 면허발급일자 </th>
                                                <td>
                                                    <input type="date" defaultValue={cookie.load('date_if_issue').slice(0,10)} className="mypage_date" onChange={this.date_if_issueChange.bind(this)}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th> 적성검사 </th>
                                                <td>
                                                    <input type="date" defaultValue={cookie.load('aptitude_test').slice(0,10)} className="mypage_date" onChange={this.aptitude_testChange.bind(this)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> </td>
                                                <td align="center">
                                                    <button type="button" onClick={this.update_click.bind(this)} className="mypage_finish_button"> 수정 </button>
                                                    &nbsp;
                                                    &nbsp;
                                                    <Link to="/"><button className="mypage_finish_button"> 취소 </button></Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr height={2} bgcolor="cadetblue">
                                <td></td>
                            </tr>
                        </form>
                    </tbody>
                </table>
            </div>
        )

        let update_Password_Form = (
            <div>
                <table className="mypage_password_table">
                    <tbody>
                        <form name="write_form_member" className="mypage_password_form" method="post">
                            <tr>
                                <th> 현재 비밀번호 </th>
                                <td>
                                    <input type="password" maxLength={16} size="16" placeholder="Password" onChange={this.passwordChange.bind(this)} className="mypage_password_input" />
                                </td>
                            </tr>
                            <tr>
                                <th> 변경 비밀번호 </th>
                                <td>
                                    <input type="password" maxLength={16} size="16" placeholder="Password" onChange={this.update_passwordChange.bind(this)} className="mypage_password_input" />
                                </td>
                            </tr>
                            <tr>
                                <th> 비밀번호 확인 </th>
                                <td>
                                    <input type="password" maxLength={16} size="16" placeholder="Password" onChange={this.update_password_confirmChange.bind(this)} className="mypage_password_input" />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <button type="button" className="mypage_password_button" onClick={this.submit_Password.bind(this)}> 비밀번호 변경 </button>
                                    <button type="button" className="mypage_password_button" onClick={this.update_cancel.bind(this)}> 취소 </button>
                                </td>
                            </tr>
                        </form>
                    </tbody>
                </table>
            </div>
        )
        let update_Email_Form = (
            <div>
                <table className="mypage_email_table">
                    <tbody>
                        <form className="mypage_email_form">
                        <tr>
                            <th> 이메일 </th>
                            <td>
                                <input type="text" onChange={this.emailChange.bind(this)} className="mypage_email_input"/>
                                &nbsp; &nbsp;
                                <button type="button" onClick={this.submitGit_sendEmail.bind(this)} className="mypage_send_email_button"> 인증번호 전송 </button>
                            </td>
                        </tr>
                        <tr>
                            <th> 인증번호 </th>
                            <td>
                                <input type="number" onChange={this.input_certification_numberChange.bind(this)} className="mypage_email_input"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="center">
                                <button type="button" onClick={this.click_update_email.bind(this)} className="mypage_email_button"> 이메일 변경 </button>
                                <button type="button" onClick={this.update_cancel.bind(this)} className="mypage_email_button"> 취소 </button>
                            </td>
                        </tr>
                        </form>
                    </tbody> 
                </table>                           
            </div>
        )

        if(this.state.returned == 1){
            return changing_impormation_Form;
        } else if(this.state.returned == 2){
            return update_Password_Form;
        } else if(this.state.returned == 3){
            return update_Email_Form;
        }
    }
}

export default Mypage;