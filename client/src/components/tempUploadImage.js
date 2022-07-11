import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import exifr from "exifr";

import ImageCard from "./imageCard";

export default function TempUploadImage() {
  let params = useParams();
  let navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  // const [coords, setCoords] = useState([]);

  console.log("selectedImages: ", selectedImages);
  // console.log("coords: ", coords);

  const handleSelectPhotos = async (event) => {
    const imgArray = Array.from(event.target.files);

    const imageFiles = imgArray.map((i) => {
      return { file: i };
    });

    const unresolvedPromises = imageFiles.map(async (image) => {
      const locationData = await exifr.gps(image.file);
      return { ...image, ...locationData };
    });

    console.log(unresolvedPromises);

    const results = await Promise.all(unresolvedPromises);
    // setCoords(results);
    setSelectedImages(results);

    // console.log("results: ", results);
  };

  function displayUploadedImage() {
    if (selectedImages[0]) {
      return selectedImages.map((image, index) => {
        // console.log(exifr.gps(image));
        return (
          <ImageCard
            key={index}
            image={image.file}
            latitude={image.latitude}
            longitude={image.longitude}
            // coords={{ ...image }}
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

    selectedImages.forEach((image, index) => {
      formData.append(`${index} file`, image.file);
      formData.append(`${index} lat`, image.latitude);
      formData.append(`${index} long`, image.longitude);
    });
    // potential different setup to generate single object with file, lat, and long
    // (see commented code in trips_controller.rb for pseudocode of backend processing):
    // formData.append('images[][file]', )
    // ^ might have to actually put indexes in the empty brackets after image

    for (const value of formData.entries()) {
      console.log(value);
    }
    // console.log(formData.values);

    fetch(`/trips/${params.tripId}/add-locations`, {
      method: "POST",
      body: formData,
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
        onChange={handleSelectPhotos}
      />
      <br />

      <br />
      <button onClick={handlePhotoSubmit}>Submit</button>
    </div>
  );
}
