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
      <div className='flex h-screen overflow-hidden bg-slate-50 text-slate-900 antialiased selection:bg-indigo-200'>
          <BarreLaterale/>

            <main className='flex-1 min-w-0 overflow-hidden p-6 lg:p-8'>
              <Outlet/>
            </main>
          </div>
    </>
  )
}

export default App
