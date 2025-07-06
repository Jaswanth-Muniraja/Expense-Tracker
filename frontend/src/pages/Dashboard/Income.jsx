import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/layouts/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/Income/DeleteAlert'

const Income = () => {
  const  [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const fetchIncomeDetails = async () => {
    if(loading) return;
    setLoading(true);
     try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_INCOME}`
      )
      if(response.data){
        setIncomeData(response.data);
      }
     }catch(error){
      console.log("Something went wrong please try again.", error);
     }finally{
      setLoading(false); 
     }
  }
  const handleAddIncome = async (income) => {
  const { source, amount, date, icon } = income;

  if (!source.trim()) {
    toast.error("Source is required.");
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
    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
      source,
      amount,
      date,
      icon,
    });
    setOpenAddIncomeModel(false);
    toast.success("Income added successfully");
      fetchIncomeDetails();
  } catch (error) {
    console.error(
      "Error adding income:",
      error?.response?.data?.message || error.message
    );
    toast.error("Something went wrong while adding income.");
  }
};


  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show:false, data:null})
      toast.success("Income details deleted successfully")
      fetchIncomeDetails();
    }catch(error){
      console.error("error in deleting the income", error?.response?.data?.message || error.message);
    }
  }
  const handleDownloadIncomeDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {responseType:"blob"})
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link);
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("error in downloading the Income", error?.response?.data?.message || error.message);
      toast.error( "Failed to download income details");
    }
  }

  useEffect(() => {
    fetchIncomeDetails()
    return () => {
    }
  }, [])
  
  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModel(true)}
              label="Income"
              content="Track your earnings and analyze your income"
            />
          </div>
          <IncomeList
          transactions={incomeData}
          onDelete={(id)=> {setOpenDeleteAlert({show:true, data:id})}}
          onDownload={handleDownloadIncomeDetails}

          />
        </div>  
        <Modal isOpen={openAddIncomeModel}
        onClose={()=> setOpenAddIncomeModel(false)}
        title="Add Income">
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false, data:null})}
        title="Delete Income">
          <DeleteAlert
          content="Are you sure you want to delete the income?"
          onDelete={()=>deleteIncome(openDeleteAlert.data)}/>
        </Modal>
      </div>
    </DashboardLayout>
  )
}
export default Income