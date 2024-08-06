import { useState } from "react";
import { useFilter } from "../hooks/useFilter.js";
import ContextMenu from "./ContextMenu.jsx";

function ExpenseTable({expense, setExpense, expenses, setExpenses, setEditingRowId }) {
  const [menuPosition, setMenuPosition] = useState({});
  const [rowId, setRowId] = useState("");
  const [sortCallback,setSortCallback]=useState(()=>()=>{})
  const [filterData, setQuery] = useFilter(expenses, (data) => data.category);

  const total = filterData.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.amount),
    0
  );
 

  return (
    <>
      <ContextMenu
        menuPosition={menuPosition}
        setMenuPosition={setMenuPosition}
        setExpenses={setExpenses}
        expenses={expenses}
        rowId={rowId}
        setExpense={setExpense}
        setEditingRowId={setEditingRowId}
      ></ContextMenu>
      <table className="expense-table" onClick={()=>{
        if(menuPosition.left){
          setMenuPosition({})
        }
      }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <select onChange={(e) => setQuery(e.target.value.toLowerCase())}>
                <option value="">All</option>
                <option value="grocery">Grocery</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
            <div>
                <span>Amount</span>
                <svg
                  onClick={()=>{setSortCallback(()=> (a,b)=>a.amount-b.amount)}}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  onClick={()=>{setSortCallback(()=> (a,b)=>b.amount-a.amount)}}
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.sort(sortCallback).map(({ id, title, category, amount }) => (
            <tr
              key={id}
              onContextMenu={(e) => {
                e.preventDefault();
                setMenuPosition({ left: e.clientX + 4, top: e.clientY + 4 });
                setRowId(id);
              }}
            >
              <td>{title}</td>
              <td>{category}</td>
              <td>{amount}</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <th><button type="button" class="btn btn-outline-secondary clear-sort" onClick={()=>setSortCallback(()=> ()=>{})}>Clear Sort</button></th>
            

            {/* <th className="clear-sort" onClick={()=>setSortCallback(()=> ()=>{})}>Clear Sort</th> */}
            <th>₹{total}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExpenseTable;
