import mongoose from "mongoose";
 const mongodb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogapp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export default mongodb;


