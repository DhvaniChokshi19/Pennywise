import React from 'react'
import './styles.css';
import { Card, Row } from 'antd';
import Button from '../Button';
function Cards({income,expense,totalBalance,showExpenseModal,showIncomeModal}) {
  return (
    <div>
        <Row className='my-row'>
            <Card className="my-card" bordered={true}>
            <h2>Current Balance</h2>
                <p> Rs.{totalBalance}</p>
                <Button text = "Reset Balance" blue={true}></Button>
            </Card>
            <Card className="my-card" bordered={true}>
                <h2>Total Income</h2>
                <p> Rs.{income}</p>
                <Button text = "Add Income" blue={true}onClick={showIncomeModal}></Button>
            </Card>
            <Card className="my-card">
                <h2>Total Expenses</h2>
                <p> Rs.{expense}</p>
                <Button text = "Add Expense" blue={true} onClick={showExpenseModal}></Button>
            </Card>
        </Row>
    </div>
  )
}

export default Cards;