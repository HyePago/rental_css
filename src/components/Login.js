import React, { LabelHTMLAttributes } from 'react'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'

import './Header.css'

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            password: '',
            result: '',
            name: '',
            username: '',
            reserves: '',
            email: '',
            license_category: '',
            license_type: '',
            license_number: '',
            date_if_issue: '',
            aptitude_test: '',
            phone: '',
        }
    }

    // Log In
    setLogIn(opts){
        fetch('/sign_in', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            this.setState(
                {
                    result:json.result, 
                    name:json.name, 
                    username:json.username, 
                    reserves:json.reserves, 
                    email:json.email,
                    license_category:json.license_category,
                    license_type:json.license_type,
                    license_number:json.license_number,
                    date_if_issue:json.date_if_issue,
                    aptitude_test:json.aptitude_test,
                    phone:json.phone,
                }); 
            })
        .then(function(){
            console.log("reuslt = > ", this.state.result);

            if(this.state.result == 0){
                alert("아이디 혹은 비밀번호를 다시 한번 확인해주세요.");
            }else if(this.state.result == 2){
                alert("로그인 실패 횟수가 5회를 달성하였습니다. 비밀번호찾기에서 비밀번호를 변경해주세요.");
            }else if(this.state.result == 5){
                cookie.save('admin', "true", {path: '/'});
                document.location.href = "/";
            }else{
                cookie.save('name', this.state.name, {path: '/'});
                cookie.save('username', this.state.username, {path: '/'});
                cookie.save('reserves', this.state.reserves, {path: '/'});
                cookie.save('email', this.state.email, {path: '/'});
                cookie.save('phone', this.state.phone, {path: '/'});
                cookie.save('license_category', this.state.license_category, {path: '/'});
                cookie.save('license_type', this.state.license_type, {path: '/'});
                cookie.save('license_number', this.state.license_number, {path: '/'});
                cookie.save('date_if_issue', this.state.date_if_issue, {path: '/'});
                cookie.save('aptitude_test', this.state.aptitude_test, {path: '/'});
                
                document.location.href = "/";
            }
        }.bind(this));
    }
    submitGit_Login(){
        if(this.state.id == ''){
            alert("아이디를 입력해주세요");
            return;
        }else if(this.state.password == ''){
            alert("비밀번호를 입력해주세요.");
            return;
        }

        this.setLogIn({
            username: this.state.id,
            password: this.state.password
        })
    }

    //log_out
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});

        document.location.href = "/";
    }

    idChange(e){
        this.setState({id:e.target.value});
    }
    passwordChage(e){
        this.setState({password:e.target.value});
    }

    render(){
        let non_member_Form = (
            <div className="main_login">
                <input type="text" className="main_loginInput" placeholder="username" required onChange={this.idChange.bind(this)} />
                <input type="password" className="main_loginInput" placeholder="password" required onChange={this.passwordChage.bind(this)} />
                <button className="main_loginButton" onClick={this.submitGit_Login.bind(this)}> Log In </button>
                <div className="main_login_extra_service">
                    <Link to="/find_id"><div className="main_login_extra_service_content"> 아이디 찾기 </div></Link>
                    &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
                    <Link to="/find_password"><div className="main_login_extra_service_content"> 비밀번호 찾기 </div></Link>
                </div>
            </div>
        )
        let member_Form = (
            <div className="main_login">
                <div className="main_impormation">
                    <Link to="/mypage" className="main_login_link"><b> {cookie.load('name')}</b></Link> 님
                    <br />
                </div>
                <div className="main_impormation">
                    현재 적립금 : <b className="main_login_link"> {cookie.load('reserves')} </b>
                </div>
                <div></div>
                <div onClick={this.log_out.bind(this)}>
                    <b className="main_login_logout">로그아웃</b>
                </div>
            </div>
        )
        let admin_Form = (
            <div>
            </div>
        )

        if(cookie.load('name')){
            return member_Form;;
        } else if(cookie.load('admin')){
            return admin_Form;
        } else{
            return non_member_Form;
        }
    }
}

export default Login;