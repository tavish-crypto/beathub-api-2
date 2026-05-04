const app = require("./app");
require("dotenv").config();
const { connectToDB } = require("../db/db");
const authRoutes = require('./routes/auth.route');
const analyticsRoutes = require('./routes/analytics');
const songRoutes = require('./routes/song.route');


// const app = express();
// app.use(express.json());
app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', songRoutes);
const PORT = process.env.PORT || 5000;

async function start() {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });

start();
