import Categoria from '../models/Categoria';
import Roteiro from '../models/Roteiro';
class CategoriaController {
  async index(req, res) {
    try {
      const categorias = await Categoria.findAll();
      return res.json(categorias);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const categoria = await Categoria.findAll({
        include: [{ model: Roteiro }],
      });
      return res.json(categoria);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const categoria = req.body;
      await Categoria.create(req.body);
      res.status(201).json(categoria);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const categoria = await Categoria.findByPk(id);
      await categoria.update({ name }, { where: { id: id } });
      res.status(200).json({ message: `User successfully updated.` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Categoria.destroy({ where: { id: id } });
      return res.json({ message: `User successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new CategoriaController();
