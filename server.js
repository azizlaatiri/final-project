const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 6020;

app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/carsito', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rentperdays: {
    type: Number,
  },
  fueltype: {
    type: String,
  },
  capacity: {
    type: String,
  },
  bookedtimeslots: {
    type: String,
  },
  
});

const Car = mongoose.model('Car', carSchema);


app.get('/api/cars', async (req, res) => {
    try {
      const allCars = await Car.find();
  
      if (!allCars || allCars.length === 0) {
        return res.status(404).json({ message: 'No cars found' });
      }
  
      const carDetails = allCars.map(car => ({
        _id: car._id,
        name: car.name,
        image: car.image,
        rentperdays: car.rentperdays,
        fueltype: car.fueltype,
        bookedtimeslots:car.bookedtimeslots

      }));
  
      res.json(carDetails);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
  });
  

app.post('/api/cars', async (req, res) => {
  try {
    const { name, image, rentperdays, fueltype, bookedtimeslots } = req.body;

    const newCar = new Car({
      name,
      image,
      rentperdays,
      fueltype,
      capacity,
      bookedtimeslots,
    });

    await newCar.save();

    res.status(201).json({ message: 'Car created successfully', car: newCar });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});
app.put('/api/cars/:id', async (req, res) => {
  try {
    const { name, image, rentperdays, fueltype, bookedtimeslots } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { name, image, rentperdays, fueltype, bookedtimeslots },
      { new: true } 
    );

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', UserSchema);

app.post('/api/users/registe', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Choose a different username.' });
    }

    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating User:', error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
      await user.save();
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cars',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assuming you have a User schema
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  DriverRequired: {
    type: Boolean,
    default: false,
  },
  transactionId: {
    type: String,
  },
},
{ timestamps: true });

const booking = mongoose.model('Booking', bookingSchema);


app.post('/api/bookings', async (req, res) => {
  req.body.transactionId = '1234'; 

  try {
    const newbooking = new booking(req.body);
    await newbooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newbooking });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `Booking creation failed: ${error.message}` });
  }
});
app.listen(port, () => console.log(`App is listening on port ${port}`));
