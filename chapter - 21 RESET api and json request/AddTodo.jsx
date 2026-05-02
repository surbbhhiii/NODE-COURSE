import { useState } from "react";

function AddTodo({ onNewItem }) {
  // 1. State initialization with empty strings
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 2. Handlers for input changes
  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  // 3. Logic for Add button
  const handleAddButtonClicked = () => {
    if (todoName.trim() !== "" && dueDate !== "") {
      onNewItem(todoName, dueDate); // Data ko parent (App.jsx) tak bhej raha hai
      setTodoName(""); // Input clear karne ke liye
      setDueDate("");  // Date clear karne ke liye
    } else {
      alert("Please enter both Todo Name and Date!");
    }
  };

  // 4. The UI (Return statement)
  return (
    <div className="container mx-auto mb-8 px-4">
      <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
        
        {/* Name Input */}
        <div className="w-full md:flex-1">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={todoName}
            onChange={handleNameChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Date Input */}
        <div className="w-full md:w-48">
          <input
            type="date"
            value={dueDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Add Button */}
        <div className="w-full md:w-auto">
          <button
            type="button"
            onClick={handleAddButtonClicked}
            className="w-full md:w-auto px-8 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddTodo;