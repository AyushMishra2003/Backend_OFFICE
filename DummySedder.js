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
