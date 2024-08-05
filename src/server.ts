import express from 'express';
import purchaseRoutes from './routes/purchasesRoutes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.use(purchaseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});