import SignUpContainer from "./accounts/SignUpContainer"
import Login from "./accounts/Login"
import EditProfile from "./accounts/editProfile";
import PostsList from "./blog/PostsList"
import PostView from "./blog/PostView"
import PaymentList from "./payments/PaymentList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<PostsList />} />
        <Route path="/post/:slug" element={<PostView />} />
        <Route path="/Payments" element={<PaymentList />} />
      </Routes>
    </Router>

  );
}

export default App;
