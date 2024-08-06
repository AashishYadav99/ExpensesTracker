function ContextMenu({
  menuPosition,
  setMenuPosition,
  expenses,
  setExpenses,
  rowId,
  setExpense,
  setEditingRowId,
}) {
  if (!menuPosition.left) return;
  return (
    <>
      <div className="context-menu" style={{ ...menuPosition }}>
        <div
          onClick={() => {
            const { title, category, amount } = expenses.find(
              (element) => element.id === rowId
            );
            setEditingRowId(rowId);
            setExpense({ title, category, amount });
            setMenuPosition({});
          }}
        >
          Edit
        </div>
        <div
          onClick={(e) => {
            setExpenses((prevExpense) =>
              prevExpense.filter((expense) => expense.id !== rowId)
            );
            setMenuPosition({});
          }}
        >
          Delete
        </div>
      </div>
    </>
  );
}

export default ContextMenu;
