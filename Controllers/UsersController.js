const Users = require('../Models/Users');
const Booking = require('../Models/Bookings'); 
const Event = require('../Models/Events');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateOTP = require('../utils/generateOTP');
const sendOTPEmail = require('../utils/nodemailer');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};



// Update an existing user
exports.updateUserById = async (req, res) => {
    try {
      const allowedFields = ["role"];
      const requestedFields = Object.keys(req.body);
  
      const isOnlyRoleBeingUpdated = requestedFields.every(field => allowedFields.includes(field));
  
      if (!isOnlyRoleBeingUpdated) {
        return res.status(400).json({
          message: "Only the 'role' field can be updated using this route.",
        });
      }
  
      const user = await Users.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  

      const filteredUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        role: user.role,
        profilePicture: user.profilePicture,
      };
  
      return res.status(200).json({ user: filteredUser ,msg: "User updated successfully"})
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
// exports.getCurrentUser = async (req, res) => {
//   res.send(req.user);
// };
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const filteredUser = {
            _id: user._id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            age: user.age
        };

        res.status(200).json(filteredUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching current user', error });
    }
};


// Controllers/userController.js
exports.updateUser = async (req, res) => {
    try {
      const user = await Users.findByIdAndUpdate(
        req.user._id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          age: req.body.age,
          profilePicture: req.body.profilePicture,
        },
        { new: true, runValidators: true } // Ensure validators run
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const filteredUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        role: user.role,
        profilePicture: user.profilePicture,
      };
  
      return res.status(200).json({ user: filteredUser });
    } catch (error) {
      // Handle duplicate email error
      if (error.code === 11000 && error.keyValue?.email) {
        return res.status(400).json({ message: "Email is already in use" });
      }
  
      return res.status(500).json({ message: error.message });
    }
  };
  
  
// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, role } = req.body;

        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 16);

        // Create a new user
        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            age,
            role,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};


// Forget password
// exports.forgetPassword = async (req, res) => {
//     try {
//         const { email, age, newPassword } = req.body;

//         // Find the user by email
//         const user = await Users.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Verify the age
//         if (user.age !== age) {
//             return res.status(400).json({ message: 'Incorrect age provided' });
//         }

//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(newPassword, 10);

//         // Update the user's password
//         user.password = hashedPassword;
//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error resetting password', error });
//     }
// };


exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const { otp, expires } = generateOTP();
        
        // Save OTP and expiration time to the user document
        user.otp = otp;
        user.otpExpires = expires;
        await user.save();

        // Send OTP to user's email
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error generating OTP', error });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Find the user by email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the OTP matches and is not expired
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Hash the new password and update it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear OTP and expiration time fields
        user.otp = undefined;
        user.otpExpires = undefined;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
};





exports.getCurrentUserBookings = async (req, res) => {
    try {
        console.log("Current User:", req.user); // Check this in your terminal

        const bookings = await Booking.find({ user: req.user._id })
            .populate('event')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Booking fetch error:", error); // Log the actual error
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
}; 

exports.getCurrentUserEvents = async (req, res) => {
    try {
        const userId = req.user._id; // Logged-in user's ID

        const events = await Event.find({ organizer: userId }).sort({ createdAt: -1 });

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching user's events:", error);
        res.status(500).json({ message: "Error fetching user's events", error });
    }
};

exports.getEventAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch events created by this organizer
        const events = await Event.find({ organizer: userId });

        // Calculate analytics
        const analytics = events.map(event => {
            const ticketsSold = event.totalTickets - event.remainingTickets;
            const percentageBooked = ((ticketsSold / event.totalTickets) * 100).toFixed(2);

            return {
                eventId: event._id,
                title: event.title,
                percentageBooked: Number(percentageBooked),
                ticketsSold,
                totalTickets: event.totalTickets,
                date: event.date,
            };
        });

        res.status(200).json(analytics);
    } catch (error) {
        console.error("Error generating event analytics:", error);
        res.status(500).json({ message: "Failed to generate event analytics", error });
    }
};