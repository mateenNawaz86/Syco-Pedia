import User from "../models/UserModel.js";

// Controlle for READ users detail
export const getUser = async (req, res) => {
  try {
    // getting user ID from requested PARAMS
    const { id } = req.params;

    // Find user with given ID
    const user = await User.findById(id);

    // Send response to the UI
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for access friends of specific user with ID
export const getUserFriends = async (req, res) => {
  try {
    // get ID from request
    const { id } = req.params;

    // Find user with getting ID
    const user = await User.findById(id);

    // Promise used for multiple API call for manage Friend list
    const friends = await Promise.all(
      // Grabe all the info from friend ID
      user.friends.map((id) => User.findById(id))
    );

    // Format the friend list On UI with their details
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return {
          _id,
          name,
          occupation,
          location,
          picturePath,
        };
      }
    );

    // Send RESPONSE to CLIENT
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Controller for UPDATE the User detail
export const getUpdateUser = async (req, res) => {
  try {
    // grabe the user ID & friendID from request
    const { id, friendId } = req.params;

    // Grabe the current requested user ID
    const user = await User.findById(id);

    // Grabe the current user FRIEND ID
    const friend = await User.findById(friendId);

    // Check IF FriendID include with logged in user ID
    if (user.friends.includes(friendId)) {
      // REMOVE Friend ID from user ID
      user.friends = user.friends.filter((id) => id !== friendId);

      // REMOVE selected FRIEND from logged In user
      friend.friends = friend.friends.filter((id) => id !== friendId);
    }

    // IF user NOT exist with the requested ID then add to user friend list
    else {
      // ADD requested Friend ID to Logged-IN user
      user.friends.push(friendId);

      // ADD new Friend to Logged-IN user
      friend.friends.push(friendId);
    }

    // save User after UPDATE
    await user.save();

    // Save UPDATED Friend List
    await friend.save();

    // Promise used for multiple API call for manage Friend list
    const friends = await Promise.all(
      // Grabe all the info from friend ID
      user.friends.map((id) => User.findById(id))
    );

    // Format the friend list On UI with their details
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath }) => {
        return {
          _id,
          name,
          occupation,
          location,
          picturePath,
        };
      }
    );

    // Send back Response to UI
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
