import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginCard from "../components/cards/login-card/login-card";
import Conversations from "../scenes/conversations/conversations";
import Login from "../scenes/login/login";
import { Register } from "../scenes/register/register";
import { getUserProfile } from "../services/user";
import { useAuth } from "../stores/auth";

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setUser, user, setToken } = useAuth(({ setUser, user, setToken }) => ({ setUser, user, setToken })) 

  const fetchProfile = (token) => {
    setToken(token)
    getUserProfile(token)
    .then((data) => {
      console.log(data);
      setUser(data.user)
    })
  }
  
  useEffect(() => {

    if(!location) return 

    const { pathname } = location
    const isAuthLocation =  ["/login", "/register"].includes(pathname)

    const sessionToken = sessionStorage.getItem("TOKEN")

    if(!sessionToken && !isAuthLocation)
    {
      return navigate("/login")
    }

    if(sessionToken && !user)
    {
      fetchProfile(sessionToken)
    }


    if(sessionToken && isAuthLocation ) {
      return navigate("/conversations")
    }


  }, [location, user])


  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Conversations />} />
        </Routes>
    </div>
  );
}

export default App;
