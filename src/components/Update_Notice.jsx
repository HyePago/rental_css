import React from 'react'
import ReactDOM from 'react-dom'
import cookie from 'react-cookies'

import './Header.css'

class Update_Notice extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            sort: '2',
            currentPage: '',
            total_page: '',
            division_number: 0,
            result: '',
            test_number: 0,
            id: [],
            title: [],
            content: [],
            timestamp: [],
            update_title: '',
            update_content: '',
            search_select: '1',
            search_text: '',
            searching: 0,
        }
    }

    componentDidMount(opts){
        this.submitGit_NoticeList();
    }

    sortChange(e){
        this.setState({sort:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_NoticeList();
        } else {
            this.submitGit_Search();
        }
    }
    search_selectChange(e){
        this.setState({search_select:e.target.value});
    }
    search_textChange(e){
        this.setState({search_text:e.target.value});
    }

    //notice_list
    setNoticeList(opts){
        fetch('/notice_list', {
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
            this.setState({title:[]});
            this.setState({content:[]});
            this.setState({timestamp:[]});

            for(var count=0; this.state.result[count] != null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({content:this.state.content.concat(this.state.result[count]["content"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_NoticeList();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_NoticeList(){
        this.setNoticeList({
            sort: this.state.sort,
            currentPage: this.state.currentPage,
        })
    }

    //page
    handleClick(e){
        this.setState({currentPage: e.target.id});
        this.submitGit_NoticeList();
    }

    //
    division_numberChange(e){
        this.setState({division_number:e.target.id});
        this.setState({returned:2});
    }
    back_click(){
        this.setState({returned:1});
    }
    update_click(){
        this.setState({returned:3});
        this.setState({update_title: this.state.title[this.state.division_number]});
        this.setState({update_content: this.state.content[this.state.division_number]});
    }
    update_cancel_click(){
        this.setState({returned:2});
    }
    update_titleChange(e){
        this.setState({update_title:e.target.value});
    }
    update_contentChange(e){
        this.setState({update_content:e.target.value});
    }

    last_update_click(){
        if(this.state.update_title=='' || this.state.update_content==''){
            alert("빠짐없이 입력해주세요.");
            return;
        }

        this.submitGit_Update();
    }
    submitGit_Update(){
        this.setUpdateNotice({
            id: this.state.id[this.state.division_number],
            title: this.state.update_title,
            content: this.state.update_content,
        })
    }
    setUpdateNotice(opts){
        fetch("/update_notice", {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            if(this.state.result=="true"){
                this.submitGit_NoticeList();
                this.setState({returned:2});
            }else{
                alert("업로드에 실패하였습니다."); 
            }
        }.bind(this))
    }

    //search
    click_search_button(){
        this.setState({currentPage:''});

        if(this.state.search_text != ''){
            this.setState({searching: 1});
            this.submitGit_Search();
        } else {
            this.submitGit_NoticeList();
        }
    }
    setSearch(opts){
        fetch('/search_notice', {
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
            this.setState({title:[]});
            this.setState({content:[]});
            this.setState({timestamp:[]});

            for(var count=0; this.state.result[count] != null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({title:this.state.title.concat(this.state.result[count]["title"])});
                this.setState({content:this.state.content.concat(this.state.result[count]["content"])});
                this.setState({timestamp:this.state.timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({total_page:this.state.result[0]["total_count"]});
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_Search();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_Search(){
        this.setSearch({
            sort: this.state.sort,
            currentPage: this.state.currentPage,
            search_text: this.state.search_text,
            search_select: this.state.search_select
        })
    }

    render(){
        // style
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {}

        // page_number
        const pageNumbers = [];
        for(let i = 1; i <= (Math.floor((this.state.total_page - 1) / 20)) + 1 ; i++){
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
         const notice_number = [];
         for(let i=0; i<20; i++){
             notice_number.push(i);
         }
         const notice_list = notice_number.map(number => {
             return (
                 <tr key={number} id={number} style={this.state.title[number] == null ? noneStyle : blockStyle}>
                     <td id={number} onClick={this.division_numberChange.bind(this)}>
                         {this.state.id[number]}
                     </td>
                     <td id={number} onClick={this.division_numberChange.bind(this)}>
                         {this.state.title[number]}
                     </td>
                     <td id={number} onClick={this.division_numberChange.bind(this)}>
                         {this.state.timestamp[number]}
                     </td>
                 </tr>
             )
         })

         let show_notice_list = (
            <div>
            <table class="non_member_reservation_table">
                <tbody>
                    <tr>
                        <td>
                            <table width="700">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="sign_up_logo"> 공지사항 </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="email_certification_table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <select defaultValue={2} onChange={this.sortChange.bind(this)}>
                                                <option value={1}> 등록된지 오래된 순 </option>
                                                <option value={2}> 최근 등록 순 </option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={100}>
                                            번호
                                        </td>
                                        <td width={250}>
                                            제목
                                        </td>
                                        <td width={200}>
                                            올린 날짜
                                        </td>
                                    </tr>
                                    {notice_list}
                                    <tr>
                                        <th> </th>
                                        <td colSpan={2} align="center">
                                            <select onChange={this.search_selectChange.bind(this)} className="select_base">
                                                <option value={1}> 글 제목 </option>
                                                <option value={2}> 글 내용 </option>
                                            </select>
                                            &nbsp;
                                            <input type="text" onChange={this.search_textChange.bind(this)} className="base_input" />
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
         let show_notice = (
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
                                        <tr>
                                            <th>
                                                올린 일자
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
                                                {this.state.content[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button onClick={this.update_click.bind(this)} className="input_notice_update_button"> 수정 </button>
                                                <button onClick={this.back_click.bind(this)} className="input_notice_update_button"> 뒤로 </button>
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
        let update_notice_Form = (
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
                                                번호
                                            </th>
                                            <td>
                                                {this.state.id[this.state.division_number]}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                글제목
                                            </th>
                                            <td>
                                                <input type="text" defaultValue={this.state.title[this.state.division_number]} size="49" className="input_notice_title" onChange={this.update_titleChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                올린 일자
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
                                                <textarea rows={10} cols={57} defaultValue={this.state.content[this.state.division_number]} className="input_notice_contents" onChange={this.update_contentChange.bind(this)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <td>
                                                <button type="button" className="input_notice_update_button" onClick={this.last_update_click.bind(this)}> 수정 </button>
                                                <button type="button" className="input_notice_update_button" onClick={this.update_cancel_click.bind(this)}> 취소 </button>
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
             return show_notice_list;
         } else if(this.state.returned == 2){
             return show_notice;
         } else if(this.state.returned == 3){
             return update_notice_Form;
         }
    }
}

export default Update_Notice;