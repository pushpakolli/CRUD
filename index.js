const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create a model
const User = mongoose.model('User', userSchema);

// Function to perform CRUD operations
const performCRUD = async () => {
  try {
    // Create
    await User.create({ name: "Alice", email: "alice@example.com", age: 25 });
    await User.insertMany([
      { name: "Bob", email: "bob@example.com", age: 30 },
      { name: "Charlie", email: "charlie@example.com", age: 35 }
    ]);
    console.log('Users created');

    // Read
    const allUsers = await User.find();
    console.log('All Users:', allUsers);

    const usersOver25 = await User.find({ age: { $gt: 25 } });
    console.log('Users Over 25:', usersOver25);

    // Update
    await User.updateOne({ name: "Alice" }, { $set: { age: 26 } });
    console.log('User updated');

    // Delete
    await User.deleteOne({ name: "Alice" });
    console.log('User deleted');
  } catch (error) {
    console.error('Error performing CRUD operations:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Execute the function
performCRUD();