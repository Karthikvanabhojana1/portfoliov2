import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Karthik Vanabhojana/i });
  expect(heading).toBeInTheDocument();
});
