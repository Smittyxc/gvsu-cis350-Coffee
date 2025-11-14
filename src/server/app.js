require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const createClient = require('@supabase/supabase-js').createClient;
const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const z = require('zod').z;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:5173'],
    methods: ['POST', 'GET', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json({
//         message: err.message,
//         error: req.app.get('env') === 'development' ? err : {}, // Only expose full error in dev
//         statusCode: err.status || 500
//   });
// });

// Data has to meet these requirements
const FormDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roaster: z.string().min(1, "Roaster is required"),
  process: z.string().min(1, "Process is required"),
  variety: z.string().min(1, "Variety is required"),
  origin: z.string().min(1, "Origin is required"),
  roastDate: z.string().datetime({ offset: true, message: "Invalid date format" }), // expects ISO 8601
  weight: z.coerce.number("Weight must be numeric")
});

// Connect user token to user ID
async function requireUser(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });

  req.user = data.user;
  next();
}

app.post("/api/coffee", requireUser, async (req, res) => { // POST addCoffee
  var parsed = FormDataSchema.safeParse(req.body);
  console.log(parsed);
  
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid data', details: parsed.error.flatten() });
  }

  try {
    const userId = req.user.id;

    const payload = { ...req.body, user_id: userId };

    const { data, error } = await supabaseAdmin.from('coffeeBag').insert(payload).select('*').single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(201).json({ ok: true, coffee: data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/recipes", requireUser, async (req, res) => { // new recipe
  try {
    const userId = req.user.id;

    const payload = { ...req.body, user_id: userId };

    const { data, error } = await supabaseAdmin.from('recipes').insert(payload).select('*').single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
})

app.get("/api/recipes", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from("recipes")
      .select("id, recipe_name")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // send array of recipes
    return res.json({ recipes: data });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/recipeFetch/:id", requireUser, async (req, res) => {
  try {
    const recipeId = req.params.id;

    const { data, error } = await supabaseAdmin
      .from("recipes")
      .select("*")
      .eq("id", recipeId)
      .maybeSingle();

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // send array of recipes
    return res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/coffee/:id", requireUser, async (req, res) => {
  try { 
    const { id } = req.params
    const userId = req.user.id
    const { data, error } = await supabaseAdmin
      .from('coffeeBag')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error("Supabase select error: ", error);
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Coffee bag not found or you do not have permission to view it.' });
      }
      return res.status(500).json({ error: 'Database error' });
    }

    if (!data) {
      return res.status(200).json({ error: "Coffee bag not found"})
    }
    return res.status(200).json({ coffee: data });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get("/api/getCoffees", requireUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const {data, error} = await supabaseAdmin.from("coffeeBag").select("*").eq("user_id", userId);

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    // send array of recipes
    return res.json({coffees: data});
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.put('/api/coffee/:id', requireUser, async (req, res) => {
  var parsed = FormDataSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log(parsed.error.flatten())
    return res.status(400).json({ error: 'Invalid data', details: parsed.error.flatten() })
  }
  try {
    const { id } = req.params
    const userId = req.user.id

    const coffeeData = parsed.data;

    const { data, error } = await supabaseAdmin
      .from('coffeeBag')
      .update(coffeeData)
      .eq('id', id)
      .eq('user_id', userId)
      .select('*')
      .single();
    if (error) {
      console.error('Supabase update error:', error);
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Coffee bag not found or permission denied' });
      }
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!data) {
         return res.status(404).json({ error: 'Coffee bag not found or permission denied' });
    }

    return res.status(200).json({ ok: true, coffee: data });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
  }
)

app.use(function(req, res, next) { // 404 catch all
  console.log("no endpoint");
  next(createError(404));
});

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
