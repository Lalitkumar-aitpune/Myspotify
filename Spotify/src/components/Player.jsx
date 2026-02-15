import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import "./player.css";

function Player() {
  const { currentSong, setCurrentSong } = useContext(PlayerContext);

  if (!currentSong) return null;

  return (
    <div className="player-bar">
      <div className="player-left">
        <div className="song-title">
          Playing: <strong>{currentSong.title}</strong>
        </div>
      </div>

      <audio src={currentSong.uri} controls autoPlay className="audio-player" />

      <button className="close-btn" onClick={() => setCurrentSong(null)}>
        ✕
      </button>
    </div>
  );
}

export default Player;
