import React from 'react';
import ReactDOM from 'react-dom';

class SendEmail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: ""
        };
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.email] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        this.props.onSubmit(this.state.email);
        this.setState({email:''})
    }

    render(){
        return (
            <div>
                <p>
                    <input type="text" 
                    name="email" 
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleClick.bind(this)}> 인증번호 보내기 </button>
                </p>
            </div>
        );
    }
}
module.exports = SendEmail;