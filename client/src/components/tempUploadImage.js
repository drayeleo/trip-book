import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import exifr from "exifr";

import ImageCard from "./imageCard";

export default function TempUploadImage() {
  let params = useParams();
  let navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  const [coords, setCoords] = useState([]);

  // console.log("selectedImages: ", selectedImages);
  console.log("coords: ", coords);

  // const getCoords = async () => {
  //   const unresolvedPromises = selectedImages.map(image => calc(n));
  //   const results = await Promise.all(unresolvedPromises);
  // };

  // useEffect(() => {
  //   const unresolvedPromises = selectedImages.map((image) => {
  //     const getImageCoords = async () => {
  //       let coords = await exifr.gps(image);
  //       // setCoords(coords);
  //       return coords;
  //     };
  //     return getImageCoords();
  //   });
  //   const results = await Promise.all(unresolvedPromises);
  //   // setCoords(results)
  // }, [selectedImages]);

  const handleSelectPhotos = async (event) => {
    // can I be sure these will be in same order as photos?
    // ^ there may be a better way to put coords and selectedImages in same array of objects so they're explicitly correctly paired

    const imgArray = Array.from(event.target.files);

    const unresolvedPromises = imgArray.map((image) => exifr.gps(image));
    // debugger;
    const results = await Promise.all(unresolvedPromises);
    setCoords(results);
    setSelectedImages(imgArray);

    // console.log("results: ", results);
  };

  // function handleSelectPhotos(event) {
  //   const imgArray = Array.from(event.target.files);

  //   let coordsArr = [];

  //   imgArray.forEach((image) => {
  //     exifr.gps(image).then((result) => {
  //       console.log(result)

  //     });
  //   });
  // }

  // function handleSelectPhotos(event) {
  //   const imgArray = Array.from(event.target.files);

  //   let coordsArr = [];

  //   imgArray.forEach((image) => {
  //     exifr.gps(image).then((result) => console.log(result));
  //   });
  // }

  // const handleSelectPhotos = async (event) => {
  //   const getImageCoords = async (image) => {
  //     return await exifr.gps(image);
  //   };

  //   const imgArray = Array.from(event.target.files);
  //   const unresolvedPromises = imgArray.map((image) => {
  //     return { imageFile: image, coordinates: getImageCoords(image) };
  //   });
  //   const results = await Promise.all(unresolvedPromises);
  //   setCoords(results);
  // };

  function displayUploadedImage() {
    if (selectedImages[0]) {
      return selectedImages.map((image, index) => {
        // console.log(exifr.gps(image));
        return (
          <ImageCard
            key={index}
            image={image}
            coords={coords[index]}
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

    selectedImages.forEach((image, index) => {
      // formData.append(`images[]`, image);
      formData.append(`${index} file`, image);
      formData.append(`${index} lat`, coords[index].latitude);
      formData.append(`${index} long`, coords[index].longitude);
    });

    for (const value of formData.entries()) {
      console.log(value);
    }
    // console.log(formData.values);

    // fetch(`/trips/${params.tripId}/add-images`, {
    fetch(`/trips/${params.tripId}/add-locations`, {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // navigate("/trips/" + params.tripId);
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
          handleSelectPhotos(event);
          // let imgArray = Array.from(event.target.files);
          // setSelectedImages(imgArray);
          // console.log("imgArray from input: ", imgArray);
        }}
      />
      <br />

      <br />
      <button onClick={handlePhotoSubmit}>Submit</button>
    </div>
  );
}
