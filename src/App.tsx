import './App.css'
import { useRoutes } from 'react-router-dom'
import { AddEvent } from './pages/AddEvent'
import { Home } from './pages/Home'
import { Layout } from './composents/Layout'

function App() {
  let element = useRoutes(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addEvent",
        element: <AddEvent />,
      },

    ]
  )
  return (
      <Layout>
        {element}
      </Layout>
  )
}
export default App
