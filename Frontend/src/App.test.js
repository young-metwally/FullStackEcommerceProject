import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the E-commerce Store title', () => {
  render(<App />);
  const titleElement = screen.getByText(/E-commerce Store/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Add Product form', () => {
  render(<App />);
  const addButton = screen.getByRole('button', { name: /Add Product/i });
  expect(addButton).toBeInTheDocument();
});

test('renders Product List title', () => {
  render(<App />);
  const productListTitle = screen.getByText(/Product List/i);
  expect(productListTitle).toBeInTheDocument();
});
