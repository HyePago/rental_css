import React from 'react'
import ReactDOM from 'react-dom'

import './Header.css'

class Total_Feedback_List extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            returned: 1,
            currentPage: '',
            total_page: '',
            id:[],
            name:[],
            email:[],
            division:[],
            category:[],
            title:[],
            contents:[],
            timestamp:[],
            division_number:0,
            input_division:'',
            input_category:'',
            sort:'1',
            result:'',
            test_number:0,
            search_text: '',
            search_select: '1',
            searching: 0,
            admin: [],
            comment: [],
            comment_timestamp: '',
            comment_currentPage: '',
            comment_total_page: '',
            input_comment: '',
        }
    }

    componentDidMount(){
        this.submitGit_FeedbackList();
    }

    input_commentChange(e){
        this.setState({input_comment:e.target.value});
    }

    //list
    setFeedbackList(opts){
        fetch('/feedback_list', {
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
            this.setState({email:[]});
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});        

            for(var count=0; this.state.result[count]!=null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
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
            currentPage: this.state.currentPage,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort
        })
    }

    //page 
    handleClick(e){
        this.setState({currentPage: e.target.id});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    comment_handleClick(e){
        this.setState({comment_currentPage: e.target.id});
        this.submitGit_Contents();
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
        } else {
            this.submitGit_Search();
        }
    }
    sortChange(e){
        this.setState({sort:e.target.value});
        if(this.state.searching == 0){
            this.submitGit_FeedbackList();
        } else {
            this.submitGit_Search();
        }
    }
    division_numberChange(e){
        this.setState({division_number:e.target.id});
        this.setState({returned:2});
        this.submitGit_Contents();
    }
    search_selectChange(e){
        this.setState({search_select:e.target.value})
    }
    search_textChange(e){
        this.setState({search_text:e.target.value});
    }
    click_search_button(){
        this.setState({currentPage:''});

        if(this.state.search_text != ''){
            this.setState({searching: 1});
            this.submitGit_Search();
        } else {
            this.setState({searching: 0});
            this.submitGit_FeedbackList();
        }
    }

    //search
    setSearch(opts){
        fetch('/search_feedback_list', {
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
            this.setState({email:[]});
            this.setState({division:[]});
            this.setState({category:[]});
            this.setState({title:[]});
            this.setState({contents:[]});
            this.setState({timestamp:[]});        

            for(var count=0; this.state.result[count]!=null; count++){
                this.setState({id:this.state.id.concat(this.state.result[count]["id"])});
                this.setState({name:this.state.name.concat(this.state.result[count]["name"])});
                this.setState({email:this.state.email.concat(this.state.result[count]["email"])});
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
                this.submitGit_Search();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }
    submitGit_Search(){
        this.setSearch({
            currentPage: this.state.currentPage,
            division: this.state.input_division,
            category: this.state.input_category,
            sort: this.state.sort,
            search_text: this.state.search_text,
            search_select: this.state.search_select
        })
    }
    
    //contetns
    submitGit_Contents(){
        this.setContents({
            id: this.state.id[this.state.division_number],
            currentPage: this.state.comment_currentPage,
        })
    }
    setContents(opts){
        fetch('/feedback_list_comments', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.setState({comment:[]});
            this.setState({admin:[]});        
            this.setState({comment_timestamp:[]});   

            for(var count=0; this.state.result[count]!=null; count++){
                this.setState({comment:this.state.comment.concat(this.state.result[count]["comment"])});
                this.setState({comment_timestamp:this.state.comment_timestamp.concat(this.state.result[count]["timestamp"])});
                this.setState({comment_total_page:this.state.result[0]["total_count"]});   
            
                if(this.state.result[count]["admin"] == 1){
                    this.setState({admin:this.state.admin.concat("관리자")});
                } else {
                    this.setState({admin:this.state.admin.concat("글쓴이")});
                }

                console.log("admin = ", this.state.admin);
            }
        }.bind(this))
        .then(function(){
            if(this.state.test_number == 0){
                this.setState({test_number:1});
                this.submitGit_Contents();
            }else{
                this.setState({test_number:0});
            }
        }.bind(this))
    }

    backlist(){
        this.setState({returned:1});
    }
    
    //inser_comment
    submitGit_Insert_Comment(){
        this.setInsertComment({
            id: this.state.id[this.state.division_number],
            comment: this.state.input_comment,
        })
    }
    setInsertComment(opts){
        fetch('/admin_input_comment', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: "form="+JSON.stringify(opts)
        })
        .then((response) => { return response.json(); })
        .then((json) => { this.setState({result:json.result}); })
        .then(function(){
            this.submitGit_Contents();
        }.bind(this))
    }

    render(){
        //style
        const noneStyle = {
            display: 'none',
        }
        const blockStyle = {}

        //page_number
        const pageNumbers = [];

        for(let i = 1; i <= (Math.floor((this.state.total_page - 1) / 5)) + 1; i++){
            pageNumbers.push(i)
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.handleClick.bind(this)}>
                    {number}
                </li>
            )
        })

        //content_page
        const content_pageNumbers = [];
        
        for(let i = 1; i <= (Math.floor((this.state.comment_total_page - 1) / 5)) + 1; i++){
            content_pageNumbers.push(i)
        }
        
        const comment_renderPageNumbers = content_pageNumbers.map(number => {
            return(
                <li key={number} id={number} onClick={this.comment_handleClick.bind(this)}>
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
                <tr key={number} id={number} style={this.state.title[number] == null? noneStyle : blockStyle} onClick={this.division_numberChange.bind(this)}>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.id[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.title[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.name[number]}
                    </td>
                    <td id={number} onClick={this.division_numberChange.bind(this)}>
                        {this.state.timestamp[number]}
                    </td>
                </tr>
            )
        })

        //comment_list
        const comment_impormation_number = [];
        for(let i = 0; i < 5; i++){
            comment_impormation_number.push(i);
        }

        const comment_feedback = comment_impormation_number.map(number => {
            return(
                <tr key={number} id={number}>
                    <th id={number}>
                        {this.state.admin[number]}
                    </th>
                    <td>
                        {this.state.comment[number]}
                    </td>
                </tr>
            )
        })

        let show_feedback_list = (
            <div>
                <table class="rent_second_table">
                    <tbody>
                        <tr>
                            <td>
                                <table width="500">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="sign_up_logo"> 고객 의견 관리 </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="email_certification_table" width="500">
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
                                            <th></th>
                                            <td>
                                                <select onChange={this.sortChange.bind(this)} className="select_base">
                                                    <option value={1}> 등록된지 오래된 순 </option>
                                                    <option value={2}> 최근 등록된 순 </option>
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
                                            <td width={150}>
                                                이름 (이메일)
                                            </td>
                                            <td width={200}>
                                                올린 날짜
                                            </td>
                                        </tr>
                                        {impormation_feedback}
                                        <tr>
                                            <th></th>
                                            <td colSpan={4}>   
                                                <select onChange={this.search_selectChange.bind(this)} className="select_base" >
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

        let feedback_Form = (
            <div>
                <table class="base_table">
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
                                                구분
                                            </th>
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
                                                <button onClick={this.backlist.bind(this)} className="non_member_feedback_button"> 목록 </button>
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

        if(this.state.returned==1){
            return show_feedback_list;
        }else if(this.state.returned==2){
            return feedback_Form;
        }
    }
}

export default Total_Feedback_List;