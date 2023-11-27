import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { config } from 'dotenv';
import scenarioRoutes from './routes/scenario.js'; 

const app = express();
config({ path: './config.env' });

const port = process.env.PORT || 3000;

// Session configuration
app.use(session({
    secret: '545-gang', // Replace with your own secret and move it to an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto', httpOnly: true } // 'auto' uses secure cookies if the site is HTTPS
}));

const corsOptions = {
    origin: 'http://localhost:3001', // Your client's URL
    credentials: true, // To allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any other methods needed
    allowedHeaders: ['Content-Type', 'Authorization'] // Add any other headers needed
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to protect routes
function isAuthenticated(req, res, next) {

    if (req.session && req.session.userId) {
        console.log(req.session.userId)
        return next();
    } else {
        res.status(401).send('isAuthenticated fired');
    }
}

// Apply the authentication middleware to all routes except for login and createUser
app.use((req, res, next) => {
    if (req.path === '/login' || req.path === '/createUser') {
        return next();
    }
    isAuthenticated(req, res, next);
});

// Add this endpoint in your Express app
app.get('/get-user-id', (req, res) => {
    if (req.session.userId) {
        res.json({ userId: req.session.userId });
    } else {
        res.status(401).json({ message: 'No user logged in' });
    }
});


app.use(scenarioRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});