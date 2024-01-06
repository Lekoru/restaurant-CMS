
export const loadFromLocal = () => {
  try {
    const storedValue = localStorage.getItem("emauth")

    return storedValue? JSON.parse(storedValue) : null;

  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const saveToLocal = (user: void) => {
  try {
    const serialisedState = JSON.stringify(user);
    localStorage.setItem("emauth", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const removeFromLocal = () => {
  localStorage.removeItem("emauth");
};
