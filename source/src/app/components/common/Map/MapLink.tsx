const MapLink = ({ destination }: any) => {
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "15.3289398,108.8605682"
  )}`;

  return (
    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
      Chỉ đường đến {destination}
    </a>
  );
};

export default MapLink;
