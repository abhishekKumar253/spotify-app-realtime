import { User } from '../models/user.model.js';

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: id });

    if (!existingUser) {
      await User.create({
        clerkId: id,
        fullName: `${firstName || ''} ${lastName || ''}`.trim(),
        imageUrl
      });
    }

    res.status(200).json({
      success: true,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error in auth callback', error);
    next(error);
  }
};
