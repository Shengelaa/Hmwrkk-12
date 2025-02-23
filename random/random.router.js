import { Router } from "express";
import { flipCoinRequest } from "../middleware/random.middleware.js";
const useRandom = Router();

export default useRandom.get("/", flipCoinRequest, (req, res) => {
  res.status(200).json({ message: "Coin flipped Succesfully " });
});
