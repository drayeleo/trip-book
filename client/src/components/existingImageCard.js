import { useEffect, useState } from "react";

export default function ExistingImageCard({
  url,
  latitude,
  longitude,
  index,
  // setSelectedImages,
}) {
  return (
    <div key={index} id="existing-image-card">
      <img alt="not found" width={"250px"} src={url} />
      {/* <br /> */}
      <p>Coordinates: {`${latitude}, ${longitude}`}</p>
      {/* <button
        onClick={() =>
          setSelectedImages((selectedImages) => {
            return selectedImages.filter((_, i) => i !== index);
          })
        }
      >
        Remove
      </button> */}
      {/* <br />
      <br /> */}
    </div>
  );
}
