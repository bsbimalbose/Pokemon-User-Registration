import { TextField } from '@mui/material';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { updatePersonalInfo, setPersonalInfoDone } from '../redux/user';
import { useForm } from 'react-hook-form';
import Footer from './Footer';

export default function UserDetails() {
  const personalInfo = useSelector((state) => state.user.personalInfo);
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formInput, setFormInput] = useState({});

  const handleDraftChanges = (type, value) => {
    setFormInput({
      ...formInput,
      [type]: value,
    });
  };

  const handleSaveNSkip = () => {
    dispatch(updatePersonalInfo({ ...personalInfo, ...formInput }));
    navigate('/pokedex');
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updatePersonalInfo({ ...personalInfo, ...formInput }));
    dispatch(setPersonalInfoDone());
    navigate('/pokedex');
  };

  return (
    <div>
      <div>Personal Information</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            className='text-field'
            label='First Name'
            variant='outlined'
            autoFocus
            {...register('firstName', {
              required: 'First Name is required',
            })}
            error={!!errors?.firstName}
            helperText={errors?.firstName ? errors?.firstName?.message : null}
            defaultValue={personalInfo.firstName}
            onChange={(e) => handleDraftChanges('firstName', e.target.value)}
          />
          <TextField
            className='text-field'
            label='Last Name'
            variant='outlined'
            {...register('lastName', { required: 'Last Name is required' })}
            error={!!errors?.lastName}
            helperText={errors?.lastName ? errors?.lastName?.message : null}
            defaultValue={personalInfo.lastName}
            onChange={(e) => handleDraftChanges('lastName', e.target.value)}
          />
          <TextField
            className='text-field'
            label='Phone Number'
            variant='outlined'
            t
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: 'Phone number must contain 10 digits',
              },
            })}
            error={!!errors?.phoneNumber}
            type='number'
            helperText={
              errors?.phoneNumber ? errors?.phoneNumber?.message : null
            }
            defaultValue={personalInfo.phoneNumber}
            onChange={(e) => {
              handleDraftChanges('phoneNumber', e.target.value);
            }}
          />
          <TextField
            className='text-field'
            label='Email'
            variant='outlined'
            {...register('email', {
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                message: 'invalid Email',
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors?.email?.message : null}
            defaultValue={personalInfo.email}
            onChange={(e) => handleDraftChanges('email', e.target.value)}
          />
          <TextField
            className='text-field'
            label='Address'
            variant='outlined'
            multiline
            rows={4}
            {...register('address', {
              required: 'Address is required',
            })}
            error={!!errors?.address}
            helperText={errors?.address ? errors?.address?.message : null}
            defaultValue={personalInfo.address}
            onChange={(e) => handleDraftChanges('address', e.target.value)}
          />
        </div>
        <Footer handleSaveNSkip={handleSaveNSkip} />
      </form>
    </div>
  );
}
