import React from 'react';
import ReactDOM from 'react-dom'
import cookie from "react-cookies"
import { Link } from 'react-router-dom'

import './Header.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            returned: '',
        }
    }

    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});

        document.location.href = "/";
    }
    admin_log_out(){
        cookie.remove('admin', {path:'/'});
        document.location.href = "/";
    }

    render(){
        let member_top_Form = (
            <div>
                <div className="menu">
                    <Link to="/"><div className="logo"> 렌터카 </div></Link>
                    <div className="dropdown-menu-item">
                        예약 및 이용내역
                        <div className="dropdown-content">
                            <Link to="/reservation_member" className="link_content"><div> 총 이용 내역 </div></Link>
                            <Link to="/refundable_reservation" className="link_content"><div> 환불 가능한 내역 </div></Link>
                        </div>
                    </div>
                    {/* <Link to="/reservation_member"><div className="menu-item"> 예약 및 이용 내역 </div> </Link> */}
                    <div className="menu-item" onClick={this.log_out.bind(this)}> 로그아웃 </div>
                    <Link to="/search_rent"><div className="menu-item"> 렌터카 예약 </div></Link>
                    <div className="dropdown-menu-item"> 
                            고객센터
                        <div className="dropdown-content">
                            <Link to="/Member_feedback" className="link_content"><div> 내 의견 보기 </div></Link>
                            <Link to="/member_service_center" className="link_content"><div> 의견 보내기 </div></Link>
                            <Link to="/notice" className="link_content"> <div> 공지사항 </div> </Link>
                        </div>
                    </div>
                </div>
            </div>
        )

        let non_member_top_Form = (
            <div>
                <div className="menu">
                    <Link to="/"><div className="logo"> 렌터카 </div></Link>
                    <Link to="/reservation_non_member"><div className="menu-item"> 예약 및 이용내역 </div></Link>
                    <Link to="/signin"> <div className="menu-item"> 로그인 </div> </Link>
                    <Link to="/signup"> <div className="menu-item"> 회원가입 </div> </Link>
                    <div className="dropdown-menu-item"> 
                            고객센터
                        <div className="dropdown-content">
                            <Link to="/non_member_feedback" className="link_content"><div> 내 의견 보기 </div></Link>
                            <Link to="/non_member_service_center" className="link_content"><div> 의견 보내기 </div></Link>
                            <Link to="/notice" className="link_content"> <div> 공지사항 </div> </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
        let admin_Form = (
            <div>
                <div className="menu">
                    <Link to="/"><div className="logo">렌터카</div></Link>
                    <div className="dropdown-menu-item">
                        차량 관리
                        <div className="dropdown-content">
                            <Link to="/insert_car" className="link_content"><div> 신규차량등록 </div></Link>
                            <Link to="/vehicle_impormation" className="link_content"><div> 차량 정보 관리 </div></Link>
                        </div>
                    </div>
                    <Link to="/total_reservation"> <div className="menu-item"> 예약 관리 </div> </Link>
                    <div className="dropdown-menu-item"> 
                        고객 센터 관리 
                        <div className="dropdown-content">
                            <Link to="/feedback_list" className="link_content"><div> 고객 의견 관리 </div></Link>
                            <Link to="/upload_notice" className="link_content"><div> 공지사항 등록 </div></Link>
                            <Link to="/update_notice" className="link_content"><div> 공지사항 목록 </div></Link>
                        </div>
                    </div>
                    <div className="menu-item" onClick={this.admin_log_out.bind(this)}> 로그아웃 </div>
                </div>
            </div>
        )

        if(cookie.load('admin')){
            return admin_Form;
        } else if(cookie.load('name')){
            return member_top_Form;
        } else {
            return non_member_top_Form;
        }
    }
}

export default Header;