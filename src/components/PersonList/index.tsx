import { useState, ChangeEvent } from "react";
import { useQuery } from "react-query";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import PersonListCard from "./PersonListCard";
import Spinner from "../shared/Spinner";
import ErrorText from "../shared/ErrorText";

import api from "./api";
import { DEFAULT_PAGE_SIZE } from "./constants";
import useDebounce from "../../hooks/useDebounce";

import forceImage from "../../assets/may-the-force-be-with-you.gif";

import {
  ListWrap,
  PersonSearch,
  PersonListWrap,
  PersonNoResults,
  SearchBox,
} from "./styles";

interface IPerson {
  name: string;
  url: string;
}

const PersonList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchInput, 400);

  const {
    isLoading,
    isError,
    isFetching,
    data: { results = [], count = 0 } = {},
    error,
  } = useQuery({
    queryKey: [api.key, page, debouncedSearch],
    queryFn: () => api.fn(page, debouncedSearch),
    keepPreviousData: true,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    e.preventDefault();
    setPage(value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorText error={error as string} />;
  }

  const pageCount = count ? Math.ceil(count / DEFAULT_PAGE_SIZE) : 0;

  return (
    <PersonListWrap>
      <Snackbar
        open={isFetching}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Data is fetching"
      />
      <SearchBox>
        <PersonSearch
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={handleSearch}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search input"
                  onClick={clearSearch}
                >
                  {searchInput ? <ClearIcon /> : <SearchIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </SearchBox>
      {results.length ? (
        <ListWrap>
          <Grid container spacing={2}>
            {results.map((person: IPerson) => {
              const originalId = person.url.replace(/\D+/g, "");
              return (
                <Grid item key={originalId}>
                  <PersonListCard id={originalId} personName={person.name} />
                </Grid>
              );
            })}
          </Grid>
        </ListWrap>
      ) : (
        <PersonNoResults>
          <Typography variant="h3">Sorry no results</Typography>
          <img src={forceImage} />
        </PersonNoResults>
      )}
      {pageCount > 1 && (
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      )}
    </PersonListWrap>
  );
};

export default PersonList;
