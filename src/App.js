import { useEffect, useState } from 'react';
import SearchPokemon from './components/SearchPokemon';
import "./style.css"

function App() {
  const [isDisconnect, setIsDisconnect] = useState(false)

  const connectionChecking = () => {
    const condition = navigator.onLine ? 'Online' : 'Offline'

    if (condition === 'Online') {
      setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors',
        })
          .then(() => setIsDisconnect(false))
          .catch(() => setIsDisconnect(true))
      }, 5000)
      return
    }
    return setIsDisconnect(false)
  }

  useEffect(() => {
    connectionChecking()
    window.addEventListener('online', connectionChecking())
    window.addEventListener('offline', connectionChecking())
  }, [])

  return isDisconnect ? (
    <h1 style={{ textAlign: "center", color: 'white' }}>Koneksi Kamu Teputus</h1>
  ) : (
    <SearchPokemon />
  )
}

export default App
