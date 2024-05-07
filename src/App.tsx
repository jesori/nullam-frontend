import './App.css'
import { useRoutes } from 'react-router-dom'
import { AddEventView } from './pages/AddEventView'
import { HomeView } from './pages/HomeView'
import { Layout } from './composents/Layout'
import { EditParticipantView } from './pages/EditPrticipantView'
import { EventView } from './pages/EventView'

function App() {
  const element = useRoutes(
    [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/addevent",
        element: <AddEventView />,
      },
      {
        path: "/event/:id",
        element: <EventView/>,
      },
      {
        path: "/participant/:id",
        element: <EditParticipantView />,
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
