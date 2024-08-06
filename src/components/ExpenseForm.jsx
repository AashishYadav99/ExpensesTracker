import { useState } from "react";
import InputField from "./InputField";
import Select from "./Select";
function ExpenseForm({
  expense,
  setExpense,
  setExpenses,
  editingRowId,
  setEditingRowId,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
    setError({});
  };
  const [error, setError] = useState({});
  const validateConfig = {
    title: [
      { required: true, message: "Please fill the title" },
      // { minLength: 2, message: "Title should be atleast 3 character long" },
    ],
    category: [{ required: true, message: "Please select the category" }],
    amount: [{ required: true, message: "Please fill the amount" }],
  };

  const validate = (formData) => {
    const errorData = {};
    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].forEach((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message;
        }
        if (rule.minLength && value.length) {
          errorData[key] = rule.message;
        }
      });
    });

    setError(errorData);
    return errorData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }

    if (Object.keys(validateResult).length) return; //then go ahead else not

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };
  return (
    <>
      <form className="expense-form" onSubmit={handleSubmit}>
        <InputField
          id={"title"}
          label={"Title"}
          name={"title"}
          value={expense.title}
          onChange={handleChange}
          error={error.title}
        ></InputField>

        <Select
          id={"category"}
          label={"Category"}
          name={"category"}
          value={expense.category}
          onChange={handleChange}
          option={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
          defaultCategory="Select category"
          error={error.category}
        ></Select>

        <InputField
          id={"amount"}
          label={"Amount"}
          name={"amount"}
          value={expense.amount}
          onChange={handleChange}
          error={error.amount}
          type="number"
        ></InputField>
        <button className="add-btn btn btn-primary">{editingRowId ? "Save" : "Add"}</button>
      </form>
    </>
  );
}

export default ExpenseForm;
