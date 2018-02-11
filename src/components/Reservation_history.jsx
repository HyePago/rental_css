import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './Header.css'

class Reservation_history extends React.Component{
    constructor(props){
        super(props);
        this.handleLoad = this.handleLoad.bind(this);

        this.state = {
            image: [],
            car_number: [],
            car_name: [],
            fuel: [],
            color: [],
            distance: [],
            few: [],
            refundable: [],
            currentPage: '',
            count: '',
            returned: 'ready',
            test_number: 0,
            total_page: 0,
            division_number: 0,
            reservaion_number: [],
            rental_point: '',
            return_point: '',
            rental_date: '',
            return_date: '',
            search_select: '1',
            search_text: '',
            searching: 0,
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.submitGit();
     }
    handleLoad(){
        this.submitGit();
    }
    handleClick(event){
        this.setState({currentPage:event.target.id});

        if(this.state.searching == 0) {
            this.submitGit();
        } else {
            this.submitGit_Search();
        }
    }

    list_reservation(opts){
        fetch('/reservation_history', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({image:[]});
            this.setState({car_number:[]});
            this.setState({car_name:[]});
            this.setState({fuel:[]});
            this.setState({color:[]})
            this.setState({distance:[]});
            this.setState({few:[]});
            this.setState({refundable:[]});
            this.setState({reservaion_number:[]});

            for(var count = 0; this.state.result[count] != null; count++){
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({fuel:this.state.fuel.concat(this.state.result[count]["fuel"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({distance:this.state.distance.concat(this.state.result[count]["distance"])});
                this.setState({few:this.state.few.concat(this.state.result[count]["few"])});
                this.setState({refundable:this.state.refundable.concat(this.state.result[count]["refundable"])});
                this.setState({reservaion_number:this.state.reservaion_number.concat(this.state.result[count]["reservation_number"])});
            }
            this.setState({count:count});
            this.setState({total_page:this.state.result[0]["total_page"]});
        }.bind(this))
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.submitGit();
            }
            else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit(){
        this.list_reservation({
            email: cookie.load('email'),
            currentPage: this.state.currentPage
        })
    }

    refund_impormation(){
        fetch('/refund_impormation', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "reservation_number="+this.state.reservaion_number[this.state.division_number]
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            this.setState(
                {
                    rental_point:json.rental_point,
                    rental_date:json.rental_date,
                    return_point:json.return_point,
                    return_date:json.return_date
                }); 
        })
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.refund_impormation();
            }
            else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    cancel_reservation(){
        fetch('/refund', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "reservation_number="+this.state.reservaion_number[this.state.division_number]
        })
        .then((response) => { return response.json(); })
        .then((json) => { 
            console.log("refund result = ", json.result);

            if(json.result == "false"){
                alert("다시 한 번 시도해주시길 바랍니다.");
            }

            this.submitGit();
            this.setState({returned:'ready'});
        })
    }

    click_refund(e){
        this.setState({division_number:e.target.id});
        this.setState({returned:'refund'});
        this.refund_impormation();
    }
    click_cancel_reservation(){
        var answer = confirm("정말 예약 취소하시겠습니까?");
        if(answer == true){
            this.cancel_reservation();
        }
    }

    // search
    search_selectChange(e){
        this.setState({search_select:e.target.value});
    }
    search_textChange(e){
        this.setState({search_text:e.target.value});
    }
    click_search_button(){
        this.setState({currentPage:''});

        if(this.state.search_text != ""){
            this.setState({searching: 1});
            this.submitGit_Search();
        } else {
            this.setState({searching: 0});
            this.submitGit();
        }
    }
    submitGit_Search(){
        this.setSearch({
            email: cookie.load('email'),
            currentPage: this.state.currentPage,
            search_select: this.state.search_select,
            search_text: this.state.search_text,
        })
    }
    setSearch(opts){
        fetch('/search_reservation_history', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({image:[]});
            this.setState({car_number:[]});
            this.setState({car_name:[]});
            this.setState({fuel:[]});
            this.setState({color:[]})
            this.setState({distance:[]});
            this.setState({few:[]});
            this.setState({refundable:[]});
            this.setState({reservaion_number:[]});

            for(var count = 0; this.state.result[count] != null; count++){
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({fuel:this.state.fuel.concat(this.state.result[count]["fuel"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({distance:this.state.distance.concat(this.state.result[count]["distance"])});
                this.setState({few:this.state.few.concat(this.state.result[count]["few"])});
                this.setState({refundable:this.state.refundable.concat(this.state.result[count]["refundable"])});
                this.setState({reservaion_number:this.state.reservaion_number.concat(this.state.result[count]["reservation_number"])});
            }
            this.setState({count:count});
            this.setState({total_page:this.state.result[0]["total_page"]});
        }.bind(this))
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.submitGit_Search();
            }
            else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }

    render(){
        const pageNumbers = [];
        for (let i = 1; i <= (Math.floor((this.state.total_page-1) / 5))+1; i++){
            pageNumbers.push(i);
        }

        const renderPageNUmbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick}>
                    {number}
                </li>
            );
        });

        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {

        }

        let reservation_history_form = (
            <div>
                <table class="rent_second_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 예약 내역 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr style={this.state.image[0]==null?noneStyle:blockStyle}>
                                            <th width="150">
                                                예약번호
                                            </th>
                                            <th width="230">
                                                이미지
                                            </th>
                                            <th width="150">
                                                차량 번호
                                            </th>
                                            <th width="150">
                                                차량 이름
                                            </th>
                                            <th width="150">
                                                연료
                                            </th>
                                            <th width="150">
                                                색상
                                            </th>
                                            <th width="150">
                                                주행거리
                                            </th>
                                            <th width="150">
                                                N인승
                                            </th>
                                            <th width="150">
                                                예약 취소
                                            </th>
                                        </tr>
                                        <tr style={this.state.image[0]==null?noneStyle:blockStyle}>
                                            <td>
                                                {this.state.reservaion_number[0]}
                                            </td>
                                            <td>
                                                <img src={this.state.image[0]} width="230" height="130"/>
                                            </td>
                                            <td>
                                                {this.state.car_number[0]}
                                            </td>
                                            <td>
                                                {this.state.car_name[0]}
                                            </td>
                                            <td>
                                                {this.state.fuel[0]}
                                            </td>
                                            <td>
                                                {this.state.color[0]}
                                            </td>
                                            <td>
                                                {this.state.distance[0]}
                                            </td>
                                            <td>
                                                {this.state.few[0]}
                                            </td>
                                            <td style={this.state.refundable[0]=="false"?noneStyle:blockStyle}>
                                                <button id={0} onClick={this.click_refund.bind(this)} className="refund_button"> 환불 </button>
                                            </td>
                                        </tr>
                                        <tr style={this.state.image[1]==null?noneStyle:blockStyle}>
                                            <td>
                                                {this.state.reservaion_number[1]}
                                            </td>
                                            <td>
                                                <img src={this.state.image[1]} width="230" height="130"/>
                                            </td>
                                            <td>
                                                {this.state.car_number[1]}
                                            </td>
                                            <td>
                                                {this.state.car_name[1]}
                                            </td>
                                            <td>
                                                {this.state.fuel[1]}
                                            </td>
                                            <td>
                                                {this.state.color[1]}
                                            </td>
                                            <td>
                                                {this.state.distance[1]}
                                            </td>
                                            <td>
                                                {this.state.few[1]}
                                            </td>
                                            <td style={this.state.refundable[1]=="false"?noneStyle:blockStyle}>
                                                <button id={1} onClick={this.click_refund.bind(this)} className="refund_button"> 환불 </button>
                                            </td>
                                        </tr>
                                        <tr style={this.state.image[2]==null?noneStyle:blockStyle}>
                                            <td>
                                                {this.state.reservaion_number[2]}
                                            </td>
                                            <td>
                                                <img src={this.state.image[2]} width="230" height="130"/>
                                            </td>
                                            <td>
                                                {this.state.car_number[2]}
                                            </td>
                                            <td>
                                                {this.state.car_name[2]}
                                            </td>
                                            <td>
                                                {this.state.fuel[2]}
                                            </td>
                                            <td>
                                                {this.state.color[2]}
                                            </td>
                                            <td>
                                                {this.state.distance[2]}
                                            </td>
                                            <td>
                                                {this.state.few[2]}
                                            </td>
                                            <td style={this.state.refundable[2]=="false"?noneStyle:blockStyle}>
                                                <button id={2} onClick={this.click_refund.bind(this)} className="refund_button"> 환불 </button>
                                            </td>
                                        </tr>
                                        <tr style={this.state.image[3]==null?noneStyle:blockStyle}>
                                            <td>
                                                {this.state.reservaion_number[3]}
                                            </td>
                                            <td>
                                                <img src={this.state.image[3]} width="230" height="130"/>
                                            </td>
                                            <td>
                                                {this.state.car_number[3]}
                                            </td>
                                            <td>
                                                {this.state.car_name[3]}
                                            </td>
                                            <td>
                                                {this.state.fuel[3]}
                                            </td>
                                            <td>
                                                {this.state.color[3]}
                                            </td>
                                            <td>
                                                {this.state.distance[3]}
                                            </td>
                                            <td>
                                                {this.state.few[3]}
                                            </td>
                                            <td style={this.state.refundable[3]=="false"?noneStyle:blockStyle}>
                                                <button id={3} onClick={this.click_refund.bind(this)} className="refund_button"> 환불 </button>
                                            </td>
                                        </tr>
                                        <tr style={this.state.image[4]==null?noneStyle:blockStyle}>
                                            <td>
                                                {this.state.reservaion_number[4]}
                                            </td>
                                            <td>
                                                <img src={this.state.image[4]} width="230" height="130"/>
                                            </td>
                                            <td>
                                                {this.state.car_number[4]}
                                            </td>
                                            <td>
                                                {this.state.car_name[4]}
                                            </td>
                                            <td>
                                                {this.state.fuel[4]}
                                            </td>
                                            <td>
                                                {this.state.color[4]}
                                            </td>
                                            <td>
                                                {this.state.distance[4]}
                                            </td>
                                            <td>
                                                {this.state.few[4]}
                                            </td>
                                            <td style={this.state.refundable[4]=="false"?noneStyle:blockStyle}>
                                                <button id={4} onClick={this.click_refund.bind(this)} className="refund_button"> 환불 </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td /><td /><td />
                                            <td colSpan={5}>
                                                <select onChange={this.search_selectChange.bind(this)} className="select_base">
                                                    <option value={1}> 예약 번호 </option>
                                                    <option value={2}> 차량 번호 </option>
                                                </select>
                                                <input type="text" onChange={this.search_textChange.bind(this)} className="base_input" />
                                                <button onClick={this.click_search_button.bind(this)} className="find_pwd_button"> 검색 </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={9} className="page_td">
                                                <div className="page_div">  
                                                    <ul id="page-numbers">
                                                        {renderPageNUmbers}
                                                    </ul>
                                                </div>
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
                <table class="rent_second_table">
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
                                                <img src={this.state.image[this.state.division_number]} width="500" height="380"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                차종
                                            </th>
                                            <td>
                                                {this.state.car_name[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                색상
                                            </th>
                                            <td>
                                                {this.state.color[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                주행거리
                                            </th>
                                            <td>
                                                {this.state.distance[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                N인승
                                            </th>
                                            <td>
                                                {this.state.few[this.state.division_number]}
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
                                            <td></td>
                                            <td>
                                                <button className="reservation_button" onClick={this.click_cancel_reservation.bind(this)}> 예약 취소 </button>
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

        if(this.state.returned=="ready"){
            this.setState.returned="reservation"            
            return reservation_history_form;
        }else if(this.state.returned=="refund"){
            return refunded_Form;
        }else{
            return reservation_history_form;
        }
    }
}

export default Reservation_history;
 