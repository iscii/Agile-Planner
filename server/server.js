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
    secret: 'your_secret_key', // Replace with your own secret and move it to an environment variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto', httpOnly: true } // 'auto' uses secure cookies if the site is HTTPS
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).send('Unauthorized access');
    }
}

// Apply the authentication middleware to all routes except for login and createUser
app.use((req, res, next) => {
    if (req.path === '/login' || req.path === '/createUser') {
        return next();
    }
    isAuthenticated(req, res, next);
});

app.use(scenarioRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});