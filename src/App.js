// import { ConfigProvider } from 'antd';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import "./index.css"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}></Route>
        <Route path='/layout/:user' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
