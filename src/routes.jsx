import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import { SidebarWithBurgerMenu } from './widgets/layout/sideBar'
import Container from './widgets/layout/Container'




export default function RouteApp () {
  return(
    <BrowserRouter>
    <div className='flex'>
      <SidebarWithBurgerMenu/>
      <Container>
        <Routes>
            <Route path={'/'} element={<Home/>} />
        </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}