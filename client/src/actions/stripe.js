import axios from 'axios';

export const createConnectAccount = async (token) =>
{
  return await axios.post(
    `${process.env.REACT_APP_API}/create`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const getAccountStatus = async(token) =>{
  return await axios.post(`${process.env.REACT_APP_API}/get-account-status`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
};

export const getAccountBalance = async(token) =>{
  return await axios.post(`${process.env.REACT_APP_API}/get-account-balance`,{},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
};

export const currencyFormatter = data =>{
  return (data.amount/100).toLocaleString(data.currency,{
     style: 'currency',
     currency: data.currency,
  });

}

export const payoutSetting = async(token)=> await axios.post(`${process.env.REACT_APP_API}/payout-setting`,{},
{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
)