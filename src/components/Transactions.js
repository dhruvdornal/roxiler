import React, { useEffect, useState } from 'react'

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState(null);

    // Pagination state
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
    useEffect(()=>{
        const fetchTrans = async () =>{
            try{
                const response = await fetch('http://localhost:3001/api/transactions')
                if(!response.ok){
                    throw new Error("Network whiffed");
                }
                const data = await response.json();
                setTransactions(data.transactions);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }

        fetchTrans();
    }, []);

    

    if (loading) {
        return <div>Loading...</div>;
      }
    
      // Render error state
    if (error) {
      return <div>Error: {error}</div>;
    }

    const transactionItems = [];

    transactions.forEach((transaction) => {
      transactionItems.push(
          <div className="card" key={transaction.id}>
              <img className="card-img-top" src={transaction.image} alt="Card image cap" style={{ width: '150px', height: 'auto' }} />
              <div className="card-body">
                  <h5 className="card-title">{transaction.title}</h5>
                  <p className="card-text">{transaction.description}</p>
                  <h6>Price: ${transaction.price}</h6>
              </div>
          </div>
      );
  });

    // Calculate total pages and slice the transactions for the current page
    const totalPages = Math.ceil(transactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = transactions.toString().slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  return (

    <div>
      <h1>Transactions</h1>
        {/* {transactions.map((transaction) => (
              <div class="card" key={transaction.id}>
                    <img class="card-img-top" src={transaction.image} alt="Card image cap" style={{ width: '150px', height: 'auto' }}/>
                        <div class="card-body">
                            <h5 class="card-title">{transaction.title}</h5>
                            <p class="card-text">{transaction.description}</p>
                            <h6>Price: ${transaction.price}</h6>
                         </div>
                </div>
        ))} */}

        {transactionItems}

        

        {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
    
  )
}

export default Transactions