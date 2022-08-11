export default function ExistingImageCard({ url, latitude, longitude, index }) {
  return (
    <div key={index} id="existing-image-card">
      <img alt="not found" width={"250px"} src={url} />
      <p>
        Coordinates:{" "}
        {`${parseFloat(latitude).toFixed(6)}, 
        ${parseFloat(longitude).toFixed(6)}`}
      </p>
    </div>
  );
}
