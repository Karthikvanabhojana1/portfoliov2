import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio heading', () => {
  render(<App />);
  const headings = screen.getAllByText(/Karthik Vanabhojana/i);
  expect(headings.length).toBeGreaterThan(0);
});
