import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import expenseData from "./expenseData";
import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";

function App() {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });
  const [expenses, setExpenses] = useLocalStorage("expenses", expenseData);
  const [editingRowId, setEditingRowId] = useState("");
  // const[localData,setLocalData] =useLocalStorage("myNum",[1,2,3])
  return (
    <>
      <Navbar></Navbar>

      <main>
        <h1>Track Your Expense</h1>

        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
          ></ExpenseForm>
          <ExpenseTable
            expenses={expenses}
            setExpenses={setExpenses}
            expense={expense}
            setExpense={setExpense}
            setEditingRowId={setEditingRowId}
          ></ExpenseTable>
        </div>
      </main>
    </>
  );
}

export default App;
