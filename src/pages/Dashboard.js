import React, { useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
// import { Modal } from 'antd';

import AddExpenseModal from '../components/Modals/addExpense.js';
import AddIncomeModal from '../components/Modals/addIncome.js';

function Dashboard(){
  const [isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible]=useState(false);
  const showExpenseModal=()=>{
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal=()=>{
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel=()=>{
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel=()=>{
    setIsIncomeModalVisible(false);
  };

  const onFinish=(values,type)=>{
    console.log("onFinish",values,type);
  }
  return (
    <div><Header></Header>
    <Cards>
      showExpenseModal={showExpenseModal}
      showIncomeModal={showIncomeModal}
    </Cards>
   <AddExpenseModal
   isExpenseModalVisible={isExpenseModalVisible}
   handleExpenseCancel={handleExpenseCancel}
   onFinish={onFinish}></AddExpenseModal>
    
    <AddIncomeModal
    isIncomeModalVisible={isIncomeModalVisible}
    handleIncomeCancel={handleIncomeCancel}
    onFinish={onFinish}></AddIncomeModal>
    </div>
  )
}

export default Dashboard