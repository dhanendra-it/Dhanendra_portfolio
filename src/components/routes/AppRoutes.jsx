import { Routes, Route } from "react-router-dom";
import Home from "../pages/Whole"
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (  
    <div className='relative'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/Services" element={<Services/>} />
            <Route path="/Contact" element={<Contact/>} />
          </Routes>
    </div>
  )
}

export default AppRoutes
