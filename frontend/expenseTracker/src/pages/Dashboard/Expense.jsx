import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/layouts/Modal'
import toast from 'react-hot-toast'
import DeleteAlert from '../../components/Income/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList'

const Expense = () => {
  useUserAuth();
  const  [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expenseData, setExpenseData] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const fetchExpenseDetails = async () => {
    if(loading) return;
    setLoading(true);
     try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_EXPENSE}`
      )
      if(response.data){
        setExpenseData(response.data);
      }
     }catch(error){
      console.log("Something went wrong please try again.", error);
     }finally{
      setLoading(false); 
     }
  }
  const handleAddExpense = async (expense) => {
  const { category, amount, date, icon } = expense;

  if (!category.trim()) {
    toast.error("category is required.");
    return;
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    toast.error("Amount should be a valid number greater than 0.");
    return;
  }
  if (!date) {
    toast.error("Date is required.");
    return;
  }
  try {
    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE , {
      category,
      amount,
      date,
      icon,
    });
    setOpenAddExpenseModel(false);
    toast.success("Expense added successfully");
      fetchExpenseDetails();
  } catch (error) {
    console.error(
      "Error adding expense:",
      error?.response?.data?.message || error.message
    );
    toast.error("Something went wrong while adding expense.");
  }
};


  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false, data:null})
      toast.success("Expense details deleted successfully")
      fetchExpenseDetails();
    }catch(error){
      console.error("error in deleting the Expense", error?.response?.data?.message || error.message);
    }
  }
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {responseType:"blob"})
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("error in downloading the Expense", error?.response?.data?.message || error.message);
      toast.error( "Failed to download expense details");
    }

  }

  useEffect(() => {
    fetchExpenseDetails()
    return () => {
    }
  }, [])
  
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={expenseData}
              onAddIncome={()=>setOpenAddExpenseModel(true)}
              label="Expense"
              content="Track your spending's and analyze your expenses"
            />
          </div>
          <ExpenseList
          transactions={expenseData}
          onDelete={(id)=> {setOpenDeleteAlert({show:true, data:id})}}
          onDownload={handleDownloadExpenseDetails}
          />
        </div>  
        <Modal isOpen={openAddExpenseModel}
        onClose={()=> setOpenAddExpenseModel(false)}
        title="Add Expense">
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false, data:null})}
        title="Delete Expense">
          <DeleteAlert
          content="Are you sure you want to delete the expense?"
          onDelete={()=>deleteExpense(openDeleteAlert.data)}/>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
export default Expense