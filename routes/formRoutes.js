import { Router } from 'express';

const router = Router();




router.post('/submit', (req, res) => {
  const { fullName = '', age = '', date = '', truthValue = '' } = req.body ?? {};
console.log('Received form data:');
  console.log({ fullName, age, date, truthValue });
  res.status(200).json({
  });
});

export default router;
