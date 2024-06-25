import mongoose from 'mongoose';

async function connectDb() {
    try {
        const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/your_database';

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process on connection failure
    }
}

export default connectDb;

// Usage example:
// Import this function in your main application file and call it to establish the MongoDB connection.
