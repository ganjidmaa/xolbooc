/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import {Outlet, useLocation} from 'react-router-dom'
import { ID } from '../../../../_metronic/helpers';
import { AccountHeader } from './AccountHeader';
import { useAccountDetail } from '../core/AccountDetailProvider';

const AccountProfileWrapper = () => {
    const {setItemIdForDetail} = useAccountDetail()
    const location: any = useLocation()
    const userIdProps: ID = location.state?.userId

    useEffect(() => {
        return () => {
            setItemIdForDetail(undefined)
        }
    }, [])

    useEffect(() => {
        userIdProps && setItemIdForDetail(userIdProps)
    }, [userIdProps])

    return (  
        <>
            <AccountHeader />
            <Outlet />
        </>    
    )
}

export {AccountProfileWrapper}