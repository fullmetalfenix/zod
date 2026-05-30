import { Router } from 'express';

const router = Router();




router.post('/', (req, res) => {
  const { fullName = '', age = '', date = '', truthValue = '' } = req.body ?? {};


  res.status(200).json({
    message: 'Form fields processed successfully',
    received: {
      fullName,
      age,
      date,
      truthValue,
    },
    normalized,
  });
});

export default router;
