import React from "react";
import { render } from "@testing-library/react";

import Haunted from './Haunted';

describe('Haunted', () => {
  test('renders the Haunted component', () => {
    render(<Haunted/>);
  })
});
