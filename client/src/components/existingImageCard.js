import { useEffect, useState } from "react";

export default function ExistingImageCard({
  url,
  latitude,
  longitude,
  index,
  // setSelectedImages,
}) {
  // debugger;
  return (
    <div key={index} id="existing-image-card">
      <img alt="not found" width={"250px"} src={url} />
      {/* <br /> */}
      <p>
        Coordinates:{" "}
        {`${parseFloat(latitude).toFixed(6)}, 
        ${parseFloat(longitude).toFixed(6)}`}
      </p>
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
