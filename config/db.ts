import mongoose from 'mongoose';

const URI = process.env.URI_DB || 'mongodb://127.0.0.1:27017/TodoList';

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
  } catch (error) {
    console.log('err', error);
    process.exit(1);
  }
};

export default connectDB;
