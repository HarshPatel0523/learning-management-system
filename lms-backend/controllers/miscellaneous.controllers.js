import User from "../models/user.model.js";
import Message from "../models/message.model.js";

const contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        return res.status(200).json({ success: true, message: "Your message has been received." });
    } catch (error) {
        console.error("Error in contactUs controller:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
}

const userStats = async (req, res) => {
    try {
        const stats = {
            totalUsers: 0,
            activeUsers: 0,
            inactiveUsers: 0,
            newUsersToday: 0
        }
  
        totalUsers = await User.countDocuments();
        stats.totalUsers = totalUsers;

        stats.activeUsers = await User.countDocuments({ isActive: true });
        stats.inactiveUsers = await User.countDocuments({ isActive: false });

        stats.newUsersToday = await User.countDocuments({
            createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        });

        return res.status(200).json({ 
            success: true, 
            stats 
        });
    } catch (error) {
        console.error("Error in userStats controller:", error);
        return res.status(500).json({ error: "An error occurred while fetching user statistics." });
    }
}

export { contactUs, userStats };