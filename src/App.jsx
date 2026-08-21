
import { BrowserRouter,Routes,Route } from "react-router";
import Navbar from "./components/Navbar";
import Body from "./components/Body"
import "./index.css"
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
function App()
{
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
      
  )
}

export default App;