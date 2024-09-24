import React, { useState } from "react";
import axios from "axios";


const ImageUpload = () => {
  const [name,setname]=useState('')
  const [image, setImage] = useState(null);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name)
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
    <br />
    <form onSubmit={handleSubmit} align='center'>
      <div>
        <label htmlFor="name"> Enter name:-</label>
        <input type="text" name="name" onChange={(e)=>setname(e.target.value)} /> <br />
        <label htmlFor="file">Enter image:-</label>
        <input type="file" name="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <button type="submit">Upload Image</button>
    </form>
    </>
  );

};

export default ImageUpload;
