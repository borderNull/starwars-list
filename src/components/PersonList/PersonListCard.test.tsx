import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import PersonListCard from "./PersonListCard";

const defaultProps = {
  personName: "Darth Vader",
  id: "1",
};

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const renderComponent = (incomingProps = {}) => {
  const props = { ...defaultProps, ...incomingProps };

  const { container } = render(
    <MemoryRouter>
      <PersonListCard {...props} />
      <LocationDisplay />
    </MemoryRouter>
  );

  return { container, props };
};

describe("PersonList/PersonListCard.tsx", () => {
  it("should render Person Card with default name", () => {
    renderComponent();

    expect(screen.getByText(defaultProps.personName)).toBeInTheDocument();
  });

  it("should navigate to person card when Card Action is clicked", async () => {
    const { container } = renderComponent();
    const cardActionComponent = container.querySelector(
      ".MuiCardActionArea-root"
    );

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    await fireEvent.click(cardActionComponent!);

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/person/${defaultProps.id}`
    );
  });

  it("should navigate to person card when view full profile button is clicked", async () => {
    renderComponent();

    expect(screen.getByTestId("location-display")).toHaveTextContent("/");

    await fireEvent.click(screen.getByText("view full profile"));

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      `/person/${defaultProps.id}`
    );
  });
});
