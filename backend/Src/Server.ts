import cors from 'cors'; // Allow requests from other origins
import express from 'express';
import ordersRoutes from './api/routes/orders';

const app = express();
const port = 5000; // Your backend port

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Import and use routes
app.use('/api/orders', ordersRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
