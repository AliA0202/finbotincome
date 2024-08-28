import SignUpContainer from "./accounts/SignUpContainer";
import Login from "./accounts/Login";
import Dashboard from "./accounts/dashboard";
import BLog from "./Components/Blog/Blog";
import PostView from "./blog/PostView";
import Landing from "./Components/Landing/Landing";
import AboutUs from "./Components/AboutUs/aboutUs";
import Support from "./Components/Support/Support";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/blog" element={<BLog />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>

  );
}

export default App;
