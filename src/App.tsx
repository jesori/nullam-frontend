import './App.css'
import { useRoutes } from 'react-router-dom'
import { AddEvent } from './pages/AddEvent'
import { Home } from './pages/Home'
import { Layout } from './composents/Layout'
import { Addprticipant } from './pages/Addprticipant'

function App() {
  const element = useRoutes(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addEvent",
        element: <AddEvent />,
      },
      {
        path: "/addParticipant",
        element: <Addprticipant />,
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
