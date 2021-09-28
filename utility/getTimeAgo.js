const getTimeAgo = (currentTime, timestamp) => {
  let minutes = Math.floor((currentTime / 1000 - timestamp) / 60);
  let hours = Math.floor((currentTime / 1000 - timestamp) / (60 * 60));
  let days = Math.floor((currentTime / 1000 - timestamp) / (60 * 60 * 24));

  if (minutes <= 0) return "now";
  else if (minutes < 60) return minutes + "m";
  else if (hours < 24) return hours + "h";
  else return days + "d";
};

export default getTimeAgo;
