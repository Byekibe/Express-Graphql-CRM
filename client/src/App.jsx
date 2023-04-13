import { Routes, Route } from 'react-router-dom'
import Project from './pages/Project'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Layout from './components/Layout'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route element={ <Layout /> }>
          <Route path="/home" element={ <Home /> } />
          <Route path='/projects/:id' element={<Project />} />
          <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App;
