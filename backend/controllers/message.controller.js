import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const { to, text } = req.body;
    if (!to || !text || !text.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Recipient and text required" });
    }

    const msg = await Message.create({ from: fromUserId, to, text });
    res.status(201).json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { withUser } = req.params;
    const messages = await Message.find({
      $or: [
        { from: userId, to: withUser },
        { from: withUser, to: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("from", "name email")
      .populate("to", "name email");
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching conversation",
      error: error.message,
    });
  }
};

export const getInbox = async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await Message.find({
      $or: [{ to: userId }, { from: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("from", "name email")
      .populate("to", "name email");
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching inbox",
      error: error.message,
    });
  }
};
