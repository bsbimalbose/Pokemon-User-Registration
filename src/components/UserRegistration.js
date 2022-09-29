import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { flashSavedUserState } from '../redux/user';
import BreadCrumbs from './BreadCrumbs';
import Footer from './Footer';
import './UserRegistration';

export default function UserRegistration() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className='user-registration-wrapper'>
      <div className='header'>User Registration</div>
      <BreadCrumbs />
      <Outlet />
    </div>
  );
}
