import React from 'react'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'

import './Header.css'

class Total_reservation extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            search_select: '1',
            search_text: '',
            searching: 0,
            name: [],
            email: [],
            username: [],
            number: [],
            image: [],
            car_number: [],
            car_name: [],
            color: [],
            cost: [],
            rental_date: [],
            return_date: [],
            rental_point: [],
            return_point: [],
            babyseat: [],
            navigation_kor: [],
            navigation_eng: [],
            damage_indemnity: [],
            division_number: '',
            test_number: '',
            result: '',
            total_page: '',
            currentPage: '',
        }
    }

    componentDidMount(){
        this.submitGit();
    }
    handleClick(event){
        this.setState({currentPage:event.target.id});

        this.submitGit();
    }
    search_selectChange(e){
        this.setState({search_select:e.target.value});
    }
    search_textChange(e){
        this.setState({search_text: e.target.value});
    }

    division_numberChange(e){
        this.setState({division_number:e.target.id});
        this.setState({returned:2});
    }
    
    // list
    list_reservation(opts){
        fetch('/total_reservation_list', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({name:[]});
            this.setState({email:[]});
            this.setState({username:[]});
            this.setState({number:[]});
            this.setState({image:[]});
            this.setState({car_number:[]});
            this.setState({car_name:[]});
            this.setState({color:[]});
            this.setState({cost:[]});
            this.setState({rental_date:[]});
            this.setState({return_date:[]});
            this.setState({rental_point:[]});
            this.setState({return_point:[]});
            this.setState({babyseat:[]});
            this.setState({navigation_kor:[]});
            this.setState({navigation_eng:[]});
            this.setState({damage_indemnity:[]});

            for(var count = 0; this.state.result[count] != null; count++){
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
                this.setState({username:this.state.username.concat(this.state.result[count]["username"])});
                this.setState({number:this.state.number.concat(this.state.result[count]["number"])});
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({cost:this.state.cost.concat(this.state.result[count]["cost"])});
                this.setState({rental_date:this.state.rental_date.concat(this.state.result[count]["rental_date"])});
                this.setState({return_date:this.state.return_date.concat(this.state.result[count]["return_date"])});
                this.setState({rental_point:this.state.rental_point.concat(this.state.result[count]["rental_point"])});
                this.setState({return_point:this.state.return_point.concat(this.state.result[count]["return_point"])});
                this.setState({babyseat:this.state.babyseat.concat(this.state.result[count]["babyseat"])});
                this.setState({navigation_kor:this.state.navigation_kor.concat(this.state.result[count]["navigation_kor"])});
                this.setState({navigation_eng:this.state.navigation_eng.concat(this.state.result[count]["navigation_eng"])});
                this.setState({damage_indemnity:this.state.damage_indemnity.concat(this.state.result[count]["damage_indemnity"])});
            }
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
            currentPage: this.state.currentPage
        })
    }

    //search
    click_search_button(){
        this.setState({currentPage:''});

        if(this.state.search_text != ""){
            this.setState({searching:1});
            this.submitGit_Search();
        } else {
            this.setState({searching: 0});
            this.submitGit();
        }
    }
    submitGit_Search(){
        this.setSearch({
            currentPage: this.state.currentPage,
            search_select: this.state.search_select,
            search_text: this.state.search_text
        })
    }
    setSearch(opts){
        fetch('/search_total_reservation_list', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({name:[]});
            this.setState({email:[]});
            this.setState({username:[]});
            this.setState({number:[]});
            this.setState({image:[]});
            this.setState({car_number:[]});
            this.setState({car_name:[]});
            this.setState({color:[]});
            this.setState({cost:[]});
            this.setState({rental_date:[]});
            this.setState({return_date:[]});
            this.setState({rental_point:[]});
            this.setState({return_point:[]});
            this.setState({babyseat:[]});
            this.setState({navigation_kor:[]});
            this.setState({navigation_eng:[]});
            this.setState({damage_indemnity:[]});

            for(var count = 0; this.state.result[count] != null; count++){
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
                this.setState({username:this.state.username.concat(this.state.result[count]["username"])});
                this.setState({number:this.state.number.concat(this.state.result[count]["number"])});
                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({cost:this.state.cost.concat(this.state.result[count]["cost"])});
                this.setState({rental_date:this.state.rental_date.concat(this.state.result[count]["rental_date"])});
                this.setState({return_date:this.state.return_date.concat(this.state.result[count]["return_date"])});
                this.setState({rental_point:this.state.rental_point.concat(this.state.result[count]["rental_point"])});
                this.setState({return_point:this.state.return_point.concat(this.state.result[count]["return_point"])});
                this.setState({babyseat:this.state.babyseat.concat(this.state.result[count]["babyseat"])});
                this.setState({navigation_kor:this.state.navigation_kor.concat(this.state.result[count]["navigation_kor"])});
                this.setState({navigation_eng:this.state.navigation_eng.concat(this.state.result[count]["navigation_eng"])});
                this.setState({damage_indemnity:this.state.damage_indemnity.concat(this.state.result[count]["damage_indemnity"])});
            }
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
    back_click(){
        this.setState({returned:1});
    }

    render(){
        //page
        const pageNumbers = [];
        for (let i = 1; i <= (Math.floor((this.state.total_page-1) / 5))+1; i++){
            pageNumbers.push(i);
        }

        const renderPageNUmbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                </li>
            );
        });

         //style
         const noneStyle = {
            display: 'none',
        }
        const blockStyle = {}

        // list
        const renderReservationNumbers = [];
        for(let i=0; i<5; i++){
            renderReservationNumbers.push(i);
        }
        const reservation_list = renderReservationNumbers.map(number => {
            return(
                <tr key={number} id={number} style={this.state.image[number] == null? noneStyle : blockStyle} onClick={this.division_numberChange.bind(this)} >
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.number[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        <img src={this.state.image[number]} width="230" height="130" onClick={this.division_numberChange.bind(this)}/>
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.car_number[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.car_name[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.name[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.rental_point[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.return_point[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.rental_date[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)} >
                        {this.state.return_date[number]}
                    </td>
                </tr>
            )
        })

        let reservation_list_Form = (
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
                                        <tr>
                                            <th width="150"> 예약번호 </th>
                                            <th width="230"> 이미지 </th>
                                            <th width="150"> 차량 번호 </th>
                                            <th width="150"> 차량 이름 </th>
                                            <th width="150"> 회원 이름 </th>
                                            <th width="150"> 대여지점 </th>
                                            <th width="150"> 반닙지점 </th>
                                            <th width="150"> 대여일자 </th>
                                            <th width="150"> 반납일자 </th>
                                        </tr>
                                        {reservation_list}
                                        <tr>
                                            <th></th><th></th><th></th>
                                            <td colSpan={5}>
                                                <select onChange={this.search_selectChange.bind(this)}  className="select_base">
                                                    <option value={1}> 예약 번호 </option>
                                                    <option value={2}> 차량 번호 </option>
                                                    <option value={3}> 회원 이름 </option>
                                                    <option value={4}> 회원 이메일 </option>
                                                </select>
                                                <input type="text" onChange={this.search_textChange.bind(this)} className="base_input"  />
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

        let detail_View_Form = (
            <div>
                <table class="rent_second_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="500">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 예약 정보 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table" width="500">
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                <img src={this.state.image[this.state.division_number]} width="500" height="380" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 예약 번호</th>
                                            <td> {this.state.number[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>회원 이름</th>
                                            <td> {this.state.email[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>회원 아이디</th>
                                            <td> {this.state.username[this.state.division_number]} </td>
                                        </tr>
                                        <tr> 
                                            <th>자동차 번호</th>
                                            <td> {this.state.car_number[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>차종</th>
                                            <td> {this.state.car_name[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>색상</th>
                                            <td> {this.state.color[this.state.division_number]} </td>
                                        </tr>
                                        <tr> 
                                            <th>비용</th>
                                            <td> {this.state.cost[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>대여일자</th>
                                            <td> {this.state.rental_date[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>반납일자</th>
                                            <td> {this.state.return_date[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>대여지점</th>
                                            <td> {this.state.rental_point[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>반납지점</th>
                                            <td> {this.state.return_point[this.state.division_number]} </td>
                                        </tr>
                                        <tr>
                                            <th>한글 네비게이션</th>
                                            <td> <input type="checkbox" disabled="disabled" defaultChecked={this.state.navigation_kor[this.state.division_number]==1?true:false}/> </td>
                                        </tr>
                                        <tr>
                                            <th>영문 네비게이션</th>
                                            <td> <input type="checkbox" disabled="disabled" defaultChecked={this.state.navigation_eng[this.state.division_number]==1?true:false}/> </td>
                                        </tr>
                                        <tr>
                                            <th>베이비 시트</th>
                                            <td> <input type="checkbox" disabled="disabled" defaultChecked={this.state.babyseat[this.state.division_number]==1?true:false} /> </td>
                                        </tr>
                                        <tr>
                                            <th>자차 손핵 면책 제도(CDW)</th>
                                            <td>
                                                <input type="radio" value="0" checked={(this.state.damage_indemnity[this.state.division_number] == '0')?true:false}/>
                                                보험 미적용(0원)
                                                <input type="radio" value="1" checked={(this.state.damage_indemnity[this.state.division_number] == '1')?true:false}/>
                                                고객부담금 면제 (30,000원)
                                                <input type="radio" value="2" checked={(this.state.damage_indemnity[this.state.division_number] == '2')?true:false}/>
                                                5만원 (18,000원)
                                                <input type="radio" value="3" checked={(this.state.damage_indemnity[this.state.division_number] == '3')?true:false}/>
                                                30만원 (14,000원)
                                            </td>
                                        </tr>
                                        <tr>
                                            <th />
                                            <td>
                                                <button onClick={this.back_click.bind(this)} className="reservation_button"> 목록 </button>
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
            return reservation_list_Form;
        } else if(this.state.returned == 2){
            return detail_View_Form;
        }
    }
}

export default Total_reservation;
