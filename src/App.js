import './App.scss';
import UserRegistration from './components/UserRegistration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Review from './components/Review';
import UserDetails from './components/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { flashSavedUserState } from './redux/user';
import PokeDex from './components/PokeDex';
import { useEffect, useState } from 'react';
import { flashNewPokeDataMap, initializePokeIdMap } from './redux/pokemon';
import Reset from './components/Reset';

function App() {
  const formSubmitted = useSelector((state) => state.user?.formSubmitted);
  const userState = useSelector((state) => state.user);
  const pokeIdMapList = useSelector((state) => state.pokemon.pokeIdMap);
  const [loadAfterFlash, setLoadAfterFlash] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loadAfterFlash === true) {
      setTimeout(() => setLoadAfterFlash(false), 1000);
    }
  }, [loadAfterFlash]);

  useEffect(() => {
    // flash Saved state if there is a refresh
    if (
      userState.personalInfo.firstName === undefined &&
      localStorage.getItem('userRegistrationState')
    ) {
      dispatch(
        flashSavedUserState(
          JSON.parse(localStorage.getItem('userRegistrationState'))
        )
      );
      setLoadAfterFlash(true);
    }

    if (pokeIdMapList.length === 0) {
      const savedPokeIdMap = localStorage.getItem('pokeIdMap');

      if (savedPokeIdMap) {
        dispatch(initializePokeIdMap(JSON.parse(savedPokeIdMap)));
        setLoadAfterFlash(true);
        const pokeDataMap = localStorage.getItem('pokeDataMap');
        if (savedPokeIdMap) {
          dispatch(flashNewPokeDataMap(JSON.parse(pokeDataMap)));
          setLoadAfterFlash(true);
        }
      }
    }
  }, []);

  return (
    <div className='app-wrap'>
      {formSubmitted ? (
        <Reset />
      ) : loadAfterFlash ? (
        <div>restoring data ...</div>
      ) : (
        <Router>
          <Routes>
            <Route path='/' element={<UserRegistration />}>
              <Route index element={<UserDetails />} />
              <Route path='/pokedex' element={<PokeDex />} />
              <Route path='/review' element={<Review />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
