import { useState } from "react";
import { useParams } from "react-router-dom";

import './css/reproductor.css'

import cancion from "./mocks/Cancion.json";




export function Cancion() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  let { idCancion } = useParams()
  console.log(idCancion)
  const handlePlayPauseClick = () => {
    const audio = document.getElementById("audio-element");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = document.getElementById("audio-element");
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    setProgress(currentTime / duration * 100);
  };
  return (
    <>
      <div className="music-player">
        <div className="album-info">
          <img className="album-cover" src={cancion.imagen} alt="Album cover" />
          <div className="song-info">
            <h3 className="song-title">{cancion.nombreCancion}</h3>
            <p className="artist-name">{cancion.artista}</p>
          </div>
        </div>
        <audio
          id="audio-element"
          src={cancion.rutaCancion}
          onTimeUpdate={handleTimeUpdate}
        />
        <div className="controls">
          {isPlaying ? (
            <button className="pause-btn" onClick={handlePlayPauseClick}>
              <i className="fa fa-pause"></i>
            </button>
          ) : (
            <button className="play-btn" onClick={handlePlayPauseClick}>
              <i className="fa fa-play"></i>
            </button>
          )}
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  );
}

