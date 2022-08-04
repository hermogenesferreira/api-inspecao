import Cabecalho from '../models/Cabecalho';
import Estabelecimento from '../models/Estabelecimento';
import Insp from '../models/Insp';
import Pergunta from '../models/Pergunta';
import Resposta from '../models/Resposta';
import Roteiro from '../models/Roteiro';
import User from '../models/User';

class InspecaoController {
  async index(req, res) {
    try {
      const inspecoes = await Insp.findAll({
        include: [
          {
            model: Estabelecimento,
          },
          {
            model: User,
          },
        ],
      });
      return res.json(inspecoes);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const inspecao = await Insp.findByPk(id, {
        include: [
          {
            model: Estabelecimento,
          },
          {
            model: User,
          },
          {
            model: Roteiro,
          },
          {
            model: Resposta,
            include: {
              model: Pergunta,
              include: {
                model: Cabecalho,
              },
            },
          },
        ],
        order: [
          [Resposta, 'name', 'ASC'],
          [Resposta, Pergunta, 'name', 'ASC'],
        ],
      });
      return res.status(201).json(inspecao);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const inspecao = req.body;
      await Insp.create(req.body, {
        include: [
          {
            association: Resposta.Insp,
          },
        ],
      });
      res.status(201).json(inspecao);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const inspecao = await Insp.findByPk(id);
      await inspecao.update({ name }, { where: { id: id } });
      res.status(200).json({ message: `User successfully updated.` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Insp.destroy({ where: { id: id } });
      return res.json({ message: `Inspeção successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new InspecaoController();
