
import { BrowserRouter,Routes,Route } from "react-router";
import Navbar from "./components/Navbar";
import Body from "./components/Body"
import "./index.css"
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
function App()
{
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/test" element={<div>test page</div>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
      
  )
}

export default App;