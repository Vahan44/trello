import { useSelector } from "react-redux"
import { RootState } from '../UserData/store';
import { FC, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Dashboard:FC = () => {
    const user = useSelector((state: RootState) => {
        return state.user.user
      })
      const navigate = useNavigate()
      useEffect(() => {
        user ? navigate('/MainPage') : navigate('/LogInPage')
      }, [])
      return (
        <h1>
            Dashboard
        </h1>
      )
}


export default Dashboard