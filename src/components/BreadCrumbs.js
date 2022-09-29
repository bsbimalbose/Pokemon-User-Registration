import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export default function BreadCrumbs() {
  let currentPath = useLocation().pathname;
  const userState = useSelector((state) => state.user);

  const getIcon = (type, currentPath, userState) => {
    const {
      isPersonalInfoDone,
      isPersonalInfoSaved,
      isFavPokeDone,
      favoritePoke,
    } = userState;
    switch (type) {
      case 'personal': {
        if (isPersonalInfoDone) return '✅';
        if (isPersonalInfoSaved) return '🟡';
        if (currentPath === '/') return '🟢';
        return '⚪';
      }
      case 'poke': {
        if (favoritePoke.name) return '✅';
        if (currentPath === '/pokedex') return '🟢';
        return '⚪';
      }
      case 'review': {
        break;
      }
      default: {
        break;
      }
    }
  };
  const isFavPokeDone = userState.isFavPokeDone;
  return (
    <div className='breadcrumbs-wrapper'>
      <Link className={`step ${currentPath === '/' ? 'selected' : ''}`} to='/'>
        {getIcon('personal', currentPath, userState)} Personal Details
      </Link>
      <Link
        className={`step ${currentPath === '/pokedex' ? 'selected' : ''}`}
        to='/pokedex'
      >
        {getIcon('poke', currentPath, userState)} Poke Selection
      </Link>
      <Link
        className={`step ${currentPath === '/review' ? 'selected' : ''}`}
        to='/review'
      >
        ⚪ Review
      </Link>
    </div>
  );
}
