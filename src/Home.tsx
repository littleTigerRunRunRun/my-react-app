import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  return <div id="home">
    Home
    <button onClick={() => navigate('/')}>to main</button>
  </div>
}

export default Home