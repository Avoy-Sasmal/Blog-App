import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <Routes>
         <Route path="/" element={<Home />} /> 
         <Route path="/create" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
