import { useEffect} from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetails from './pages/ProductsDetails'
import Purshase from './pages/Purshase'
import MainNav from './components/MainNav'
import Loading from './components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import Cart from './components/Cart'
import CreateUser from './pages/CreateUser'
import Products from './pages/Products'
import { getProductsThunk } from './store/slices/products.slice'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  const dispatch = useDispatch()

  useEffect(()=>{

    dispatch(getProductsThunk())

}, [])

  return (
    <HashRouter>
      {isLoading&& <Loading/>}
      <MainNav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product/' element={<Products/>} />
          <Route path='/product/:id' element={<ProductsDetails/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/purshase' element={<Purshase/>} />
          <Route path='/create-user' element={<CreateUser/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/purshase' element={<Purshase/>} />
          </Route>

          <Route element={<ProtectedRoutes/>}>
            <Route element={<Cart/>} />
          </Route>
        </Routes>
    </HashRouter>
  )
}

export default App
