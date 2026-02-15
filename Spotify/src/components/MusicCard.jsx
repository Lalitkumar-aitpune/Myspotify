import "./musicCard.css";

function MusicCard({ song, play, onDelete, isAdmin }) {
  return (
    <div className="music-card">
      <div className="music-card-content">
        <h4 className="music-title">{song.title}</h4>
        <p className="music-artist">{song.artist?.username}</p>
      </div>

      <div className="music-actions">
        <button className="play-btn" onClick={play}>
          Play
        </button>

        {isAdmin && (
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default MusicCard;
