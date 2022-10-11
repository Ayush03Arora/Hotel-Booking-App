import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {Card,Avatar,Badge} from 'antd';
import moment from 'moment';
import { getAccountBalance,currencyFormatter,payoutSetting } from "../actions/stripe";
import { useState } from "react";
import {toast} from 'react-toastify';
import {SettingOutlined} from '@ant-design/icons';

const {Meta} = Card;
const{Ribbon} = Badge;

const ConnectNav = () =>{
    
    const [loading,setLoading] = useState(false);
    const {auth} = useSelector((state) => ({...state}));
    const {user} = auth;
    const [balance,setBalance] = useState(0);

   useEffect(() =>{
   getAccountBalance(auth.token)
   .then(res =>{
    // console.log(res);
    setBalance(res.data);
   }

   )
   },[])

   const handlePayoutSettings = async() =>{
     setLoading(true);
     try{
      const res = await payoutSetting(auth.token);
      // console.log("res for payout settings ==>",res);
       window.open(res.data.url);
       setLoading(false);
    }
     catch(err)
     {
      console.log(err);
      setLoading(false);
      toast.error("Unable to access settings,try again");
     }
   }

    return (
    <div className ="d-flex justify-content-around">
     <Card>
     <Meta 
     avatar={<Avatar>{user.name[0]}</Avatar>} 
     title ={user.name}
     description={`Joined ${moment(user.createdAt).fromNow()}`}
      />
     </Card>
     {
        auth && auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled &&
        (
          <>
            <Ribbon text="Available" color="grey">
              <Card className="bg-light pt-1">
                {balance && balance.pending && 
                balance.pending.map((bp,i) =>(
                  <span key={i} className="lead">
                    {currencyFormatter(bp)}
                  </span>
                ))
                }
              </Card>
            </Ribbon>
            
            <Ribbon text="Payouts" color="silver"> 
            <Card onClick={handlePayoutSettings}  className='bg-light pointer'>
            <SettingOutlined className="h5 pt-2"/>
            </Card>
             </Ribbon>
          </>  
        )
     }
    </div>
    );
};

export default ConnectNav;