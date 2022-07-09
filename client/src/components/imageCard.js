import exifr from "exifr";
import { useEffect, useState } from "react";

export default function ImageCard({ image, index, setSelectedImages }) {
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });

  useEffect(() => {
    const getImageCoords = async () => {
      // debugger;
      // const response = await exifr.gps(image);
      // const coords = await response.json;
      let coords = await exifr.gps(image);
      setCoords(coords);
    };
    getImageCoords();
  }, []);

  return (
    <div key={index}>
      <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
      <br />
      <p>Coordinates: {`${coords.latitude}, ${coords.longitude}`}</p>
      <button
        onClick={() =>
          setSelectedImages((selectedImages) => {
            return selectedImages.filter((_, i) => i !== index);
          })
        }
      >
        Remove
      </button>
      <br />
      <br />
    </div>
  );
}
