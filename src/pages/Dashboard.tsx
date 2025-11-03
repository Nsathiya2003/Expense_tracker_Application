
// import profile from '../assets/expense1.jpg';

import Cards from "../component/dashboard-cards";
import IncomeExpenseChart from "../component/dashboard-chart-bar";
import WelcomeProfileComponent from "../component/welcome-profile";

export default function Dashboard(){
    return(
        <>
        <div className="flex justify-start ">
            <div> 
                <WelcomeProfileComponent/>
                <Cards/>
                <IncomeExpenseChart/>
            </div>
        </div>
        </>
    )
}