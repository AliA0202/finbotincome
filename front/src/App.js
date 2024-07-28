import SignUpContainer from "./accounts/SignUpContainer"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/account" element={<SignUpContainer />} />
      </Routes>
    </Router>

  );
}

export default App;
