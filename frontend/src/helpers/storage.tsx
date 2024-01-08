
export const loadFromLocal = (key: string) => {
  try {
    const storedValue = localStorage.getItem(key)

    return storedValue? JSON.parse(storedValue) : null;

  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const saveToLocal = (data: void, key: string) => {
  try {
    const serialisedState = JSON.stringify(data);
    localStorage.setItem(key, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

export const removeFromLocal = () => {
  localStorage.removeItem("emauth");
};
