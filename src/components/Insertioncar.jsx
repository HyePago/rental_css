import React from 'react';
import ReactDOM from 'react-dom'

import './Header.css'

class InsertionCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            returned:'',
            formdata:'',
            car_number: '',
            color: '',
            car_type: 1,
            fuel: '',
            few: '',
            distance: '',
            area: 'inland',
            point: 'Gangnam',
            name: '',
            six_hour: '',
            ten_hour: '',
            twelve_hour: '',
            two_days: '',
            four_days: '',
            six_days: '',
            more: '',
            car_priceid: '',
            result: '',
            image: '',
        };
    }

    fileChange(e){
        var formData  = new FormData();
        var data = e.currentTarget.files;

        for(var name in data) {
            formData.append(name, data[name]);
            console.log(name + ", " + e.currentTarget.files[name]);
        }

        this.setState({formdata:formData});
    }
    car_numberChange(e){
        this.setState({car_number:e.target.value});
    }
    colorChange(e){
        this.setState({color:e.target.value});
    }
    car_typeChange(e){
        this.setState({car_type:e.target.value});
    }
    fuelChange(e){
        this.setState({fuel:e.target.value});
    }
    fewChange(e){
        this.setState({few:e.target.value});
    }
    distanceChange(e){
        this.setState({distance:e.target.value});
    }
    areaChange(e){
        this.setState({area:e.target.value});
    }
    pointChange(e){
        this.setState({point:e.target.value});
    }
    nameChange(e){
        this.setState({name:e.target.value});
    }
    six_hourChange(e){
        this.setState({six_hour:e.target.value});
    }
    ten_hourChange(e){
        this.setState({ten_hour:e.target.value});
    }
    twelve_hourChange(e){
        this.setState({twelve_hour:e.target.value});
    }
    two_daysChange(e){
        this.setState({two_days:e.target.value});
    }
    four_daysChange(e){
        this.setState({four_days:e.target.value});
    }
    six_daysChange(e){
        this.setState({six_days:e.target.value});
    }
    moreChange(e){
        this.setState({more:e.target.value});
    }

    AddCheck(){
        if(this.state.formdata=="" || this.state.car_number=="" || this.state.color=="" || this.state.car_type=="" || this.state.fuel=="" || this.state.few=="" || this.state.distance=="" || this.state.area=="" || this.state.point=="" || this.state.name==""){
            alert("빠짐없이 다 입력해주세요. ");
            return;
        }

        this.setImageUpload();
    }

    setCarPriceUpload(opts){
        fetch('/upload_carprice', {
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
                    car_priceid:json.id
                }); 
            })
        .then(function(){
            if(this.state.car_priceid == "" || this.state.car_priceid == null){
                alert("등록에 실패하였습니다. 다시 시도해주세요.");
                return;
            }

            console.log("car price image : ", this.state.image);

            this.setCarUpload({
                image: this.state.image,
                car_number: this.state.car_number,
                color: this.state.color,
                type: this.state.car_type,
                fuel: this.state.fuel,
                few: this.state.few,
                distance: this.state.distance,
                area: this.state.area,
                point: this.state.point,
                car_priceid: this.state.car_priceid,
                name: this.state.name
            })
        }.bind(this))
    }

    setCarUpload(opts){
        fetch('/upload_car', {
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
                    result:json.result
                }); 
            })
        .then(function(){
            console.log(this.state.result);
            if(this.state.result=="false"){
                alert("등록에 실패하였습니다. 다시 시도해주세요.");
                return;
            }else if(this.state.result == "image"){
                alert("이미지 업로드가 제대로 되지 않았습니다. 다시 시도해주세요.");
                return;
            }else if(this.state.result == "car_number"){
                alert("이미 있는 자동차 번호입니다. 다시 한 번 확인해주세요.");
                return;
            }else{
                document.location.href = "/";
            }
        }.bind(this))
    }

    setImageUpload(){
        var PATH = "http://localhost:5000/public/upload_image/";        

        console.log("formdate => ", this.state.formdate);

        fetch('/upload_image', {
            method: 'POST',
            body: this.state.formdata
        })
        .then((response) => {return response.json(); })
        .then((json) => { this.setState({image: json.image_id}); })
        .then(function(){
            this.setCarPriceUpload({
                six_hour: this.state.six_hour,
                ten_hour: this.state.ten_hour,
                twelve_hour: this.state.twelve_hour,
                two_days: this.state.two_days,
                four_days: this.state.four_days,
                six_days: this.state.six_days,
                more: this.state.more
            })
        }.bind(this))
    }

    render(){
        let inser_car_Form = (
            <div>
                <table className="mypage_out_table">
                    <tbody>
                        <tr>
                            <td>
                                <div className="mypage_logo"> 차량 추가 </div>
                            </td>
                        </tr>
                        <tr height={2} bgcolor="cadetblue">
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <table width="640" className="insertioncar_table">
                                    <tbody>
                                        <tr>
                                            <th> 이미지 </th>
                                            <td>
                                                <input type="file" onChange={this.fileChange.bind(this)} name="uploadfile" className="none_style_class" />
                                                <input type="hidden" name="token" value="{{.}}"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 차량 번호 </th>
                                            <td>
                                                <input type="text" onChange={this.car_numberChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 차량 이름 </th>
                                            <td> 
                                                <input type="text" onChange={this.nameChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 차량 색상 </th>
                                            <td>
                                                <input type="text" onChange={this.colorChange.bind(this)} />
                                            </td>
                                        </tr>   
                                        <tr>
                                            <th> 유형 </th>
                                            <td>
                                                <select onChange={this.car_typeChange.bind(this)} className="insertioncar_table_select">
                                                    <option value={1}> 소형 </option>
                                                    <option value={2}> 중형 </option>
                                                    <option value={3}> 대형 </option>
                                                    <option value={4}> 승합 </option>
                                                    <option value={5}> SUV/RV </option>
                                                    <option value={6}> 수입차 </option>
                                                    <option value={7}> 오픈카 </option>
                                                    <option value={8}> 전기차 </option>
                                                    <option value={9}> 캐릭터카 </option>
                                                </select>
                                            </td>
                                        </tr>  
                                        <tr>
                                            <th> 연료 </th>
                                            <td>   
                                                <input type="text" onChange={this.fuelChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> N인승 </th>
                                            <td>
                                                <input type="number" onChange={this.fewChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 주행거리 </th>
                                            <td> 
                                                <input type="number" onChange={this.distanceChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 지역 </th>
                                            <td>
                                                <select onChange={this.areaChange.bind(this)} className="insertioncar_table_select">
                                                    <option value="inland"> 내륙 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 지점 </th>
                                            <td>
                                                <select onChange={this.pointChange.bind(this)} className="insertioncar_table_select">
                                                    <option value="Gangnam"> 강남 </option>
                                                    <option value="DongDaeMoon"> 동대문 </option>
                                                    <option value="Yeouido"> 여의도 </option>
                                                    <option value="Guro"> 구로 </option>
                                                </select>            
                                            </td>
                                        </tr>
                                        <tr>
                                            <th> 6시간 </th>
                                            <td> 
                                                <input type="number" onChange={this.six_hourChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th> 10시간 </th>
                                            <td>    
                                                <input type="number" onChange={this.ten_hourChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th> 12시간 </th>
                                            <td>    
                                                <input type="number" onChange={this.twelve_hourChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th> 1~2일 </th>
                                            <td>    
                                                <input type="number" onChange={this.two_daysChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th> 3~4일 </th>
                                            <td>    
                                                <input type="number" onChange={this.four_daysChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th> 5~6일 </th>
                                            <td>    
                                                <input type="number" onChange={this.six_daysChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr> 
                                            <th> 7일 이상 </th>
                                            <td>    
                                                <input type="number" onChange={this.moreChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.AddCheck.bind(this)} className="insertioncar_table_button"> 차량 등록 </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        return inser_car_Form
    }
}

export default InsertionCar;