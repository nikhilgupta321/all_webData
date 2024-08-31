import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Navbar from "./Components/web_data/Navbar";
import Web_dataList from './Components/web_data/Web_dataList';
import Add_data from './Components/web_data/Add_data';
import Account from './Components/web_data/Account';

function App() {
  return (
    <>
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/webdata/*" element={<Navbar />}>
            <Route index element={<Web_dataList />} />
            <Route path="addentris" element={<Add_data />} />
            <Route path="account" element={<Account />} />
            <Route path=":filterType" element={<Web_dataList />} />
          </Route>
          <Route path="/webdata/login" element={<Login />} />
        </Routes>
    
    </>
  );
}

export default App;


