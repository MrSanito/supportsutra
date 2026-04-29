require('dotenv').config({ path: '../../.env' });
const { prisma } = require('./dist/index.js');
prisma.doctorProfile.updateMany({data: {isVerified: true}})
  .then(console.log)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
