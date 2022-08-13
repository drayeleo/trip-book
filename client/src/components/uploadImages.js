import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import exifr from "exifr";

import NewImageCard from "./newImageCard";

export default function UploadImages({ uploading, setUploading }) {
  let params = useParams();
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();

  let trip;
  if (user) {
    trip = user.trips.find((trip) => trip.id === parseInt(params.tripId));
  }

  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectPhotos = async (event) => {
    const imgArray = Array.from(event.target.files);

    const imageFiles = imgArray.map((i) => {
      return { file: i };
    });

    const unresolvedPromises = imageFiles.map(async (image) => {
      const locationData = await exifr.gps(image.file);
      return { ...image, ...locationData };
    });

    const results = await Promise.all(unresolvedPromises);
    setSelectedImages(results);
  };

  function displayUploadedImage() {
    if (selectedImages[0]) {
      return selectedImages.map((image, index) => {
        return (
          <NewImageCard
            key={index}
            image={image.file}
            latitude={image.latitude}
            longitude={image.longitude}
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
    setUploading(true);

    // console.log("uploading: ", uploading);
    // debugger;

    const formData = new FormData();

    selectedImages.forEach((image, index) => {
      formData.append(`${index} file`, image.file);
      formData.append(`${index} lat`, image.latitude);
      formData.append(`${index} long`, image.longitude);
    });

    // potential different setup to generate single object with file, lat, and long
    // (see commented code in trips_controller.rb for pseudocode of backend processing):
    // formData.append(`images[${index}][file]`, )
    // formData.append(`images[${index}][lat]`, )
    // formData.append(`images[${index}][long]`, )
    // ^ might have to actually put indexes in the empty brackets after image
    // should generate a single object for each image, similar to the frontend format.
    // this would allow for simpler code in trips_controller.rb but might require some finagling

    // for (const value of formData.entries()) {
    //   console.log(value);
    // }

    // post formData object to server
    fetch(`/trips/${params.tripId}/add-locations`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // update user state
        let tempUser = { ...user };
        tempUser.trips.find(
          (trip) => trip.id === parseInt(params.tripId)
        ).locations = data;
        setUser(tempUser);

        setUploading(false); // this may not be necessary?

        // navigate back to "trip" page
        navigate("/trips/" + params.tripId);
      })
      .catch((error) => console.log({ error: error }));
  }

  return (
    <div id="upload-images">
      <h2>Upload Images</h2>
      <h3>
        Feel free to use images I've prepared{" "}
        <a href="https://capstone-sample-photos.s3.us-west-1.amazonaws.com/yanaurco_photos.zip">
          <u>
            <strong>here</strong>
          </u>
        </a>
      </h3>
      <div id="uploaded-images-container">{displayUploadedImage()}</div>
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
      {selectedImages[0] ? (
        <button onClick={handlePhotoSubmit}>Save Photos</button>
      ) : null}
    </div>
  );
}
