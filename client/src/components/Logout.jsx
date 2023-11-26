import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
import Cookies from 'js-cookie'

const Logout = () => {
    const { setUserCookie } = useContext(UserContext);
    
    setUserCookie({});
    
    Cookies.remove('auth');
    return  <Navigate to='/' replace={true} />;
}

export default Logout