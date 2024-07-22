import { Request, Response, Router } from 'express';

const router = Router();

// Mock data
const orders = [
  {
    id: 1,
    title: 'Excavator',
    category: 'Heavy Machinery',
    cost: '$1000',
    hirerInfo: 'John Doe',
    contact: '123-456-7890',
    location: 'New York',
    availability: 'Available',
    toolInfo: 'Heavy duty excavator',
    terms: 'Handle with care',
    equipment: 'Excavator',
    type: 'Rental'
  }
];

// Route to get orders
router.get('/', (req: Request, res: Response) => {
  res.json(orders);
});

export default router;
