const Chat = require("../Model/chatModel");
const Group = require("../Model/groupModel");
const User = require("../Model/userModel");

exports.postChat = async (req, res) => {
  try {
    const { content, groupId } = req.body;

    let chat = await Chat.create({ content, userId: req.user.id, groupId });
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
    const { groupId } = req.params;

    const chats = await Chat.findAll({
      where: { groupId },
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
