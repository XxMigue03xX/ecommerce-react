import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/common/Header/Header'
import Cart from './components/common/Cart/Cart'
import { useState } from 'react'

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleVisibilityCart = () => {
    setIsCartVisible(!isCartVisible);
  }

  return (
    <>
      <Header updateCartVisible={toggleVisibilityCart}/>
      <main>
        <Outlet/>
      </main>
      <Cart isVisible={isCartVisible}/>
    </>
  )
}

export default App
