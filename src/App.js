import React from 'react'
import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import Menu from './Component/Menu'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Update from './Pages/Update'
import Pnf from './Pages/Pnf'

function App() {
  return (
    <BrowserRouter >
          <Menu/>
          <Routes>
                <Route path={`/`} element={<Home/>}/>
                <Route path={`/create`} element={<Create/>}/>
                <Route path={`/edit`} element={<Update/>}/>
                <Route path={`/*`} element={<Pnf/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App
