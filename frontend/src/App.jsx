import React from 'react'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={ <HomePage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={ router } />
  )
}

export default App