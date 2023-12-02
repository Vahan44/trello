import { useSelector } from "react-redux"
import { RootState } from '../Redux/store';
import { FC, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Dashboard:FC = () => {
    const user = useSelector((state: RootState) => {
        
        return state.user
      })

    


    // console.log(workspaces)
      const navigate = useNavigate()
      useEffect(() => {
        user.profile ? navigate('/MainPage') : navigate('/LogInPage')
      }, [])
      return (
        <h1 style={{color: 'white'}}>
            Loading ...
        </h1>
      )
}


export default Dashboard