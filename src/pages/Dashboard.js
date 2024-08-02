import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { toast } from 'react-toastify';
import {addDoc, collection, getDocs, query } from 'firebase/firestore';
import {auth, db }from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

function Dashboard() {
  // const transactions = [
  //   {
  //     type: "income",
  //     amount: 1200,
  //     tag:"Salary",
  //     name:"income 1",
  //     date:"2024-05-20"
  //   },
  //   {
  //     type:"expense",
  //     amount:600,
  //     tag:"food",
  //     name:"expense 1",
  //     date:"2024-05-24"
  //   },
  // ];
  const [Transactions,setTransactions]=useState([]);
  const [loading,setLoading]=useState(false);
  const [user ]=useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income,setIncome]=useState(0);
  const [expense,setExpense]=useState(0);
  const[totalBalance,setTotalBalance]=useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type:type,
      date:moment(values.date).format("YYYY-MM--DD"),
      amount:parseFloat(values.amount),
      tag:values.tag,
      name:values.name,
    };
    addTransaction(newTransaction);
  };
  async function addTransaction(transaction){
    //add the doc
    try{
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:",docRef.id);
        toast.success("Transaction added");
    }catch(e){
      console.error("Error adding document:",e);
        toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
  //get all docs from a collection
fetchTransactions();
  }, [])
  useEffect(() => {
 cal_Balance()
  }, [transactions])
  
function cal_Balance(){

}

  async function fetchTransactions(){
    setLoading(true);
    if(user){
      const q = query(collection(db,`users/${user.id}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        //doc.data()is neveer underdefined for quey doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      
      toast.success("Transaction Fetched");
    }
    setLoading(false);
  }
  
  return (
    <div>
      <Header />
      {loading?(<p>loading...</p>):(<>
      <Cards showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      /></>)}
    </div>
  );
}

export default Dashboard;