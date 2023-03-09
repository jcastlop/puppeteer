
import { Playlist } from './Playlist.jsx'
import {canciones} from './mocks/playlist.json'

import { Blog } from './Blog.jsx';
import { Cancion } from './reproductor.jsx';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Navbar } from './Navbar.jsx';

function App() {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/playlist" element={<Playlist canciones={canciones}/>}>
          
        </Route>
        <Route path="/" element={<Blog/>}>
        
        </Route>
        <Route path="/Cancion/:idCancion" element={<Cancion/>}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
