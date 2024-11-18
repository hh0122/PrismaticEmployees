const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma
const employees = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'David' },
  { name: 'Eve' },
  { name: 'Frank' },
  { name: 'Grace' },
  { name: 'Heidi' },
  { name: 'Ivan' },
  { name: 'Judy' },
];

async function main() {
  for (const employee of employees) {
    await prisma.employee.create({ data: employee });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);  // `process` should be lowercase
  });
