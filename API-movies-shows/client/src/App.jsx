import React from "react"
import Homepage from './components/Homepage'
import { QueryClient, QueryClientProvider } from 'react-query'
import {Route, Routes} from 'react-router-dom'
import SingleItem from "./components/SingleItem"

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
    <div className="font-[Poppins] bg-neutral-900 ">
        <Routes>
          
      <Route path="/" element={<Homepage />} />
      <Route path="/:itemType/:id" element={<SingleItem />} />
    </Routes>
    </div>
    </QueryClientProvider>
  )
}

export default App
