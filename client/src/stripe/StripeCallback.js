import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAccountStatus } from '../actions/stripe';
import { UpdateUser } from '../actions/auth';
const StripeCallback = ({ history }) => {
    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const AccountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token);
            //  console.log("User account status on stripe callback",res); 
            UpdateUser(res.data, () => {
                // update user in redux 
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                });

                // redirect user to dashboard
                     window.location.href = 'dashboard/seller';
            })
        }
        catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (auth && auth.token)
            AccountStatus()

    }, [auth])


    return <div className='d-flex justify-content-center p-5'>
        <LoadingOutlined className='display-1 p-5 text-danger' />
    </div>
}

export default StripeCallback;