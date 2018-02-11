import React from 'react'
import ReactDOM from 'react-dom'
import cookie from "react-cookies"

import './style.css'
import './Header.css'

class Rent_1 extends React.Component {
    constructor(props){
        super(props);

        var today = new Date()

        if(today.getMonth()+1 < 10) {
            var date = today.getFullYear() + "0" + (today.getMonth()+1)+ "" + today.getDate();
        }
        else{
            var date = today.getFullYear() + "" + (today.getMonth()+1)+ "" + today.getDate();
        }

        if(today.getMinutes() < 10){
            var time = today.getHours() + "0" + today.getMinutes();
        }
        else{
            var time = today.getHours() + "" + today.getMinutes();
        }

        this.state = {
            date: date,
            time: time,
            area: 'inland',
            rental_point: 'Gangnam',
            return_point: 'Gangnam',
            rental_date: '',
            r_rental_date: '',
            rental_time: '',
            r_rental_time: '',
            return_date: '',
            r_return_date: '',
            return_time: '',
            r_return_time: '',
            result: '',
            returned: '1',
            cost: '',
            car_type: '',
            image: [],
            car_name: [],
            car_number: [],
            fuel: [],
            few: [],
            color: [],
            count: '',
            distance: [],
            registration_date: [],
            division_number: 0,
            currentPage: 1,
            usepoint: '',
            cdw: 0,
            show_cost: '',
            kor_navigation: true,
            eng_navigation: false,
            babyseat: false,
            license_category: '',
            license_number_0: '',
            license_number_1: '',
            license_number_2: '',
            license_number_3: '',
            license_type: '',
            date_if_issue: '',
            aptitude_test: '',
            name: '',
            email: '',
            check_0: '',
            return_cost: '',
            reservation_number: '',
            test_number: 0,
            page_numbers: '',
            total_count: ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    //Change
    areaChange(e){
        this.setState({area:e.target.value});
    }
    rental_pointChange(e){
        this.setState({rental_point:e.target.value});
    }
    return_pointChange(e){
        this.setState({return_point:e.target.value});
    }
    rental_dateChange(e){
        this.setState({r_rental_date:e.target.value});

        var date = e.target.value;
        date = date.replace(/\-/g,'');

        this.setState({rental_date:date});
    }
    rental_timeChange(e){
        this.setState({r_rental_time:e.target.value})
        var rental_time = e.target.value;
        rental_time = rental_time.replace(/\:/g,'');

        this.setState({rental_time:rental_time});
    }
    return_dateChange(e){
        this.setState({r_return_date:e.target.value});
        var return_date = e.target.value;
        return_date = return_date.replace(/\-/g,'');

        this.setState({return_date:return_date});
    }
    return_timeChange(e){
        this.setState({r_return_time:e.target.value});
        var return_time = e.target.value;
        return_time = return_time.replace(/\:/g,'');

        this.setState({return_time:return_time});
    }
    car_typeChange(e){
        this.setState({car_type:e.target.value});
        this.submitGit();
    }
    usepointChange(e){
        this.setState({usepoint:e.target.value});
    }
    cdwChange(e){
        this.setState({cdw:e.target.value});

        var cost = parseInt(this.state.cost[this.state.division_number]);
        
        if(this.state.babyseat == true){
            switch(e.target.value){
                case '0':
                    this.setState({show_cost:(cost+2000)});
                    break;            
                case '1':
                    this.setState({show_cost:(cost+32000)});
                    break;
                case '2':
                    this.setState({show_cost:(cost+20000)});
                    break;
                case '3':
                    this.setState({show_cost:(cost+16000)});
                    break;
            }
        }else{
            switch(e.target.value){
                case '0':
                    this.setState({show_cost:cost});
                    break;            
                case '1':
                    this.setState({show_cost:(cost+30000)});
                    break;
                case '2':
                    this.setState({show_cost:(cost+18000)});
                    break;
                case '3':
                    this.setState({show_cost:(cost+14000)});
                    break;
            }
        }
    }
    kor_navigationChange(e){
        this.setState({kor_navigation:e.target.checked});
    }
    eng_navigationChange(e){
        this.setState({eng_navigation:e.target.checked});
    }
    babyseatChange(e){
        this.setState({babyseat:e.target.checked});
        var cost = parseInt(this.state.cost[this.state.division_number]);

        if(e.target.checked == true){
            switch(this.state.cdw){
            case '0':
                this.setState({show_cost:(cost+2000)});
                break;            
            case '1':
                this.setState({show_cost:(cost+32000)});
                break;
            case '2':
                this.setState({show_cost:(cost+20000)});
                break;
            case '3':
                this.setState({show_cost:(cost+16000)});
                break;
            }
        }else {
            switch(this.state.cdw){
            case '0':
                this.setState({show_cost:cost});
                break;            
            case '1':
                this.setState({show_cost:(cost+30000)});
                break;
            case '2':
                this.setState({show_cost:(cost+18000)});
                break;
            case '3':
                this.setState({show_cost:(cost+14000)});
                break;
            }
        }
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    emailChange(e){
        this.setState({email:e.target.value});
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
    licesne_number_2Change(e){
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
    check_0Change(e){
        this.setState({check_0:e.target.checked});
    }

    //Clicked
    tr_click_0(e){
        this.setState({division_number:0});
        this.setState({returned:'3'});
        this.setState({show_cost:this.state.cost[0]})        
    }
    tr_click_1(e){
        this.setState({division_number:1});
        this.setState({returned:'3'});
        this.setState({show_cost:this.state.cost[1]}) 
    }
    tr_click_2(e){
        this.setState({division_number:2});
        this.setState({returned:'3'});
        this.setState({show_cost:this.state.cost[2]}) 
    }
    tr_click_3(e){
        this.setState({division_number:3});
        this.setState({returned:'3'});
        this.setState({show_cost:this.state.cost[3]}) 
    }
    tr_click_4(e){
        this.setState({division_number:4});
        this.setState({returned:'3'});
        this.setState({show_cost:this.state.cost[4]}) 
    }
    renting_button_click(e){
        if(this.state.usepoint > cookie.load('reserves') && this.state.usepoint != null){
            alert("현재 보유하고있는 포인트 내에서 사용하실 수 있습니다.");
            return;
        }
        if(this.state.usepoint != '' && cookie.load('reserves') < 5000){
            alert("보유하고 있는 포인트가 5000원 미만이라 사용하실 수 없습니다.");
            return;
        }

        this.setState({name:cookie.load('name')});
        this.setState({email:cookie.load('email')});
        this.setState({license_category:cookie.load('license_category')});
        this.setState({license_type:cookie.load('license_type')});
        this.setState({license_number_0:cookie.load('license_number').slice(0,1)});
        this.setState({license_number_1:cookie.load('license_number').slice(1,3)});
        this.setState({license_number_2:cookie.load('license_number').slice(3,9)});
        this.setState({license_number_3:cookie.load('license_number').slice(9,11)});
        this.setState({date_if_issue:cookie.load('date_if_issue').slice(0,10)});
        this.setState({aptitude_test:cookie.load('aptitude_test').slice(0,10)});
        this.setState({cost: this.state.show_cost});

        this.setState({returned:'4'});
    }
    last_button_click(e){
        if(this.state.name=="" || this.state.email=="" || this.state.license_category=="" || this.state.license_type=="" || this.state.license_number_0=="" || this.state.license_number_1=="" || this.state.license_number_2=="" || this.state.license_number_3=="" || this.state.date_if_issue=="" || this.state.aptitude_test==""){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }
        if(this.state.check_0 == false){
            alert("필수 체크사항을 모두 체크해주시길 바랍니다.");
            return;
        }

        this.submitGit_2();
    }

    setRent_1(opts){
        var count = 0;

        fetch('/rent_1', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            var json_m = JSON.parse(JSON.stringify(this.state.result));

            this.setState({cost:[]});
            this.setState({image:[]});
            this.setState({car_name:[]});
            this.setState({color:[]});
            this.setState({few:[]});
            this.setState({fuel:[]});
            this.setState({distance:[]});
            this.setState({registration_date:[]});
            this.setState({car_number:[]});

            for (var count = 0; this.state.result[count] != null; count++){
                var total_rental_date = this.state.return_date - this.state.rental_date;                

                if (total_rental_date == 0){
                    var total_rental_time = this.state.return_time - this.state.rental_time;

                    //this.setState({cost:this.state.result[count]["twelve_hour"]});                    
                    if(total_rental_time <= 600){ //6시간 이하
                        this.setState({cost:this.state.cost.concat(this.state.result[count]["six_hour"])});
                    } else if(total_rental_time <= 1000){ //10시간 이하
                        this.setState({cost:this.state.cost.concat(this.state.result[count]["ten_hour"])});
                    } else if(total_rental_time <= 1200){ //12시간 이하
                        this.setState({cost:this.state.cost.concat(this.state.result[count]["twelve_hour"])});
                    } else{ // 하루
                        this.setState({cost:this.state.cost.concat(this.state.result[count]["two_days"])});
                    }
                }else{
                    if(total_rental_date <= 2) {
                        this.setState({cost:this.state.cost.concat((this.state.result[count]["two_days"]) * total_rental_date)});
                    }else if(total_rental_date <= 4) {
                        this.setState({cost:this.state.cost.concat((this.state.result[count]["four_days"]) * total_rental_date)});
                    }else if(total_rental_date <= 6){
                        this.setState({cost:this.state.cost.concat((this.state.result[count]["six_days"]) * total_rental_date)});
                    }else{
                        this.setState({cost:this.state.cost.concat((this.state.result[count]["more"]) * total_rental_date)});
                    }
                }

                this.setState({image:this.state.image.concat(this.state.result[count]["image"])});
                this.setState({car_name:this.state.car_name.concat(this.state.result[count]["car_name"])});
                this.setState({color:this.state.color.concat(this.state.result[count]["color"])});
                this.setState({few:this.state.few.concat(this.state.result[count]["few"])});
                this.setState({fuel:this.state.fuel.concat(this.state.result[count]["fuel"])});
                this.setState({distance:this.state.distance.concat(this.state.result[count]["distance"])});
                this.setState({registration_date:this.state.registration_date.concat(this.state.result[count]["registration_date"])});
                this.setState({car_number:this.state.car_number.concat(this.state.result[count]["car_number"])});
            }

            this.setState({count:count});
            this.setState({total_count:this.state.result[0]["total_count"]});
        }.bind(this))
        .then(function(){
            //page
            console.log("total_count = ", this.state.total_count);

            const pageNumbers = [];
            for (let i = 1; i <= (Math.floor((this.state.total_count -1) / 5))+1; i++){
                pageNumbers.push(i);
            }

            const renderPageNUmbers = pageNumbers.map(number => {
                return(
                    <li key={number} id={number} onClick={this.handleClick}>
                        {number}
                    </li>
                );
            });

            this.setState({page_numbers:renderPageNUmbers});

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
        this.setRent_1({
            area: this.state.area,
            rental_point: this.state.rental_point,
            return_point: this.state.return_point,
            rental_date: this.state.r_rental_date,
            rental_time: this.state.r_rental_time,
            return_date: this.state.r_return_date,
            return_time: this.state.r_return_time,
            start_number: this.state.currentPage,
            car_type: this.state.car_type
        })
    }

    lastSetRent(opts){
        fetch('/reservation', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({returned:'5'});
            cookie.save('reserves', this.state.result, {path: '/'});
            this.submitReservationNumber();            
        }.bind(this)); 
    }

    submitGit_2(){
        var min = 100000;
        var max = 999999;
        var reservation_number = parseInt(min + (Math.random() * (max-min)));

        this.setState({reservation_number:reservation_number});

        this.lastSetRent({
            reservation_number: reservation_number,
            email: this.state.email,
            car_number: this.state.car_number[this.state.division_number],
            cost: this.state.cost,
            rental_date: this.state.rental_date+this.state.rental_time+"00",
            return_date: this.state.return_date+this.state.return_time+"00",
            rental_point: this.state.rental_point,
            return_point: this.state.return_point,
            babyseat: this.state.babyseat,
            kor_navigation: this.state.kor_navigation,
            eng_navigation: this.state.eng_navigation,
            cdw: this.state.cdw,
            usepoint: this.state.usepoint,
        })
    }

    SendToReservationNumber(opts){
        fetch('/send_reservation', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
        }.bind(this))
    }

    submitReservationNumber(){
        this.SendToReservationNumber({
            email: this.state.email,
            reservation_number: this.state.reservation_number
        })
    }

    rent_1_Check(){
        var today = new Date();

        if(today.getMonth()+1 < 10) {
            this.setState({date:today.getFullYear() + "0" + (today.getMonth()+1)+ "" + today.getDate()});
        }
        else{
        this.setState({date: today.getFullYear() + "" + (today.getMonth()+1)+ "" + today.getDate()});            
        }

        if(today.getMinutes() < 10){
            this.setState({time: today.getHours() + "0" + today.getMinutes()});
        }
        else{
            this.setState({time: today.getHours() + "" + today.getMinutes()});
        }
        if(this.state.area=="" || this.state.rental_point=="" || this.state.return_point=="" || this.state.rental_date=="" || this.state.return_date==""){
            alert("빠짐없이 다 입력해주십시오.");
            return;
        }

        if((parseInt(this.state.rental_date) < parseInt(this.state.date))|| ((parseInt(this.state.rental_date) == parseInt(this.state.date)) && ((parseInt(this.state.rental_time) - parseInt(this.state.time)) < 0))){
            alert("지나간 날에는 대여할 수 없습니다.");
            return;
        }

        if((parseInt(this.state.return_date) < parseInt(this.state.rental_date)) || ((parseInt(this.state.rental_date) == parseInt(this.state.return_date)) && (parseInt(this.state.return_time) - parseInt(this.state.rental_time)) < 0)){
            alert("반납일자는 대여일자보다 먼저일 수 없습니다.");
            return;
        }

        if((parseInt(this.state.rental_date) == parseInt(this.state.return_date)) && ((parseInt(this.state.return_time) - parseInt(this.state.rental_time)) < 100)){
            alert("대역 정책에 따라 대여는 1시간 이상 선택하셔야 대여가 가능합니다.");
            return;
        }

        this.setState({returned: '2'});

        this.submitGit();
    }


    //page
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });

        this.submitGit();
    }

    //test
    testdivison_number(){
        alert(this.state.division_number);
    }

    click_home(){
        window.location.reload();
    }
    log_out(){
        cookie.remove('name', {path:'/'});
        cookie.remove('username', {path:'/'});
        cookie.remove('reserves', {path:'/'});
        cookie.remove('email', {path:'/'});
        window.location.reload();
    }
    click_reservation(){
        this.setState({returned:'r'});
    }

    render(){
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {
            
        }

        let first_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="390">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 렌터카 예약 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr>
                                            <th width="77"> 지역 </th>
                                            <td>
                                                <select onChange={this.areaChange.bind(this)} className="search_rent_select">
                                                    <option id="1" value="inland"> 내륙 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 대여지점 </th>
                                            <td>
                                                <select onChange={this.rental_pointChange.bind(this)} className="search_rent_select">>
                                                    <option id="1" value="Gangnam">강남</option>
                                                    <option id="2" value="DongDaeMoon">동대문</option>
                                                    <option id="3" value="Yeouido">여의도</option>
                                                    <option id="4" value="Guro">구로</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 반납지점 </th>
                                            <td>
                                                <select onChange={this.return_pointChange.bind(this)} className="search_rent_select">>
                                                    <option id="1" value="Gangnam">강남</option>
                                                    <option id="2" value="DongDaeMoon">동대문</option>
                                                    <option id="3" value="Yeouido">여의도</option>
                                                    <option id="4" value="Guro">구로</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 대여일시 </th>
                                            <td>
                                                <input type="date" name="rental_date" onChange={this.rental_dateChange.bind(this)} className="search_rent_date"></input>&nbsp;
                                                <input type="time" name="rental_time" onChange={this.rental_timeChange.bind(this)} className="search_rent_date"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 반납일시 </th>
                                            <td>
                                                <input type="date" name="return_date" onChange={this.return_dateChange.bind(this)} className="search_rent_date"></input>&nbsp;
                                                <input type="time" name="return_time" onChange={this.return_timeChange.bind(this)} className="search_rent_date"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>
                                                <button onClick={this.rent_1_Check.bind(this)} className="search_rent_button"> 검색 </button>
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
        let second_Form = (
            <div>
                <table class="rent_second_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="1200">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 렌터카 선택 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="radio" name="radio" value="0" onChange={this.car_typeChange.bind(this)} checked={(this.state.car_type=='' || this.state.car_type=='0')?true:false}/>
                                                전체
                                                <input type="radio" name="radio" value="1" onChange={this.car_typeChange.bind(this)}/>
                                                소형
                                                <input type="radio" name="radio" value="2" onChange={this.car_typeChange.bind(this)}/>
                                                중형
                                                <input type="radio" name="radio" value="3" onChange={this.car_typeChange.bind(this)}/>
                                                대형
                                                <input type="radio" name="radio" value="4" onChange={this.car_typeChange.bind(this)}/>
                                                승합
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type="radio" name="radio" value="5" onChange={this.car_typeChange.bind(this)}/>
                                                SUV/RV
                                                <input type="radio" name="radio" value="6" onChange={this.car_typeChange.bind(this)}/>
                                                수입차
                                                <input type="radio" name="radio" value="7" onChange={this.car_typeChange.bind(this)}/>
                                                오픈카
                                                <input type="radio" name="radio" value="8" onChange={this.car_typeChange.bind(this)}/>
                                                전기차
                                                <input type="radio" name="radio" value="9" onChange={this.car_typeChange.bind(this)}/>
                                                캐릭터카
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                        <tr style={this.state.car_name[0]==null?noneStyle:blockStyle} onClick={this.tr_click_0.bind(this)}>
                                            <td>
                                                <img src={this.state.image[0]} width="230" height="130"/>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.car_name[0]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.fuel[0]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.few[0]} </span> 
                                            </td>
                                            <td width="230">
                                                <span> {this.state.color[0]} </span>
                                            </td>
                                        </tr>
                                        <tr style={this.state.car_name[1]==null?noneStyle:blockStyle} onClick={this.tr_click_1.bind(this)}>
                                            <td>
                                                <img src={this.state.image[1]} width="230" height="130"/>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.car_name[1]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.fuel[1]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.few[1]} </span> 
                                            </td>
                                            <td width="230">
                                                <span> {this.state.color[1]} </span>
                                            </td>
                                        </tr>
                                        <tr style={this.state.car_name[2]==null?noneStyle:blockStyle} onClick={this.tr_click_2.bind(this)}>
                                            <td>
                                                <img src={this.state.image[2]} width="230" height="130"/>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.car_name[2]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.fuel[2]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.few[2]} </span> 
                                            </td>
                                            <td width="230">
                                                <span> {this.state.color[2]} </span>
                                            </td>
                                        </tr>
                                        <tr style={this.state.car_name[3]==null?noneStyle:blockStyle} onClick={this.tr_click_3.bind(this)}>
                                            <td>
                                                <img src={this.state.image[3]} width="230" height="130"/>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.car_name[3]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.fuel[3]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.few[3]} </span> 
                                            </td>
                                            <td width="230">
                                                <span> {this.state.color[3]} </span>
                                            </td>
                                        </tr>
                                        <tr style={this.state.car_name[4]==null?noneStyle:blockStyle} onClick={this.tr_click_4.bind(this)}>
                                            <td>
                                                <img src={this.state.image[4]} width="230" height="130"/>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.car_name[4]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.fuel[4]} </span>
                                            </td>
                                            <td width="230">
                                                <span> {this.state.few[4]} </span> 
                                            </td>
                                            <td width="230">
                                                <span> {this.state.color[4]} </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5} className="page_td">
                                                <div className="page_div">
                                                    <ul id="page-numbers">
                                                        {this.state.page_numbers}
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

        let third_Form = (
            <div>
                <table class="rent_second_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="770">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 렌터카 예약 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={2}>
                                                <img src={this.state.image[this.state.division_number]} width="400" height="280" onClick = {this.testdivison_number.bind(this)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                자동차 명
                                            </th>
                                            <td>
                                                {this.state.car_name[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                연료
                                            </th>
                                            <td>
                                                {this.state.fuel[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                N인승
                                            </th>
                                            <td>
                                                {this.state.few[this.state.division_number]} 인승
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
                                                차량 등록일
                                            </th>
                                            <td>
                                                {this.state.registration_date[this.state.division_number]}
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
                                                대여료
                                            </th>
                                            <td>
                                                {this.state.show_cost}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                현재 포인트
                                            </th>
                                            <td>
                                                {cookie.load('reserves')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                사용할 포인트
                                            </th>
                                            <td>
                                                <input type="number" className="base_input" onChange={this.usepointChange.bind(this)}/> 
                                                &nbsp;포인트는 5000원 이상일 때만 사용 가능합니다.
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 자차 손핵 면책 제도(CDW) </th>
                                            <td>
                                                <input type="radio" name="radio" value="0" checked={(this.state.cdw=='0')?true:false} onChange={this.cdwChange.bind(this)}/>
                                                보험 미적용 (0원)
                                                <input type="radio" name="radio" value="1" onChange={this.cdwChange.bind(this)}/>
                                                고객부담금 면제 (30,000원)
                                                <input type="radio" name="radio" value="2" onChange={this.cdwChange.bind(this)}/>
                                                5만원 (18,000원)
                                                <input type="radio" name="radio" value="3" onChange={this.cdwChange.bind(this)}/>
                                                30만원 (14,000원)
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                내비게이션 무료
                                            </th>
                                            <td>
                                                <input type="checkbox" onChange={this.kor_navigationChange.bind(this)} defaultChecked="checked"/> 한글 내비게이션 
                                                <input type="checkbox" onChange={this.eng_navigationChange.bind(this)}/> 영문 내비게이션 
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 베이비 시트 </th>
                                            <td> <input type="checkbox" onChange={this.babyseatChange.bind(this)}/> 베이비시트 </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.renting_button_click.bind(this)} className="non_member_feedback_button"> 대여하기 </button>
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
        let fourth_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="600">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 개인 정보 </div>
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
                                                <input type="text" value={cookie.load('name')} onChange={this.nameChange.bind(this)} className="base_input" />
                                            </td>
                                        </tr>   
                                        <tr>
                                            <th>
                                                이메일
                                            </th>
                                            <td>
                                                <input type="text" value={cookie.load('email')} onChange={this.emailChange.bind(this)} className="base_input" />
                                            </td>
                                        </tr>     
                                        <tr>
                                            <th>
                                                면허 구분
                                            </th>
                                            <td>
                                                <select defaultValue={cookie.load('license_category')} onChange={this.license_categoryChange.bind(this)} className="select_base">
                                                    <option id="1" value="1">국내</option>
                                                    <option id="2" value="2">국외</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                면허 종류
                                            </th>
                                            <td>
                                                <select defaultValue={cookie.load('license_type')} onChange={this.license_typeChange.bind(this)} className="select_base">
                                                    <option id="1" value="1">1종대형</option>
                                                    <option id="2" value="2">1종보통</option>
                                                    <option id="3" value="3">2종보통</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                면허증 번호
                                            </th>
                                            <td>
                                                <select defaultValue={cookie.load('license_number').slice(0,1)} onChange={this.license_number_0Change.bind(this)} className="mypage_license_number_select">
                                                    <option id="1" value="1">서울</option>
                                                    <option id="2" value="2">11</option>
                                                </select>
                                                &nbsp;
                                                <input type="number" size="2" maxLength={2} defaultValue={cookie.load('license_number').slice(1,3)} onChange={this.license_number_1Change.bind(this)}  className="mypage_license_number_1"></input>
                                                -
                                                <input type="number" size="6" maxLength={6} defaultValue={cookie.load('license_number').slice(3,9)} onChange={this.licesne_number_2Change.bind(this)}  className="mypage_license_number_2"></input>
                                                -
                                                <input type="number" size="2" maxLength={2} defaultValue={cookie.load('license_number').slice(9,11)} onChange={this.license_number_3Change.bind(this)}  className="mypage_license_number_3"></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                면허발급일자
                                            </th>
                                            <td>
                                                <input type="date" defaultValue={cookie.load('date_if_issue').slice(0,10)} onChange={this.date_if_issueChange.bind(this)} className="search_rent_date" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 
                                                적성 검사
                                            </th>
                                            <td>
                                                <input type="date" defaultValue={cookie.load('aptitude_test').slice(0,10)} onChange={this.aptitude_testChange.bind(this)} className="search_rent_date" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                예약완료를 위한 이용자 동의 사항
                                            </th>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <input type="checkbox" onChange={this.check_0Change.bind(this)}/> 예약완료를 위한 이용 동의(필수), 차량 대여를 위한 개인정보 수집/이용 동의(필수), <br /> 개인정보 취급 위탁 동의(필수), 개인정보 제 3자 제공 동의(필수)에 모두 동의합니다.
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.last_button_click.bind(this)} className="find_id_button"> 대여하기 </button>
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

        let last_Form = (
            <div>
                <table className="find_id_table">
                    <tbody>
                        <div className="find_id_div">
                            <tr>
                                <th>
                                    예약번호
                                </th>
                                <td>
                                    {this.state.reservation_number}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    회원님의 메일로 예약번호를 전송하였습니다.
                                </td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            </div>                
        )

        if(this.state.returned == '1'){
            return first_Form;
        }
        else if(this.state.returned == '2'){
            return second_Form;
        }else if(this.state.returned == '3'){
            return third_Form;
        }else if(this.state.returned == '4'){
            return fourth_Form;
        }else if(this.state.returned == '5'){
            return last_Form;
        }
    }
}

//module.exports = Rent_1;
export default Rent_1;