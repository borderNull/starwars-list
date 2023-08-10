import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PersonDetailsItem from "./PersonDetailsItem";

const defaultProps = {
  name: "name",
  value: "Darth Vader",
  editMode: false,
  editPerson: vi.fn(),
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderComponent = (incomingProps = {}) => {
  const props = { ...defaultProps, ...incomingProps };

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <PersonDetailsItem {...props} />
      </MemoryRouter>
    </QueryClientProvider>
  );

  return { container, props };
};

describe("PersonCard/PersonDetailsItem", () => {
  it("should render component correctly", () => {
    renderComponent();

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.value)).toBeInTheDocument();
  });

  it("should render input with correct data and call editPerson", async () => {
    const { container, props } = renderComponent({
      editMode: true,
    });

    const editPersonInput = container.querySelector(
      ".MuiOutlinedInput-input"
    ) as HTMLInputElement;

    expect(editPersonInput).toBeInTheDocument();
    expect(editPersonInput).toHaveValue(defaultProps.value);

    fireEvent.change(editPersonInput, { target: { value: "Chewbakka" } });

    expect(props.editPerson).toHaveBeenCalled();
  });

  it("should expand when expand button is clicked", () => {
    renderComponent({ value: "https://swapi.dev/api/planets/1" });

    const expandButton = screen.getByRole("button");

    expect(expandButton).toBeInTheDocument();
    expect(screen.getByTestId("ExpandMoreIcon")).toBeInTheDocument();

    fireEvent.click(expandButton);

    expect(screen.getByTestId("ExpandLessIcon")).toBeInTheDocument();
  });
});
