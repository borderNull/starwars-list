export const fetchPersons = async (page = 0, searchInput = "") => {
  const searchRequest = searchInput.length ? "&search=" + searchInput : "";
  const response = await fetch(
    "https://swapi.dev/api/people/?page=" + page + searchRequest
  );
  return response.json();
};

const api = {
  key: "getPersonsList",
  fn: fetchPersons,
};

export default api;
