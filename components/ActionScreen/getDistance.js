import haversine from "haversine";

export default (startLoc, endLoc) => {
  let start = {
    latitude: startLoc.latitude,
    longitude: startLoc.longitude,
  };
  let end = {
    latitude: endLoc.latitude,
    longitude: endLoc.longitude,
  };

  const dist = haversine(start, end, { unit: "kilometer" });
  return dist;
};
