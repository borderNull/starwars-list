import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import api from "./api";
import PersonList from "./index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const defaultProps = {};

const testResults = [
  { name: "Luke Skywalker", url: "some_url/1" },
  { name: "Darth Vader", url: "some_url/2" },
  { name: "R2-D2", url: "some_url/3" },
];

const testApi = (props = {}) => ({
  fetchPersonList: vi
    .spyOn(api, "fn")
    .mockClear()
    .mockResolvedValue({
      count: 20,
      results: testResults,
      ...props,
    }),
});

const renderComponent = (incomingProps = {}) => {
  const props = { ...defaultProps, incomingProps };
  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <PersonList />
      </MemoryRouter>
    </QueryClientProvider>
  );

  return { container, props };
};

describe("PersonList/index.ts", () => {
  it("should render component", async () => {
    const { fetchPersonList } = testApi();
    renderComponent();

    const searchInput = await screen.findByLabelText("Search");

    await waitFor(() => expect(fetchPersonList).toHaveBeenCalledTimes(1));
    expect(searchInput).toBeInTheDocument();
  });

  it("should perform search on search input change", async () => {
    const { fetchPersonList } = testApi();
    renderComponent();

    const searchInput = await screen.findByLabelText("Search");
    const searchIcon = screen.getByTestId("SearchIcon");

    expect(searchIcon).toBeInTheDocument();

    const stringForSearch = "Star Wars";

    fireEvent.change(searchInput, { target: { value: stringForSearch } });

    expect(searchInput).toHaveValue(stringForSearch);

    await waitFor(() => expect(fetchPersonList).toHaveBeenCalledTimes(2));

    const clearIcon = screen.getByTestId("ClearIcon");

    expect(clearIcon).toBeInTheDocument();

    fireEvent.click(clearIcon);

    expect(searchInput).toHaveValue("");

    await waitFor(() => expect(fetchPersonList).toHaveBeenCalledTimes(3));
  });

  it("should show no results section when results are empty", async () => {
    testApi({ results: [] });
    renderComponent();

    const noResults = await screen.findByText("Sorry no results");

    expect(noResults).toBeInTheDocument();
  });

  it("should show snackbar if search is performing", async () => {
    testApi();
    renderComponent();

    const snackbar = await screen.findByRole("presentation");
    await waitFor(() => expect(snackbar).toBeInTheDocument());

    await waitForElementToBeRemoved(snackbar);
    expect(snackbar).not.toBeInTheDocument();
  });

  it("should show pagination and perform search if pagination clicked", async () => {
    const { fetchPersonList } = testApi({ count: 20 });
    renderComponent();

    const pagination = await screen.findByRole("navigation", {
      name: "pagination navigation",
    });

    expect(pagination).toBeInTheDocument();

    const page2 = await screen.findByRole("button", {
      name: "Go to page 2",
    });

    fireEvent.click(page2);

    await waitFor(() => expect(fetchPersonList).toHaveBeenCalledTimes(2));
  });

  it("should not show pagination if count lower or equal 10", async () => {
    testApi({ count: 10 });
    renderComponent();

    const pagination = await screen.findByRole("navigation", {
      name: "pagination navigation",
    });

    expect(pagination).not.toBeInTheDocument();
  });

  it("should show person cards if results not empty", async () => {
    testApi({ count: 3 });
    renderComponent();

    const imageCards = await screen.findAllByAltText("star wars logo");

    expect(imageCards).toHaveLength(3);

    imageCards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });
  });
});
