
import { BrowserRouter,Routes,Route } from "react-router";
import Navbar from "./components/Navbar";
import Body from "./components/Body"
import "./index.css"
import Login from "./components/Login";
function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/test" element={<div>test page</div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;