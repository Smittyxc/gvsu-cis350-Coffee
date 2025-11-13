require('dotenv').config();
const request = require('supertest');
const app = require('./app');

const TEST_USER_TOKEN = process.env.TEST_USER_TOKEN;

// Coffee Bag API
describe('Coffee API', () => {
  it('should create a new bag of coffee with valid data and auth', async () => {
    const newCoffee = {
      name: "Test Coffee",
      roaster: "Test Roaster",
      process: "Washed",
      variety: "Maragogype",
      origin: 'Guatemala',
      weight: 320,
      roastDate: '2023-11-08T14:30:00Z',
    };

    const reponse = await request(app)
      .post('/api/coffee')
      .set("Authorization", `Bearer ${TEST_USER_TOKEN}`)
      .send(newCoffee);

    expect(reponse.statusCode).toBe(201);
    expect(reponse.body.coffee).toHaveProperty('id');
    expect(reponse.body.coffee.name).toBe("Test Coffee");
  });

  it('should return 400 for invalid data (missing name)', async () => {
    const invalidCoffee = {
      // name is missing
      roaster: "Test Roaster",
      process: "Washed",
      variety: "Maragogype",
      origin: 'Guatemala',
      weight: 320,
      roastDate: '2023-11-08T14:30:00Z',
    };

    const reponse = await request(app)
      .post('/api/coffee')
      .set("Authorization", `Bearer ${TEST_USER_TOKEN}`)
      .send(invalidCoffee);

    expect(reponse.statusCode).toBe(400);
    expect(reponse.body.error).toBe('Invalid data');
  });

  it('should return 400 error for invalid data (incorrect date format', async () => {
    const invalidDateCoffee = {
      roaster: "Test Roaster",
      process: "Anaerobic 72hr Fermentation",
      variety: 'SL-28',
      origin: 'Kenya',
      weight: '215',
      roastDate: '2023-11-08T14:30:00'
    }

    const response = await request(app)
      .post('/api/coffee')
      .set('Authorization', `Bearer ${TEST_USER_TOKEN}`)
      .send(invalidDateCoffee)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe("Invalid data")
  })


  it('should return 401 for no auth token', async () => {
    const newCoffee = {
      name: "Test Coffee",
      roaster: "Test Roaster",
      process: "Washed",
      variety: "Maragogype",
      origin: 'Guatemala',
      weight: 320,
      roastDate: '2023-11-08T14:30:00Z',
    };

    const reponse = await request(app)
      .post('/api/coffee')
      // No auth header, expecting error
      .send(newCoffee);

    expect(reponse.statusCode).toBe(401);
  });
});


// Recipe API
describe('Recipe API', () => {
  it('should create a new recipe entry and return the result', async () => {
    const recipe = {
      created_at: '2023-11-08T14:30:00Z',
      user_id: '',
      recipe_name: 'James Hoffman V60',
      dose_grams: 20,
      grind_size: '2.8.0',
      steps: [{ time: 30, description: "another hello" }],
      water_amount: 320
    }

    const response = await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${TEST_USER_TOKEN}`)
      .send(recipe)
    expect(response.status).toBe(201)
    expect(response.ok).toEqual(true)
    // expect(response.body.dose_grams).toBe(20)
  })

  it('should return a 401 error for invalid recipe data', async () => {
    const recipe = {
      created_at: '2023-11-08T14:30:00Z',
      user_id: '',
      recipe_name: 'James Hoffman V60',
      dose_grams: 20,
      grind_size: '2.8.0',
      steps: [{ time: 30, description: "another hello" }],
      water_amount: 320
    }

    const response = await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${TEST_USER_TOKEN}`)
      .send(recipe)
  })
})