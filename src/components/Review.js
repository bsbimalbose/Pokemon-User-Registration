import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postUserDetails } from '../services/api';
import PokeSelected from './PokeSelected';

export default function Review() {
  const isPersonalInfoDone = useSelector(
    (state) => state.user.isPersonalInfoDone
  );
  const personalInfo = useSelector((state) => state.user.personalInfo);
  const favoritePoke = useSelector((state) => state.user.favoritePoke);

  const submitDetails = () => {
    const { firstName, lastName, phoneNumber, address, email } = personalInfo;
    const payload = {
      firstName,
      lastName,
      phoneNumber,
      address,
      email,
      favoritePokemon: favoritePoke.name,
    };
    postUserDetails(payload).then((res) => {
      alert('details submitted');
    });
  };

  return (
    <div className='pd-20'>
      <div>
        <div className='review-head'>
          <h3>Personal Information</h3>
          <Link to='/'>Edit</Link>
        </div>
        <div className='pd-20'>
          <div>
            <strong>First Name: </strong>
            {personalInfo.firstName}
          </div>
          <div>
            <strong>Last Name: </strong>
            {personalInfo.lastName}
          </div>
          <div>
            <strong>Phone Number: </strong>
            {personalInfo.phoneNumber}
          </div>
          <div>
            <strong>Address: </strong>
            {personalInfo.address}
          </div>
          <div>
            <strong>Email: </strong>
            {personalInfo.email}
          </div>
        </div>
      </div>
      <div>
        <div className='review-head'>
          <h3>Favorite Pokemon</h3>
          <Link to='/poke'>Edit</Link>
        </div>
        {favoritePoke.name ? (
          <PokeSelected poke={favoritePoke} />
        ) : (
          'No Pokemon selected'
        )}
      </div>
      {isPersonalInfoDone && favoritePoke.name ? (
        <div style={{ textAlign: 'right' }}>
          <button type='submit' class='button'>
            Submit
          </button>
        </div>
      ) : (
        <div>
          Please enter and save all mandatory fields, and select your favorite
          pokemon to be able to register.
        </div>
      )}
    </div>
  );
}
