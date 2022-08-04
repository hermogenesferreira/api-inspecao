import Estabelecimento from '../models/Estabelecimento';
import Resposta from '../models/Resposta';
import Roteiro from '../models/Roteiro';

class RespostaController {
  async index(req, res) {
    try {
      const respostas = await Resposta.findAll();
      return res.json(respostas);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const resposta = await Resposta.findOne({
        include: [{ model: Estabelecimento }],
        where: { id: id },
      });
      return res.json(resposta);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const resposta = req.body;
      await Resposta.create(req.body);
      res.status(201).json(resposta);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { resposta1, resposta2, resposta3 } = req.body;
      const resposta = await Resposta.findByPk(id);
      await resposta.update(
        { resposta1, resposta2, resposta3 },
        { where: { id: id } },
      );
      res.status(200).json({ message: `User successfully updated.` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Resposta.destroy({ where: { id: id } });
      return res.json({ message: `User successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new RespostaController();
