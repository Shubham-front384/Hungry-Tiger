import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import MainLayout from "./layouts/MainLayout"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
