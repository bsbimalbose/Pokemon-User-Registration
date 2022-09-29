import React from 'react';
import { Outlet } from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';
import './UserRegistration';

export default function UserRegistration() {
  return (
    <div className='user-registration-wrapper'>
      <div className='header'>Pokemon Master Registration</div>
      <BreadCrumbs />
      <Outlet />
    </div>
  );
}
