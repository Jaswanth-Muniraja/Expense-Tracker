import moment from 'moment';

export const validateEmail = (email) => {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexp.test(email)
}

export const getInitials = (FullName) => {
    if(!FullName) return "";
    const words = FullName.split(" ");
    let initials ="";
    for(let i=0; i<Math.min(words.length,2); i++){
        initials+=words[i][0]
    }
    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return num;
  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
    const chartData= data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }))
    return chartData;
}


export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date)); 

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'), 
    amount: item?.amount,
    source: item?.source,
  }));

  console.log("Chart Data Prepared:", chartData); 
  return chartData;
};