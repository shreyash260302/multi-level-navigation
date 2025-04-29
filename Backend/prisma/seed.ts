import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Installation category
  const installationCategory = await prisma.category.create({
    data: {
      name: 'Installation',
      subcategories: {
        create: [
          {
            name: 'Electrical and appliances',
            products: {
              create: [
                { 
                  name: 'Fan',
                  price: 100,
                  productAttributes: { Type: 'Ceiling Fan', Color: 'White' },
                  productDetails: { create: [{ detailName: 'Type', detailValue: 'Ceiling Fan' }] }
                },
                { 
                  name: 'Fridge',
                  price: 250,
                  productAttributes: { Capacity: '300L', EnergyRating: 'A++' },
                  productDetails: { create: [{ detailName: 'Capacity', detailValue: '300L' }] }
                },
                { 
                  name: 'Microwave',
                  price: 120,
                  productAttributes: { Power: '800W', Color: 'Silver' },
                  productDetails: { create: [{ detailName: 'Power', detailValue: '800W' }] }
                },
              ],
            },
          },
          { name: 'Furniture' },
          { name: 'Water purifier' },
        ],
      },
    },
  });

  // Seed Home Measurement category
  const homeMeasurementCategory = await prisma.category.create({
    data: {
      name: 'Home Measurement',
      subcategories: {
        create: [
          {
            name: 'Living Room',
            products: {
              create: [
                { 
                  name: 'Wall Mount',
                  price: 50,
                  productAttributes: { Material: 'Steel', MaxWeight: '50kg' },
                  productDetails: { create: [{ detailName: 'Material', detailValue: 'Steel' }] }
                },
                { 
                  name: 'TV Setup',
                  price: 100,
                  productAttributes: { ScreenSize: '55 inches', Installation: 'Free' },
                  productDetails: { create: [{ detailName: 'Screen Size', detailValue: '55 inches' }] }
                },
              ],
            },
          },
          {
            name: 'Kitchen',
            products: {
              create: [
                { 
                  name: 'Sink fitting',
                  price: 30,
                  productAttributes: { Material: 'Stainless Steel', Warranty: '5 years' },
                  productDetails: { create: [{ detailName: 'Material', detailValue: 'Stainless Steel' }] }
                },
                { 
                  name: 'Chimney mount',
                  price: 150,
                  productAttributes: { Size: '60cm', Material: 'Aluminium' },
                  productDetails: { create: [{ detailName: 'Size', detailValue: '60cm' }] }
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Seed Demo category
  const demoCategory = await prisma.category.create({
    data: {
      name: 'Demo',
      subcategories: {
        create: [
          { name: 'Product Demo' },
          { name: 'Virtual Demo' },
          { name: 'On-site Visit' },
        ],
      },
    },
  });

  // Seed In Warranty Support category
  const inWarrantyCategory = await prisma.category.create({
    data: {
      name: 'In Warranty Support',
      subcategories: {
        create: [
          {
            name: 'AC',
            products: {
              create: [
                { 
                  name: 'AC',
                  price: 300,
                  productAttributes: { WarrantyStatus: 'Active', CoolingPower: '1.5 Ton' },
                  productDetails: { create: [{ detailName: 'Warranty Status', detailValue: 'Active' }] }
                },
              ],
            },
          },
          { name: 'Microwave' },
          { name: 'Water Purifier' },
        ],
      },
    },
  });

  // Seed Out of Warranty Support category
  const outOfWarrantyCategory = await prisma.category.create({
    data: {
      name: 'Out of Warranty Support Assembly',
      subcategories: {
        create: [
          { name: 'Fan' },
          { name: 'Fridge' },
          { name: 'Switch and Socket' },
        ],
      },
    },
  });

  console.log('Categories, Subcategories, and Products have been seeded');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
