
import { TooltipProvider } from '@radix-ui/react-tooltip'
import './App.css'
import { HomeRestaurant } from './components/HomeRestaurant'
import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <TooltipProvider>
      <HomeRestaurant/>
      <Toaster/>
    </TooltipProvider>
  )
}

export default App
