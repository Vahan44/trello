import React, { FC, useEffect } from 'react';
import { render } from "react-dom";
import { BrowserRouter, Route, Routes, RedirectFunction, useNavigate } from 'react-router-dom'
import MainPage from '../pages/MainPage/ui/MainPage';
import styles from './App.module.css';
import Header from '../Header/ui/Header';
import LogInPage from '../pages/LogInPage/ui';
import Dashboard from './Dashboaard';
//import { setUser, setWorkspaces } from '../UserData/UserSlice';
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '../../src/firebase'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/store';
import SignUp from '../pages/SignUp/ui/SignUp';
import Workspaces from '../pages/Workspaces/ui/Workspaces';
import Board from '../pages/Board/ui/Board';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { autoLogIn } from '../Redux/userSlice';

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(autoLogIn())
  }, [])


  const user = useSelector((state: RootState) => {
    return state.user
  })




 



  return (
    <BrowserRouter>
      <Header />

      <div className={styles.App} id='app'>
        <Routes >

          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<h1 >Not Foung</h1>} />
          {user.profile ? <>

            <Route path='/MainPage' element={<MainPage />} />
            <Route path='/Workspaces' element={<Workspaces />} />
            <Route path='/board/:id' element={<Board />} />

          </> : <>
            <Route path='/LogInPage' element={<LogInPage />} />
            <Route path='/SignUpPage' element={<SignUp />} />
          </>
          }


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
