import api from "./api";

export const getAllMusic = () => api.get("/music");

export const uploadMusic = (formData) =>
  api.post("/music/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });


export const deleteMusic = (id) =>{
  return api.delete(`/music/${id}`)
}