import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'

class Main extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let main_Form = (
            // <div>
            //     <table className="main_out_table">
            //         <tbody>
            //             <tr>
            //                 <td colSpan={2}>
            //                     <img src="../../public/upload_image/main.jpg" width="800" />
            //                 </td>
            //                 <td align="right"> <Login /> </td>
            //             </tr>
            //         </tbody>
            //     </table>
            // </div>
            <div className="main_image">
                <img src="../../public/upload_image/main.jpg" width="100%" />
                <Login className="main_image_login" />
            </div>
        )

        return main_Form;
    }
}

export default Main;