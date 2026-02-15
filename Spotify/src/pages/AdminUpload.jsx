import { useState } from "react";
import { uploadMusic } from "../services/music.service";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      await uploadMusic(formData);

      alert("Song uploaded successfully");

      setTitle("");
      setFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Upload Music (Admin)</h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>

        <button className="back-btn" onClick={() => navigate("/music")}>
          Back to Music
        </button>
      </div>
    </div>
  );
}

export default AdminUpload;
