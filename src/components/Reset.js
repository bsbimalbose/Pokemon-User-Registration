import React from 'react';
import { useDispatch } from 'react-redux';
import { flushUserDetails } from '../redux/user';

export default function Reset() {
  const dispatch = useDispatch();

  return (
    <div className='user-registration-wrapper pd-40'>
      <h3>User details successfully submitted to a placeholder dummy api.</h3>

      <p>
        As part of testing, you can reset the app and try to submit new details
        again.
      </p>
      <div>
        <button
          type='button'
          className='button'
          onClick={() => {
            // flush redux store and JS redirect only for testing purpose
            localStorage.clear();
            dispatch(flushUserDetails());
            window.location.pathname = '/';
          }}
        >
          Reset App
        </button>
      </div>
    </div>
  );
}
