const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(bodyParser.json());

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Prismatic Employees API.');
});

// Get all employees
app.get('/employees', async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

// Add a new employee
app.post('/employees', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  const newEmployee = await prisma.employee.create({
    data: { name },
  });
  res.status(201).json(newEmployee);
});

// Get an employee by ID
app.get('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(id) },
  });
  if (!employee) {
    return res.status(404).send('Employee not found');
  }
  res.json(employee);
});

// Update an employee by ID
app.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    return res.status(404).send('Employee not found');
  }
});

// Delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    return res.status(404).send('Employee not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
