import React from 'react'
import ReactDOM from 'react-dom'

import './Header.css'

class Non_Member_reservation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            result: '',
            email: '',
            input_certification_number: '',
            certification_number: '',
            reservation_number: '',
            image: '',
            car_number: '',
            car_name: '',
            fuel: '',
            color: '',
            distance: '',
            few: '',
            refundable: '',
            rental_point: '',
            return_point: '',
            rental_date: '',
            return_date: '',
        }
    }

    emailChange(e){
        this.setState({email:e.target.value});
    }
    input_certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }
    reservation_numberChange(e){
        this.setState({reservation_number:e.target.value});
    }
    click_back(){
        this.setState({returned:1});
    }

    // send _ email
    emailAuthentication(opts){
        fetch('/email', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((Response) => { return Response.json(); })
    }
    submitGit_email(){
        if(this.state.email == ''){
            alert("이메일을 입력해주시길 바랍니다.");
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

    // email_certification
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

            this.submitGit_reservation_cetification();
        }.bind(this))
    }
    submitGit_certification(){
        this.setCertification({
            email:this.state.email,
            certification_number:this.state.input_certification_number
        })
    }

    // reservation_number _ certification
    setReservation_certification(opts){
        fetch('/reservation_non_member', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            console.log("setreservation");
            
            this.setState({image:this.state.result["image"]});
            this.setState({car_number:this.state.result["car_number"]});
            this.setState({car_name:this.state.result["car_name"]});
            this.setState({fuel:this.state.result["fuel"]});
            this.setState({color:this.state.result["color"]});
            this.setState({distance:this.state.result["distance"]});
            this.setState({few:this.state.result["few"]});
            this.setState({refundable:this.state.result["refundable"]});
            this.setState({rental_point:this.state.result["rental_point"]});
            this.setState({return_point:this.state.result["return_point"]});
            this.setState({rental_date:this.state.result["rental_date"]});
            this.setState({return_date:this.state.result["return_date"]});

            this.setState({returned:2});
        }.bind(this))
    }
    submitGit_reservation_cetification(){
        this.setReservation_certification({
            email: this.state.email,
            reservation_number: this.state.reservation_number
        })
    }

    // refund
    cancel_reservation(){
        fetch('/refund', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "reservation_number="+this.state.reservation_number
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            if(json.result == "false"){
                alert("다시 한 번 시도해주시길 바랍니다.");
            }

            alert("예약 취소가 완료되었습니다.");
            this.setState({returned:1});
        })
    }
    click_cancel_reservation(){
        var answer = confirm("정말 예약 취소하시겠습니까?");
        if(answer == true){
            this.cancel_reservation();
        }
    }

    render(){
        //style
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {}

        let email_certification_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="480">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 예약 및 이용내역 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr>
                                            <th width="77" height="35">
                                                이메일
                                            </th>
                                            <td>
                                                <input type="text" onChange={this.emailChange.bind(this)} />
                                                &nbsp;&nbsp;
                                                <button onClick={this.submitGit_email.bind(this)} className="send_certification_number_button"> 인증번호 전송 </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th height="35">
                                                인증번호
                                            </th>
                                            <td>
                                                <input type="number" onChange={this.input_certification_numberChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th height="35">
                                                예약 번호
                                            </th>
                                            <td>
                                                <input type="number" onChange={this.reservation_numberChange.bind(this)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                <button onClick={this.submitGit_certification.bind(this)} className="email_certification_reservation_search_button"> 검색 </button>
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
        let refunded_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="500">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 환불 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table" width="500">
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                <img src={this.state.image} width="500" heigth="380" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                차종
                                            </th>
                                            <td>
                                                {this.state.car_name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                색상
                                            </th>
                                            <td>
                                                {this.state.color}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                주행거리
                                            </th>
                                            <td>
                                                {this.state.distance}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                N인승
                                            </th>
                                            <td>
                                                {this.state.few}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                대여지점
                                            </th>
                                            <td>
                                                {this.state.rental_point}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                반납지점
                                            </th>
                                            <td>
                                                {this.state.return_point}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                대여 일자
                                            </th>
                                            <td>
                                                {this.state.rental_date.slice(0,16)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                반납 일자
                                            </th>
                                            <td>
                                                {this.state.return_date.slice(0,16)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} style={this.state.refundable=="false"? noneStyle : blockStyle}>
                                                <button onClick={this.click_cancel_reservation.bind(this)} className="non_refund_button"> 예약 취소 </button>
                                            </td>
                                            <td>
                                                <button onClick={this.click_back.bind(this)} className="non_refund_button"> 뒤로 </button>
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

        if(this.state.returned == 1){
            return email_certification_Form;
        } else if(this.state.returned == 2){
            return refunded_Form;
        }
    }
}

export default Non_Member_reservation;