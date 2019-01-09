import React from "react";
import { render } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import Home from "../src/components/Home";

describe("<Home />", () => {
  test("Home component should render", () => {
    const { getByText } = render(<Home />);
    expect(
      getByText("Welcome To Fast Food Fast Home Page")
    ).toBeInTheDocument();
  });
});
