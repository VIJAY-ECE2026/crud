import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import User from './Users';
import CreateUser from './Createuser';
import UpdateUser from './Updateuser';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/create' element={<CreateUser />} />
          <Route path='/update/:id' element={<UpdateUser />} />
          {/* Handle undefined routes */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
