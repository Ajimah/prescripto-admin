import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const Payment = () => {
  const { getAllTransaction } = useContext(AdminContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransaction(); 
        console.log(data)
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [getAllTransaction]);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Payments</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {transactions.map((transaction, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {transaction.name}
              </p>
              <p className="text-zinc-600 text-sm">{transaction.reference}</p>
              <p className="text-zinc-600 text-sm">{transaction.status}</p>
              <p className="text-zinc-600 text-sm">{transaction.amount} USD</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
