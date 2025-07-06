import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard} from 'react-icons/io'
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if(response.data){
        setDashboardData(response.data);
      }
    } catch(error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="w-full p-4">Loading...</div>;

  return (
    <DashboardLayout activeMenu="Dashboard">
  <div className='w-full p-4'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
      <InfoCard 
        icon={<IoMdCard className="text-white w-6 h-6"/>}
        label="Total Balance"
        value={dashboardData ? addThousandsSeparator(dashboardData.totalBalance) : 'Loading...'}
        color="bg-primary"
      />
      <InfoCard 
        icon={<LuWalletMinimal className="text-white w-6 h-6"/>}
        label="Total Income"
        value={dashboardData ? addThousandsSeparator(dashboardData.totalIncome) : 'Loading...'}
        color="bg-green-500"
      />
      <InfoCard 
        icon={<LuHandCoins className="text-white w-6 h-6"/>}
        label="Total Expenses"
        value={dashboardData ? addThousandsSeparator(dashboardData.totalExpense || dashboardData.totalExpenses) : 'Loading...'}
        color="bg-red-500"
      />
    </div>
    <div className='grid grid-cols-1 gap-6 mt-6'>
      <FinanceOverview 
        totalBalance={dashboardData?.totalBalance || 0} 
        totalIncome={dashboardData?.totalIncome || 0}
        totalExpense={dashboardData?.totalExpense || 0}
      />
      <RecentTransactions
      transactions = {dashboardData?.recentTransactions}
      onSeeMore={()=> navigate("/expense")}
      />
      {/* <Last30DaysExpenses
       data = {dashboardData?.last30DaysExpenses.transactions || {}}
      /> */}
    </div>
  </div>
</DashboardLayout>
  )
}

export default Home