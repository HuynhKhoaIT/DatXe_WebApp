export const getData = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    const dataStorage: any = window.localStorage.getItem(key);
    try {
      return JSON.parse(dataStorage);
    } catch (error) {
      return dataStorage;
    }
  }
  return false;
};

export const setData = (key: string, data: any) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(
      key,
      typeof data === "object" ? JSON.stringify(data) : data
    );
  }
};

export const removeItem = (key: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(key);
  }
};
