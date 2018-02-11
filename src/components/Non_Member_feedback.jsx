import React from 'react'
import ReactDOM from 'react-dom'

import './Header.css'

class Non_Member_feedback extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            email: '',
            certification_number: '',
            input_certification_number: '',
            result: '',
            currentPage:'',
            total_page: '',
            id: [],
            name: [],
            phone: [],
            division: [],
            category: [],
            title: [],
            contents: [],
            timestamp: [],
            division_number: 0,
            input_division:"",
            input_category:"",
            sort:'1',
            result:'',
            test_number:0,
            search_select: '1',
            search_text: '',
            searching: 0,
            update_division: '',
            update_category: '',
            update_title: '',
            update_contents: '',
        }
    }

    emailChange(e){
        this.setState({email:e.target.value});
    }
    input_certification_numberChange(e){
        this.setState({input_certification_number:e.target.value});
    }
    search_selectChange(e){
        this.setState({search_select:e.target.value});
    }
    search_textChange(e){
        this.setState({search_text:e.target.value});
    }
    update_click(){
        this.setState({returned: 4});

        this.setState({update_division:this.state.division[this.state.division_number]});
        this.setState({update_category:this.state.category[this.state.division_number]});
        this.setState({update_title:this.state.title[this.state.division_number]});
        this.setState({update_contents:this.state.contents[this.state.division_number]});
    }
    update_titleChange(e){
        this.setState({update_title:e.target.value});
    }
    update_contentsChange(e){
        this.setState({update_contents:e.target.value});
    }
    update_categoryChange(e){
        this.setState({update_category:e.target.value});
    }
    update_divisionChange(e){
        this.setState({update_division:e.target.value});
    }
    update_cancel_click(){
        this.setState({returned:3});
    }

    //certification
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

            this.submitGit_FeedbackList();
            this.setState({returned:2});
        }.bind(this))
    }
    submitGit_certification(){
        if(this.state.email == '' || this.state.input_certification_number == ''){
            alert("빠짐없이 입력해주세요.");
            return;
        }

        this.setCertification({
            email:this.state.email,
            certification_number:this.state.input_certification_number
        })
    }

    //feedback_list
    setFeedbackList(opts){
        fetch('/member_feedback_list', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({id:[]});
            this.setState({name:[]});
            this.setState({phone:[]})
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});

            for(var count=0; this.state.result[count] != null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({phone:this.state.phone.concat(this.state.result[count]["phone"])});
                this.setState({division:this.state.division.concat(this.state.result[count]["division"])});
                this.setState({category:this.state.category.concat(this.state.result[count]["category"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({contents:this.state.contents.concat(this.state.result[count]["contents"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_FeedbackList();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_FeedbackList(){
        this.setFeedbackList({
            email:this.state.email,
            currentPage: this.state.currentPage,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort
        })
    }

    click_home(){
        window.location.reload();
    }
    click_sign_up(){
        this.setState({state_1:'s'});
    }
    click_sign_in(){
        this.setState({state_1:'i'});
    }
    click_ImageTest(){
        this.setState({state_1:'t'});
    }
    click_nonmember_service(){
        this.setState({state_1:'ns'});
    }

    division_numberChange(e){
        this.setState({division_number:e.target.id});
        this.setState({returned:3});
    }
    input_categoryChange(e){
        this.setState({input_category:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    input_divisionChange(e){
        this.setState({input_division:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        }else{
            this.submitGit_Search();
        }
    }
    sortChange(e){
        this.setState({sort:e.target.value});
        if(this.state.searching==0){
            this.submitGit_FeedbackList();
        } else{
            this.submitGit_Search();
        }
    }

    //page
    handleClick(e){
        this.setState({currentPage: e.target.id});
        if(this.state.searching==0){
            this.submitGit_FeedbackList();
        } else{
            this.submitGit_Search();
        }
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
    back_list(){
        this.setState({returned:2});
    }

    //search
    click_search_button(){
        this.setState({currentPage:''});

        if(this.state.search_text != ''){
            this.setState({searching:1});
            this.submitGit_Search();
        }else{
            this.setState({searching:0});
            this.submitGit_FeedbackList();
        }
    }
    setSearch(opts){
        fetch('/search_member_feedback', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({id:[]});
            this.setState({name:[]});
            this.setState({phone:[]})
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});

            for(var count=0; this.state.result[count] != null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({phone:this.state.phone.concat(this.state.result[count]["phone"])});
                this.setState({division:this.state.division.concat(this.state.result[count]["division"])});
                this.setState({category:this.state.category.concat(this.state.result[count]["category"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({contents:this.state.contents.concat(this.state.result[count]["contents"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number==0){
                this.setState({test_number:1});
                this.submitGit_Search();
            }else {
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_Search(){
        this.setSearch({
            currentPage: this.state.currentPage,
            email: this.state.email,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort,
            search_text: this.state.search_text,
            search_select: this.state.search_select,
        })
    }

    //update
    setUpdate(opts){
        fetch('/update_feedback', {
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
                this.submitGit_FeedbackList();
                this.setState({returned: 3});
            } else {
                alert("업로드에 실패하였습니다.");
                return;
            }
        }.bind(this))
    }

    submitGit_Update(){
        if(this.state.update_title=='' || this.state.update_contents==''){
            alert("빠짐없이 다 입력해주세요.");
            return;
        }

        this.setUpdate({
            id: this.state.id[this.state.division_number],
            title: this.state.update_title,
            division: this.state.update_division,
            category: this.state.update_category,
            contents: this.state.update_contents,
        })
    }

    render(){
         //style
         const noneStyle = {
            display: 'none',
        }
        const blockStyle = {
        }

        //page_number
        const pageNumbers = [];
        for(let i = 1; i <= (Math.floor((this.state.total_page - 1) / 5)) + 1 ; i++){
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                </li>
            )
        })

        //list
        const impormation_number = [];
        for(let i = 0; i < 5; i++){
            impormation_number.push(i);
        }
        const impormation_feedback = impormation_number.map(number => {
            return(
                <tr key={number} id={number} style={this.state.title[number] == null? noneStyle : blockStyle}>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.id[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.title[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.name[number]} ({this.state.email})
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.timestamp[number]}
                    </td>
                </tr>
            )
        })

        let email_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="381">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 내 의견 보기 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table">
                                    <tbody>
                                        <tr>
                                            <th>
                                                이메일
                                            </th>
                                            <td>
                                                <input type="text" onChange={this.emailChange.bind(this)} className="base_input"/> &nbsp;
                                                <button onClick={this.submitGit_email.bind(this)} className="find_id_email_send_button"> 인증번호 전송 </button>
                                            </td>    
                                        </tr>
                                        <tr>
                                            <th>
                                                인증번호
                                            </th>      
                                            <td>
                                                <input type="number" size={7} onChange={this.input_certification_numberChange.bind(this)} className="base_input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.submitGit_certification.bind(this)} className="find_pwd_button"> 확인 </button>
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

        let show_feedback_list = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="800">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 내 의견 보기 </div>
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
                                                <select onChange={this.input_divisionChange.bind(this)} className="select_base">
                                                    <option value=""> 전체 </option>
                                                    <option value="차량"> 차량 </option>
                                                    <option value="사이트"> 사이트 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                카테고리
                                            </th>
                                            <td>
                                                <select onChange={this.input_categoryChange.bind(this)} className="select_base">
                                                    <option value=""> 전체 </option>
                                                    <option value="칭찬"> 칭찬 </option>
                                                    <option value="불만"> 불만 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                정렬방법
                                            </th>
                                            <td>
                                                <select defaultValue={1} onChange={this.sortChange.bind(this)} className="select_base">
                                                    <option value={1}> 등록된지 오래된 순 </option>
                                                    <option value={2}> 최근 등록된 순 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th width={100}>
                                                번호
                                            </th>
                                            <th width={250}>
                                                제목
                                            </th>
                                            <th width={150}>
                                                이름 (이메일)
                                            </th>
                                            <th width={200}>
                                                올린 날짜
                                            </th>
                                        </tr>
                                        {impormation_feedback}
                                        <tr>
                                            <th> </th>
                                            <td colSpan={3}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <select onChange={this.search_selectChange.bind(this)} className="select_base">
                                                    <option value={1}> 글 제목 </option>
                                                    <option value={2}> 글 내용 </option>
                                                </select>
                                                &nbsp;
                                                <input type="text" onChange={this.search_textChange.bind(this)} className="base_input"/>
                                                <button onClick={this.click_search_button.bind(this)} className="find_pwd_button"> 검색 </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4} className="page_td"> 
                                                <div className="page_div">
                                                    <ul id="page-numbers">
                                                        {renderPageNumbers}
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
        let show_feedback_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="500">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> {this.state.title[this.state.division_number]} </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table" width="500">
                                    <tbody>
                                        <tr width="150">
                                            <th> 구분 </th>
                                            <td>
                                                {this.state.division[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                카테고리
                                            </th>
                                            <td>
                                                {this.state.category[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                올린 날짜
                                            </th>
                                            <td>
                                                {this.state.timestamp[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                내용
                                            </th>
                                            <td>
                                                {this.state.contents[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.back_list.bind(this)} className="find_id_button"> 목록 </button>
                                                <button onClick={this.update_click.bind(this)} className="find_id_button"> 수정 </button>
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
        let update_feedback_Form = (
            <div>
                <table class="non_member_reservation_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="500">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 게시글 수정 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table" width="500">
                                    <tbody>
                                        <tr>
                                            <th>
                                                제목
                                            </th>
                                            <td>
                                                <input type="text" size="49" onChange={this.update_titleChange.bind(this)} defaultValue={this.state.update_title} className="input_notice_title" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                구분
                                            </th>
                                            <td>
                                                <select defaultValue={this.state.update_division} onChange={this.update_divisionChange.bind(this)} className="select_base">
                                                    <option value="차량"> 차량 </option>
                                                    <option value="사이트"> 사이트 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                카테고리
                                            </th>
                                            <td>
                                                <select defaultValue={this.state.update_category} onChange={this.update_categoryChange.bind(this)} className="select_base">
                                                    <option value="칭찬"> 칭찬 </option>
                                                    <option value="불만"> 불만 </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                올린 날짜
                                            </th>
                                            <td>
                                                {this.state.timestamp[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                내용
                                            </th>
                                            <td>
                                                <textarea rows={10} cols={57} onChange={this.update_contentsChange.bind(this)} defaultValue={this.state.update_contents} className="input_notice_contents" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.submitGit_Update.bind(this)} className="non_member_feedback_button"> 수정 </button>
                                                <button onClick={this.update_cancel_click.bind(this)} className="non_member_feedback_button"> 취소 </button>
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

        if (this.state.returned == 1){
            return email_Form;
        }else if(this.state.returned == 2){
            return show_feedback_list;
        }else if(this.state.returned == 3){
            return show_feedback_Form;
        }else if(this.state.returned == 4){
            return update_feedback_Form;
        }
    }
}

export default Non_Member_feedback;