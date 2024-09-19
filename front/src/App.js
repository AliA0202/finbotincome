import SignUpContainer from "./accounts/SignUpContainer";
import Login from "./accounts/Login";
import Dashboard from "./accounts/dashboard";
import BLog from "./Components/Blog/Blog";
import PostView from "./blog/PostView";
import Landing from "./Components/Landing/Landing";
import AboutUs from "./Components/AboutUs/aboutUs";
import Support from "./Components/Support/Support";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentSuccess from "./Components/Payment/PaymentSuccess";
import PaymentError from "./Components/Payment/PaymentError";


function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/payment/success" component={<PaymentSuccess />} />
        <Route path="/payment/error" component={<PaymentError />} />
        <Route path="/blog" element={<BLog />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>

  );
}

export default App;
