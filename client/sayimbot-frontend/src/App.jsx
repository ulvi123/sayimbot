import { Button } from "@/components/ui/button";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportingPage from "./pages/Reporting";

export default function App() {
  return (
    <h1 className="text-3xl font-bold">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/reporting" element={<ReportingPage/>}/>
        </Routes>
      </Router>
    </h1>
  )
}
        