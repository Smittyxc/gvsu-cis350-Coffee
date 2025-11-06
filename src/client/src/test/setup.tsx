import '@testing-library/jest-dom';
import { vi } from 'vitest';
  
// Mock the Auth Context with a mockable function
export const mockUseAuth = vi.fn();

vi.mock('@/context/AuthContext.tsx', () => ({
  useAuth: () => mockUseAuth()
}));

// Set default return value
mockUseAuth.mockReturnValue({
  session: { access_token: 'fake-token-123' }
});

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    Link: (props: any) => <a {...props}>{props.children}</a>,
  };
});