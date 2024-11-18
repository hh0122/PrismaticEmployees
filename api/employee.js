const express = require("express");
const router = express.Router();

const prisma = require("../prisma/seed")

router.get("/", async (req, res, next) => {
  try {
    const employees = await prisma.book.findManny();
    res.json(employees);
  }catch (e) {
    next(e);
  }
});

router.get("/:")