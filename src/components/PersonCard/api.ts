export const fetchPerson = async (personId: string = "") => {
  if (!personId.length) return;
  const response = await fetch("https://swapi.dev/api/people/" + personId);
  return response.json();
};

export const fetchResource = async (url: string = "") => {
  if (!url.length) return;
  const response = await fetch(url);
  return response.json();
};

const api = {
  person: {
    key: "getPersonData",
    fn: fetchPerson,
  },
  subList: {
    key: "getSubListData",
    fn: fetchResource,
  },
};

export default api;
