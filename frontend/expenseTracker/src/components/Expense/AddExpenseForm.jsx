import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handelChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-lg pt-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 mt-8">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => handelChange('icon', selectedIcon)}
        />
      </div>

      {/* Form Fields */}
      <div className="space-y-5 mt-1">
        <Input
          value={expense.source}
          onChange={({ target }) => handelChange('category', target.value)}
          label="Expense category"
          placeholder="Food, Rent, ... etc"
          type="text"
        />
        <Input
          value={expense.amount}
          onChange={({ target }) => handelChange('amount', target.value)}
          label="Amount"
          placeholder="Enter Amount"
          type="number"
        />
        <Input
          value={expense.date}
          onChange={({ target }) => handelChange('date', target.value)}
          label="Date"
          placeholder=""
          type="date"
        />
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => onAddExpense(expense)}
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition duration-300"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;
