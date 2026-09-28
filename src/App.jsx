import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { Outlet } from 'react-router-dom'
import BarreLaterale from './components/BarreLaterale'

function App() {
  

  return (
    <>
      <div className='flex min-h-screen bg-amber-50 overflow-hidden'>
          <BarreLaterale/>

            <main className='flex-1 p-6'>
              <Outlet/>
            </main>
          </div>
    </>
  )
}

export default App
