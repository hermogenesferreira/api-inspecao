import User from '../models/User';

import { createPasswordHash } from '../services/auth';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const { name, password, email } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists!` });
      }
      const encryptedPassword = await createPasswordHash(password);
      const newUser = await User.create({
        name,
        email,
        password: encryptedPassword,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, password } = req.body;
      const user = await User.findByPk(id);
      await user.update({ name, password }, { where: { id: id } });
      res.status(200).json({ message: `User successfully updated.` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id: id } });
      return res.json({ message: `User successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new UserController();
