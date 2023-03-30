const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");

exports.postChat = async (req, res) => {
  try {
    const { content } = req.body;

    let chat = await Chat.create({ content, userId: req.user.id });
    if (chat) {
      res.status(200).json({ msg: "Success", chat });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};

exports.getAllChat = async (req, res) => {
  try {
    const chats = await Chat.findAll({
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    if (chats) {
      res.status(200).json(chats);
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};
