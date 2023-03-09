import './css/cancion.css'


import { Link } from 'react-router-dom';

export function Cancion({ cancion }) {



	return (
		<div className="componente-container">
			<img src={cancion.imagen} alt="song cover image" className="componente-img" />
			<div className="componente-details">
				<h3 className="componente-title">{cancion.nombre}</h3>
				<p className="componente-artist">{cancion.artista}</p>
				
					
				
			</div>
			<Link to={"/cancion/"+cancion.id} className="componente-play">
			<span >Play</span></Link>
		</div>
	)
}