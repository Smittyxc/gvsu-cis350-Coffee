import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useParams } from 'react-router-dom';
import { CoffeeBagEntry } from '../components/coffeeBagEntry';
import { mockUseAuth } from './setup';


const mockedUseParams = vi.mocked(useParams);

const mockFetch = vi.fn();
global.fetch = mockFetch;


const mockCoffeeBag = {
  id: 'abc-123',
  name: 'El Pital',
  roaster: 'Onyx Coffee Lab',
  process: 'Washed',
  variety: 'Caturra',
  origin: 'Colombia',
  roastDate: '2025-10-20T00:00:00.000Z',
  weight: 340,
};

// Reset mocks before each individual test
beforeEach(() => {
  mockFetch.mockReset();
  mockedUseParams.mockReset();
  vi.clearAllMocks();
});


describe('CoffeeBagEntry in Create Mode', () => {
  test('should render a new form, allow typing, and submit a POST request', async () => {
    // No valid coffeeID in params forces UI into Create mode (instead of edit mode)
    mockedUseParams.mockReturnValue({ coffeeId: undefined });
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Success!' }),
    });

    const user = userEvent.setup();
    render(<CoffeeBagEntry />);

    // Check title
    expect(screen.getByRole('heading', { name: /new coffee bag/i })).toBeInTheDocument();

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'New Coffee');
    await user.type(screen.getByLabelText(/roaster/i), 'Test Roaster');
    await user.type(screen.getByLabelText(/weight/i), '250');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Check that fetch was called correctly
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/coffee',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token-123',
        },
      })
    )
    const bodyString = mockFetch.mock.calls[0][1].body;

    const bodyObject = JSON.parse(bodyString);

    expect(bodyObject.name).toBe('New Coffee');
    expect(bodyObject.roaster).toBe('Test Roaster');
    expect(bodyObject.weight).toBe('250');

    expect(await screen.findByText('Submitted successfully!')).toBeInTheDocument();
  });
});

describe('CoffeeBagEntry in Edit Mode', () => {

  mockUseAuth.mockReturnValue({
    session: { access_token: 'fake-token-123' }
  });

  test('should fetch data, populate the form, and submit a PUT request', async () => {
    mockedUseParams.mockReturnValue({ coffeeId: 'abc-123' });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ coffee: mockCoffeeBag }),
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Updated!' }),
    });

    const user = userEvent.setup();

    render(<CoffeeBagEntry />);

    expect(screen.getByRole('heading', { name: /edit coffee bag/i })).toBeInTheDocument();

    const nameInput = await screen.findByDisplayValue('El Pital', {}, { timeout: 3000 });
    await screen.findByDisplayValue('Washed', {}, { timeout: 3000 });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/coffee/abc-123',
      expect.objectContaining({
        headers: { Authorization: 'Bearer fake-token-123' },
      })
    );

    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Name');

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    expect(mockFetch).toHaveBeenNthCalledWith(2,
      'http://localhost:5000/api/coffee/abc-123',
      expect.objectContaining({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token-123',
        }
      })
    );

    // Verify the body contains updated data
    const putCallBody = JSON.parse(mockFetch.mock.calls[1][1].body);
    expect(putCallBody.name).toBe('Updated Name');

    expect(await screen.findByText('Updated successfully!')).toBeInTheDocument();
  });
});

describe('Error Handling', () => {
  test('should display an error message if submission fails', async () => {
    mockedUseParams.mockReturnValue({ coffeeId: undefined });
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Internal Server Error' }),
    });

    const user = userEvent.setup();
    render(<CoffeeBagEntry />);

    // incomplete coffee should fail against Zod schema
    await user.type(screen.getByLabelText(/name/i), 'Test');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Detect error message
    expect(await screen.findByText('Internal Server Error')).toBeInTheDocument();
  });
});