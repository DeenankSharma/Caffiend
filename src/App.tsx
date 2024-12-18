import Layout from "./components/Layout"
import Stats from "./components/Stats"
import History from "./components/History"
import Hero from "./components/Hero"
import CoffeeForm from "./components/CoffeeForm"
import { useAuth } from "./context/AuthContext"


function App() {

  const { user, isloading, globalData } = useAuth()
  const isAuthenticated = user
  const isData = globalData && !!Object.keys(globalData || {}).length  // ? syntax for global data should not be zero
  // ? !! converts to boolean
  
  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </> 
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {(isAuthenticated && isloading) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent)}
    </Layout>
  )
}

export default App