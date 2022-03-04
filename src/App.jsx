import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CreateCustomer from './components/CreateCustomer'
import Customer from './components/Customer'
import UpdateCustomer from './components/UpdateCustomer'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
