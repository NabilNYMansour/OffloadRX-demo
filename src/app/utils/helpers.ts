export const toggleFavourite = (id: number) => {
  if (!localStorage.getItem("favourites")) { // no favourites yet
    localStorage.setItem("favourites", JSON.stringify([id]));
  } else {
    const favourites = JSON.parse(localStorage.getItem("favourites")!);
    if (favourites.includes(id)) { // already favourited so remove
      favourites.splice(favourites.indexOf(id), 1);
    } else { // not favourited so add
      favourites.push(id);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites)); // store new in local storage
  }
}

export const isFavourite = (id: number) => {
  if (!localStorage.getItem("favourites")) return false;
  return JSON.parse(localStorage.getItem("favourites")!).includes(id);
}

export const agoCalculator = (days: number) => {
  var months = Math.floor(days / 30);
  days = days - months * 30;
  var weeks = Math.floor(days / 7);
  days = Math.floor(days - weeks * 7);
  if (months > 0) {
    return months + " month" + (months > 1 ? "s" : "") + " ago";
  } else if (weeks > 0) {
    return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
  } else if (days > 0) {
    return days + " day" + (days > 1 ? "s" : "") + " ago";
  } else {
    return "today";
  }
}

export const formatExpiry = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
}