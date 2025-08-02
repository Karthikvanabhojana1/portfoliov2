import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio header', () => {
  render(<App />);
  const heading = screen.getByText(/Karthik Vanabhojana/i);
  expect(heading).toBeInTheDocument();
});
