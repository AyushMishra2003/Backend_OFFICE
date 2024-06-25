import Products from "./models/products.model.js";

async function addDummyData() {
    try {
        let counter = 0;

        while (true) {
            // Generate dummy data
            const newProduct = new Products({
                name: `Product ${counter}`,
                // price: Math.floor(Math.random() * 1000) + 1, // Random price between 1 and 1000
            });

            // Save to MongoDB
            await newProduct.save();
            console.log(`Added product: ${newProduct.name}`);

            counter++;

            // Adjust delay as needed to control the insertion rate
            await new Promise(resolve => setTimeout(resolve, 1000)); // Insert every 1 second
        }
    } catch (error) {
        console.error('Error adding dummy data:', error);
    }
}

addDummyData();
