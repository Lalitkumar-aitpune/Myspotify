import { useEffect, useState, useContext } from "react";
import { getAllMusic , deleteMusic } from "../services/music.service";
import MusicCard from "../components/MusicCard";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import "./music.css";

function Music() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { setCurrentSong } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMusic();
  }, []);

  async function fetchMusic() {
    try {
      const res = await getAllMusic();
      setSongs(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load music.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMusic(id);

      // Remove deleted song from UI
      setSongs((prev) => prev.filter((song) => song._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete music.");
    }
  }




const user = JSON.parse(localStorage.getItem("user"));
const username = user?.username;
const role = user?.role;


  return (
    <div className="music-page">
      <div className="music-header">
        <h1>My_Spotify</h1>
        <h2>Listen the Music</h2>
        {username && <p className="welcome-text">Welcome, {username}</p>}
      </div>

      <div className="music-hero">
        <div className="hero-text">
          <h3>Feel The Beat</h3>
          <p>Stream your favorite tracks anytime.</p>
        </div>
      </div>

      {loading && <p className="status-text">Loading music...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && songs.length === 0 && !error && (
        <p className="status-text">No songs available.</p>
      )}

      <div className="music-list-container">
        <div className="music-grid">
          {songs.map((song) => (
            <MusicCard
              key={song._id}
              song={song}
              play={() => setCurrentSong(song)}
              onDelete={() => handleDelete(song._id)}
              isAdmin={role === "admin"} // ← THIS WAS THE ADMIN LINE
            />
          ))}
        </div>
      </div>

      {role === "admin" && (
        <button className="upload-btn" onClick={() => navigate("/admin")}>
          Upload Music
        </button>
      )}

      <button className="switch-btn" onClick={() => navigate("/login")}>
        switch user
      </button>
    </div>
  );
}

export default Music;
