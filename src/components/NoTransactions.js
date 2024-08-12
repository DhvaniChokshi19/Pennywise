import React from "react";
import transactions from '../assets/transactions.svg';
import './Notrans.css';
function NoTransactions(){
    return(
        <div className="Notransaction">
            <img src={transactions} className="notranimg"></img>
            <p>You Have No Transactions Currently.</p>
        </div>
    )
}
export default NoTransactions;