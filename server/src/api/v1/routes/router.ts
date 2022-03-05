import { Request, Response, Router } from "express";
import { returnCommission } from '../controllers/commissionController'
const router: Router = Router();

// For a good practice, should use a validation middleware to verify the correct body
router.post('/v1/commission', returnCommission)

// handle 404
router.all('*', function (req:Request, res: Response) {
  res.status(404).send('not found')
})

export = router
