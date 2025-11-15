import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { useParams } from 'react-router-dom';
import { CoffeeBagEntry } from '../components/coffeeBagEntry';
import { mockUseAuth } from './setup';
import { RecipesList } from '@/components/recipeList';
import { MemoryRouter } from 'react-router-dom';


const mockedUseParams = vi.mocked(useParams);

const mockFetch = vi.fn();
global.fetch = mockFetch as any;

const mockRecipes = [
  {
    id: 7,
    recipe_name: "Victor Wembanyama",
    dose_grams: 16,
    water_amount: 240,
    grind_size: 'Fine',
    steps: [
      { description: "Add 16 g of ground coffee to the brew chamber" },
      { description: "Give a gentle shake to level the grounds" },
      { description: "Pour water up to about 1.5 on the chamber" },
      { description: "Stir using the paddle", time: "0:10" },
      { description: "Insert the plunger and press gently, pausing when you meet resistance" },
      { description: "Stop once the plunger reaches the grounds" },
      { description: "Add additional hot water to the cup, to taste" },
    ]
  },
  {
    id: 8,
    recipe_name: "Jimmy Houston",
    dose_grams: 16,
    water_amount: 240,
    grind_size: 'Fine',
    steps: [
      { description: "Add 16 g of ground coffee to the brew chamber" },
      { description: "Give a gentle shake to level the grounds" },
      { description: "Pour water up to about 1.5 on the chamber" },
      { description: "Stir using the paddle", time: "0:10" },
      { description: "Insert the plunger and press gently, pausing when you meet resistance" },
      { description: "Stop once the plunger reaches the grounds" },
      { description: "Add additional hot water to the cup, to taste" },
    ]
  },
]


// Reset mocks before each individual test
beforeEach(() => {
  mockFetch.mockReset();
  mockedUseParams.mockReset();
  vi.clearAllMocks();
});


describe("RecipeList", () => {
  test('should render all recipes received from GET request', async () => {
    mockUseAuth.mockReturnValue({
      session: { access_token: 'fake-token-123' }
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: mockRecipes })
    });

    render(
      <MemoryRouter>
        <RecipesList />
      </MemoryRouter>
    )

    expect(screen.getByText('Loading recipes...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading recipes...')).not.toBeInTheDocument());

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/recipes',
      expect.objectContaining({
        headers: { Authorization: 'Bearer fake-token-123' },
      })
    );
    // const words = screen.getAllByText('Alan')
    // expect(words[0]).toBeInTheDocument();
    expect(await screen.findByText('Jimmy Houston')).toBeInTheDocument();
    expect(await screen.findByText('Victor Wembanyama')).toBeInTheDocument();


  })

  test('should display error message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'Server error',
    })

    render(
      <MemoryRouter>
        <RecipesList />
      </MemoryRouter>
    )

    expect(await screen.findByText('Error: Server error')).toBeInTheDocument()
  })

  test('should display message when no recipes are returned', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: [] })
    })

    render(
      <MemoryRouter>
        <RecipesList />
      </MemoryRouter>
    )

    expect(await screen.findByText("You don't have any recipes yet.")).toBeInTheDocument()
  }
  )
})
