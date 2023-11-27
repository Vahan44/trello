import React, {FC, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AboutPage from "../pages/AboutPage/ui"
import MainPage from '../pages/MainPage/ui/MainPage';
import styles from'./App.module.css';
import Header from '../Header/ui/Header';
import LogInPage from '../pages/LogInPage/ui';
import { setUser, setWorkspaces } from '../UserData/UserData';
import {onAuthStateChanged, signOut, User} from 'firebase/auth'
import { auth } from '../../src/firebase'
import { useSelector, useDispatch } from 'react-redux'; 
import { RootState } from '../UserData/store';
import SignUp from '../pages/SignUp/ui/SignUp';
import Workspaces from '../pages/Workspaces/ui/Workspaces';
import Board from '../pages/Board/ui/Board';
const App: FC=() => {

  
  const user = useSelector((state: RootState) => {
    return state.user.user
  })



  const dispatch = useDispatch()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
  
      dispatch(setUser(currentUser))
      console.log(user);


    })

    return unsubscribe;
  }, [])


   const workspaces = {
    workspace1: {
      name:user?.displayName,
      img: user?.photoURL,
      boards: {
        'ACAfinalproject': {
          'To do': [
            'add some themes',
            'add mail/password sign up method'
          ],
          'Doing': [
            'add coent slice'
          ],
          'Done': [
            'sign in clice ',
            'main page slice',
            'redax tools'
          ]
        },
        'ACA final proje': {
          'To do': [
            'add some themes',
            'add mail/password sign up method'
          ],
          'Doing': [
            'add coent slice'
          ],
          'Done': [
            'sign in clice ',
            'main page slice',
            'redax tools'
          ]
        }
,
'ACA final projet': {
  'To do': [
    'add some themes',
    'add mail/password sign up method'
  ],
  'Doing': [
    'add coent slice'
  ],
  'Done': [
    'sign in clice ',
    'main page slice',
    'redax tools'
  ]
}      }
    }
   }

   dispatch(setWorkspaces(workspaces))


  const handleSingOut = () => {
    signOut(auth).catch(error => console.log(error))
  }




  return (
    <BrowserRouter>
          <Header handleSingOut = {handleSingOut}/>

    <div className={styles.App} id = 'app'>
        <Routes>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/' element={user ? <MainPage /> : <LogInPage/>} />
        <Route path='/LogInPage' element={<LogInPage />} />
        <Route path='/SignUpPage' element={<SignUp />} />
        <Route path='/Workspaces' element={<Workspaces/>}/>
        {Object.entries(workspaces).reduce((routes, [workspaceName, {name: nm, img, boards}]) => {
          let element = []
          interface Board {
            'To do': string[];
            'Doing': string[];
            'Done': string[];
          }
          for (let i in boards){
            element.push(<Route path={"/"+i.replace(/\s/g, '')+'Board'} element={<Board board = {i} />}/>)
          }
          return (
            <>
            {element}
            
            </>
          )
        }, <></>)}
        
        
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
