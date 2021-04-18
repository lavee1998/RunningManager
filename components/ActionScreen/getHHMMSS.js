export default (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  const humanized = [
    hours < 10 ? "0" + hours.toString() : hours.toString(),
    minutes < 10 ? "0" + minutes.toString() : minutes.toString(),
    seconds < 10 ? "0" + seconds.toString() : seconds.toString(),
  ].join(":");

  return humanized;
};
