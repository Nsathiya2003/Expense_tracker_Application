
// import profile from '../assets/expense1.jpg';

import Cards from "../component/dashboard-cards";
import IncomeExpenseChart from "../component/dashboard-chart-bar";
import SpendHistory from "../component/spend-history";
import WelcomeProfileComponent from "../component/welcome-profile";

export default function Dashboard(){
    return(
        <>
        <div className="flex justify-start ">
            <div> 
                <WelcomeProfileComponent/>
                <Cards/>
                <div className="flex flex-row">
                    <IncomeExpenseChart/>
                    <SpendHistory/> 
                </div>
             
            </div>
        </div>
        </>
    )
}