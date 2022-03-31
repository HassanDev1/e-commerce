import bcyrpt from 'bcryptjs';
export const data = {
  users: [
    {
      name: 'John',
      email: 'John@shop.com',
      password: bcyrpt.hashSync('John123'),
      isAdmin: true,
    },
    {
      name: 'Matt',
      email: 'Matt@gmail.com',
      password: bcyrpt.hashSync('Matt123'),
      isAdmin: false,
    },
  ],
  products: [
    {
      isNew: true,
      name: 'Fit t-shirt',
      slug: 'fit-t-shirt',
      category: 't-shirts',
      image: '/images/t-shirt1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description: 'A T-Shirt for all your needs.',
    },
    {
      isNew: true,
      name: 'Turtle neck',
      slug: 'turtle neck',
      category: 't-shirts',
      image: '/images/t-shirt2.jpg',
      price: 120,
      brand: 'Puma',
      rating: 4.8,
      numReview: 50,
      countInStock: 80,
      description: 'Classic turtle neck.',
    },
    {
      isNew: false,
      name: 'Chill t-shirt',
      slug: 'chill-t-shirt',
      category: 't-shirts',
      image: '/images/t-shirt3.jpg',
      price: 70,
      brand: 'Nike',
      rating: 3.5,
      numReview: 90,
      countInStock: 20,
      description: 'T-Shirt to just hang out in.',
    },
    {
      isNew: false,
      name: "Lady's Polo t-shirt",
      slug: "lady's-polo-t-shirt",
      category: 't-shirts',
      image: '/images/t-shirt4.jpg',
      price: 90,
      brand: 'Polo',
      rating: 4.0,
      numReview: 100,
      countInStock: 20,
      description: 'Shirts fit for a lady.',
    },
    {
      isNew: false,
      name: 'Polo collar t-shirt',
      slug: 'polo-collar-t-shirt',
      category: 'Shirts',
      image: '/images/t-shirt5.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description: 'Classic Polo.',
    },
    {
      isNew: true,
      name: "Nautica Men's",
      slug: "nautica-men's",
      category: 'Pants',
      image: '/images/pant1.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description: 'A popular T shirt',
    },
    {
      isNew: true,
      name: 'Jogging pants',
      slug: 'jogging-pants',
      category: 'Pants',
      image: '/images/pant2.jpg',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description: 'comfortable jogging pants',
    },
    {
      isNew: false,
      name: 'Gymshack',
      slug: 'gymshack',
      category: 'Pants',
      image: '/images/pant3.jpg',
      price: 150,
      brand: 'Nike',
      rating: 4.5,
      numReview: 60,
      countInStock: 40,
      description: 'Pants for the gym.',
    },
    {
      isNew: false,
      name: "Lululemon Men's yoga",
      slug: "lululemon-men's-yoga",
      category: 'Pants',
      image: '/images/pant4.jpg',
      price: 85,
      brand: 'Nike',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description: 'mens yoga pants.',
    },
    {
      isNew: false,
      name: 'Sweat pants',
      slug: 'sweat-pants',
      category: 'Pants',
      image: '/images/pant5.jpg',
      price: 90,
      brand: 'Nike',
      rating: 4.5,
      numReview: 10,
      countInStock: 20,
      description: 'Sweat pants for the modern man.',
    },
  ],
};
export default data;
