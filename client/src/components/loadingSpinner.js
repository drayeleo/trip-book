import world_map from "./world_map.png";

export default function LoadingSpinner() {
  return (
    <div id="loading-spinner">
      <p>Hang tight, we're saving your photos...</p>
      <img src={world_map} />
    </div>
  );
}
