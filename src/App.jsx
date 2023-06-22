import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/common/Header/Header'
import Cart from './components/common/Cart/Cart'
import { Fragment, useState } from 'react'

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleVisibilityCart = () => {
    setIsCartVisible(!isCartVisible);
  }

  return (
    <Fragment>
      <Header updateCartVisible={toggleVisibilityCart}/>
      <main>
        <Outlet/>
      </main>
      <Cart isVisible={isCartVisible}/>
      <footer>
        <p>Made with ❤️ in Academlo</p>
        <p>Web Developer: Miguel Garavito</p>
      </footer>
    </Fragment>
  )
}

export default App
