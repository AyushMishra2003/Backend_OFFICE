// addDummyData.js

import mongoose from 'mongoose';
import Products from './models/products.model.js'; // Adjust path as necessary

// MongoDB connection setup
async function connectDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/product', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Function to generate dummy product data
        const generateDummyProduct = () => {
            return {
                name: 'Dummy Product',
                tag: 'dummy',
                sku: 'SKU001',
                // Add more fields as needed
            };
        };

        // Function to add dummy product to database
        const addDummyProduct = async () => {
            const dummyProduct = generateDummyProduct();
            try {
                const product = await Products.create(dummyProduct);
                console.log('Dummy product added:', product);
            } catch (error) {
                console.error('Error adding dummy product:', error);
            }
        };

        // Add dummy data infinitely
        const addDummyDataInfinitely = async () => {
            while (true) {
                await addDummyProduct();
                await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay as needed
            }
        };

        // Start adding dummy data
        await addDummyDataInfinitely();

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        mongoose.disconnect();
    }
}

connectDb();



/*


async function addDummyData() {
    try {
        let counter = 0;
        const batchSize = 1000; // Larger batch size for better performance

        while (true) {
            const products = [];

            for (let i = 0; i < batchSize; i++) {
                const newProduct = {
                    name: `Product ${counter}`,
                    price: Math.floor(Math.random() * 1000) + 1,
                };
                products.push(newProduct);
                counter++;
            }

            // Insert batch of products into MongoDB
            await Product.insertMany(products);
            console.log(`Added ${batchSize} products`);

            // Adjust delay as needed to control the insertion rate
            await new Promise(resolve => setTimeout(resolve, 500)); // Insert every 500 milliseconds
        }
    } catch (error) {
        console.error('Error adding dummy data:', error);
    }
}

addDummyData();
*/