
import React, { useState } from 'react'
import { Radio, Select, Table } from 'antd';
import searchimg from '../../assets/search.svg';
import './styles.css';
// import { Option } from 'antd/es/mentions';
function TransactionsTable({transactions}) {
     const {Option}= Select;
     
    const [search,setSearch]=useState("");
    const [typeFilter,setTypeFilter]=useState("");
    const [sortKey,setSortKey] = useState("");
const columns=[
    {
        title:"Name",
        dataIndex:'name',
        key:'name',
    },
    {
        title: 'Amount',
        dataIndex:'amount',
        key:'amount',
    },
    {
        title:'Tag',
        dataIndex:'tag',
        key:'tag',
    },
    {
        title:'Type',
        dataIndex:'type',
        key:'type',
    },
    {
        title:'Date',
        dataIndex:'date',
        key:'date',
    },
];
let filteredTransactions = transactions.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())&&item.type.includes(typeFilter));
let sortedTransactions=filteredTransactions.sort((a,b)=>{
    if(sortKey==='date'){
        return new Date(a.date)-new Date(b.date);
    }else if(sortKey==="amount"){
        return a.amount -b.amount;
    }else{
        return 0;
    }
});

return (
<>
<div className='table'>
<div className="input-flex">
    <img src={searchimg}width="16">
    </img>
   <input 
value={search} 
onChange={(e)=>setSearch(e.target.value ) }
placeholder='Search by name'></input>
</div>

<Select className='select-input'
onChange={(value)=> setTypeFilter(value|| "")}
value={typeFilter}
placeholder="Filter"
allowClear>
    <Option value="">All</Option>
<Option value="income">Income</Option>
<Option value="expense">Expense</Option>
</Select>
</div>
<div className='table-button'>
    <h2>My Transactions </h2>
<Radio.Group className="input-radio"
onChange={(e)=> setSortKey(e.target.value)}
value={sortKey}>
    <Radio.Button value="">No sort</Radio.Button>
    <Radio.Button value="date">Sort by Date</Radio.Button>
    <Radio.Button value="amount">Sort by Amount</Radio.Button>
</Radio.Group>
</div>
<Table dataSource={sortedTransactions} columns={columns} />
</>

)
}

export default TransactionsTable;