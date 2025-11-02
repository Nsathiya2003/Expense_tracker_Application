
// import profile from '../assets/expense1.jpg';

import Cards from "../component/dashboard-cards";
import WelcomeProfileComponent from "../component/welcome-profile";

export default function Dashboard(){
    return(
        <>
        <div className="flex justify-start ">
            <div> 
                <WelcomeProfileComponent/>
                <Cards/>
            </div>
        </div>
        </>
    )
}