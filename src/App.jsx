import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminlog from './Components/Adminlog'
import Home from './Components/Home'
import createAdmin from './Components/CreateAdmin'
import Dashboard from './Components/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/adminlogin' element={<Adminlog/>}/>
          <Route path='/createAdmin' element={<createAdmin/>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
