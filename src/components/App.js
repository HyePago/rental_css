import React from 'react';
import ReactDOM from 'react-dom';
//import { Link, Switch } from 'react-router'
// import { Switch, Route } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header.js'
import SignInForm from './SignInForm.jsx'
import SignUpForm from './SignUpForm.jsx'
import FindId from './FindId.jsx'
import FindPwd from './FindPwd.jsx'
import Non_Member_reservation from './Non_Member_reservation.jsx'
import Reservation_history from './Reservation_history.jsx'
import Main from './Main.jsx'
import Rent_1 from './Rent_1.jsx'
import MyPage from './MyPage.jsx'
import Member_Service_Center from './Member_Service_Center.jsx'
import Member_feedback from './Member_feedback.jsx'
import Upload_Notice from './Upload_Notice.jsx'
import Notice from './Notice.jsx'
import Update_Notice from './Update_Notice.jsx'
import Non_Member_feedback from './Non_Member_feedback.jsx'
import Non_Member_ServiceCenter from './Non_Member_ServiceCenter.jsx'
import InsertionCar from './InsertionCar.jsx'
import VehicleInformation from './VehicleInformation.jsx'
import Total_Feedback_List from './Total_Feedback_List.jsx'
import Refundable_reservation from './Refundable_reservation.jsx'
import Total_reservation from './Total_reservation.jsx'

import history from './history';

class App extends React.Component {

    render(){
        let Main_Form = (
            <div>
                <Header />
                <div>
                    <main>
                        <Switch>
                            <Route exact path='/' component={Main}/>
                            <Route path='/signin' component={SignInForm} />
                            <Route path='/signup' component={SignUpForm} />
                            <Route path='/find_id' component={FindId} />
                            <Route path='/find_password' component={FindPwd} />
                            <Route path='/reservation_non_member' component={Non_Member_reservation} />
                            <Route path='/reservation_member' component={Reservation_history} />
                            <Route path='/search_rent' component={Rent_1} />
                            <Route path="/mypage" component={MyPage} />
                            <Route path="/member_service_center" component={Member_Service_Center} />
                            <Route path="/Member_feedback" component={Member_feedback} />
                            <Route path="/upload_notice" component={Upload_Notice} />
                            <Route path="/notice" component={Notice} />
                            <Route path="/update_notice" component={Update_Notice} />
                            <Route path="/non_member_feedback" component={Non_Member_feedback}/>
                            <Route path="/non_member_service_center" component={Non_Member_ServiceCenter} />
                            <Route path="/insert_car" component={InsertionCar} />
                            <Route path="/vehicle_impormation" component={VehicleInformation} />
                            <Route path="/feedback_list" component={Total_Feedback_List} />
                            <Route path="/refundable_reservation" component={Refundable_reservation} />
                            <Route path="/total_reservation" component={Total_reservation} />
                        </Switch>   
                    </main>
                </div>
            </div>
        )

        return Main_Form;
    }
}

// const App = () => {
//     let Main_Form = (
//         <div>
//             <Header />
//             {this.props.children}
//         </div>
//     )

//     return Main_Form;
// }

export default App;
