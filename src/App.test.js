import { render, screen } from '@testing-library/react';
import App from './App';

test('renders experience section heading', () => {
  render(<App />);
  const heading = screen.getByText(/experience/i);
  expect(heading).toBeInTheDocument();
});
