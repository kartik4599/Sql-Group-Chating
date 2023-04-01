const Chat = require("../Model/chatModel");
const Group = require("../Model/groupModel");
const Group_User = require("../Model/Group_User");
const User = require("../Model/userModel");
const { Op } = require("sequelize");

exports.createGroup = async (req, res) => {
  try {
    const { name, users } = req.body;
    console.log(name, users, req.body);
    const jsonUser = JSON.parse(users);
    console.log(jsonUser);

    const group = await Group.create({
      name,
      admin: [req.user.id],
    });

    jsonUser.forEach((user) => {
      group.addUser(user);
    });

    res.json({ msg: "Success", group });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const result = await Group.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name"],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    console.log(req.user.id);
    const sortedArr = result.filter((e) => {
      let find = false;
      e.users.forEach((e) => {
        if (e.id === req.user.id) find = true;
        return;
      });
      return find;
    });

    res.json(sortedArr);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findByPk(groupId);

    if (!group["admin"].includes(parseInt(userId))) {
      group["admin"] = [parseInt(userId), ...group["admin"]];
      console.log(group["admin"]);
    }

    await group.save();

    res.json(group);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await Group.findByPk(groupId);

    if (group["admin"].includes(parseInt(userId))) {
      const newAdmin = group.admin.filter((e) => e !== parseInt(userId));
      group["admin"] = newAdmin;
    }

    await group.save();

    res.json(group);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    console.log(groupId, userId);
    const group = await Group_User.create({
      groupId,
      userId,
    });
    console.log(group);
    res.json(group);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const join = await Group_User.destroy({
      where: {
        [Op.and]: [
          {
            groupId,
          },
          {
            userId,
          },
        ],
      },
    });
    res.json({ msg: "Success", join });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "error occured" });
  }
};
