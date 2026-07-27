import { useContext, useState } from 'react';
import { useToast } from '../context/ToastContext';
import Home from './Home.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider.jsx';

export default function Account() {
  const [mode, setMode] = useState('login');
  const { showToast } = useToast();
  const[errors,setErrors]=useState({})
  const[error,setError]=useState('')
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const {isLoggedIn,setIsLoggedIn}=useContext(AuthContext)

  const [email, setemail]=useState('')
  const [password, setpassword]=useState('')
  const [username, setusername]=useState('')


  async function handleSubmit(event){
    event.preventDefault();
    showToast(
      mode === 'login' ? "Login Successfully" : 'Sign up Successfully'
    );
    setLoading(true)
    
    
    if (mode==='login'){
      const userdata={
      username,password
    }
      try{
        const response=await axios.post('http://127.0.0.1:8000/api/v1/token/',userdata)
        // console.log(response.data)
        localStorage.setItem('accessToken',response.data.access)
        localStorage.setItem('refreshToken',response.data.refresh)
        console.log('login success')
        setIsLoggedIn(true)
        navigate('/')
        setError('')
      }
      catch(error){
        console.log("invalid credentials...")
        if(error.response?.data){
        setError(error.response.data)
      }
      }
    }
    if (mode === 'signup'){
      const userdata={
      username,email,password
    }
    try{
      const response=await axios.post('http://127.0.0.1:8000/api/v1/registered/',userdata)
      console.log(response.data)
      navigate('/')
      setErrors({})
    }
    catch(error){
      console.error("error =>",error.response.data)
      if(error.response?.data){
        setErrors(error.response.data)
      }
    }finally{
      setLoading(false)
    }
  }
  }
  return (
    <section className="account-page">
      <div className="container account-card">
        <div className="account-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`pill ${mode === 'login' ? 'pill-active' : ''}`}
            onClick={() => setMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'signup'}
            className={`pill ${mode === 'signup' ? 'pill-active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="account-form">
          {mode === 'signup' && (
            <label className="field">
            <span>Email</span>
            <input type="email" required autoComplete="email" value={email}onChange={(e)=> setemail(e.target.value)}/>
            <p className="error">{errors.email}</p>
          </label>
            
          )}
          <label className="field">
              <span>Full name</span>
              <input type="text" required autoComplete="name" value={username} onChange={(e)=> setusername(e.target.value)}/>
              <p className="error">{errors.username}</p>
            </label>
          <label className="field">
            <span>Password</span>
            <input type="password" required autoComplete="current-password" value={password}onChange={(e)=> setpassword(e.target.value)}/>
          </label>
          {error && <p>invalid credentials</p>}
          
          {loading ?( <button type="submit" className="btn btn-primary btn-block" disabled>
            please wait...
          </button>):(<button type="submit" className="btn btn-primary btn-block">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>)}
          
          
        </form>
        <p className="account-hint">
          {mode==='login'?'Not have account Sign up .':'already have account Log in'}
        </p>
      </div>
    </section>
  );
}

