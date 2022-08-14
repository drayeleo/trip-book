export default function NewImageCard({
  image,
  latitude,
  longitude,
  index,
  setSelectedImages,
}) {
  return (
    <div key={index} id="uploaded-image-card">
      <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
      <p>
        Coordinates:{" "}
        {`${parseFloat(latitude).toFixed(6)}, 
        ${parseFloat(longitude).toFixed(6)}`}
      </p>
      <button
        onClick={() =>
          setSelectedImages((selectedImages) => {
            return selectedImages.filter((_, i) => i !== index);
          })
        }
      >
        Remove Photo
      </button>
    </div>
  );
}
