import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import exifr from "exifr";

import ImageCard from "./imageCard";

export default function TempUploadImage() {
  let params = useParams();
  let navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  function displayUploadedImage() {
    if (selectedImages[0]) {
      console.log("selectedImages: ", selectedImages);

      return selectedImages.map((image, index) => {
        // console.log(exifr.gps(image));
        return (
          <ImageCard
            key={index}
            image={image}
            index={index}
            setSelectedImages={setSelectedImages}
          />
        );
      });
    } else {
      return null;
    }
  }

  function handlePhotoSubmit() {
    // console.log("submitted!");
    const formData = new FormData();

    // formData.append("images", selectedImages);
    // ^ this puts image files in formData as batch - unclear whether that will be ok for sending/backend
    //   can always use below method instead, to make individual key value pairs in formData for each file

    selectedImages.forEach((image, index) =>
      formData.append(`images[]`, image)
    );

    for (const value of formData.values()) {
      console.log(value);
    }
    // console.log(formData.values);

    fetch(`/trips/${params.tripId}/add-images`, {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/trips/" + params.tripId);
      })
      .catch((error) => console.log({ error: error }));
  }

  return (
    <div>
      <h1>Upload and Display Images</h1>
      {displayUploadedImage()}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        multiple
        onChange={(event) => {
          console.log(event.target.files);
          setSelectedImages(Array.from(event.target.files));
          console.log(Array.from(event.target.files));
        }}
      />
      <br />

      <br />
      <button onClick={handlePhotoSubmit}>Submit</button>
    </div>
  );
}
