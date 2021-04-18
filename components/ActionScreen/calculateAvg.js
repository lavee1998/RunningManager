import toFixing from "./toFixing"

export default (dist, timeInt) => {
  return toFixing(
    parseFloat(dist) / (Math.abs(parseFloat(timeInt)) / 3600000),
    1
  );
};
