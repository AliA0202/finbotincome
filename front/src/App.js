import SignUpContainer from "./accounts/SignUpContainer"
import Login from "./accounts/Login"
import EditProfile from "./accounts/editProfile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Router>

  );
}

export default App;
