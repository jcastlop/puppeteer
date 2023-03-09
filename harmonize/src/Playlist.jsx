

import './css/playlist.css'
import { Cancion } from './Cancion.jsx'
export function Playlist({canciones}) {
  

    return (
        <div class="canciones-container">
        { canciones.map(cancion=>
        <Cancion cancion={cancion}/>

        

     )}
     </div>
        
    )
  }