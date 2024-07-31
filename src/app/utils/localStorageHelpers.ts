'use client';

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
