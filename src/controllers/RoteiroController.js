import Cabecalho from '../models/Cabecalho';
import Pergunta from '../models/Pergunta';
import Resposta from '../models/Resposta';
import Roteiro from '../models/Roteiro';

class RoteiroController {
  async index(req, res) {
    try {
      const roteiros = await Roteiro.findAll();
      return res.json(roteiros);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async showComRespostas(req, res) {
    try {
      const { id } = req.params;
      const roteiro = await Roteiro.findOne({
        include: Cabecalho,
        where: { id: id },
      });
      return res.json(roteiro);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const roteiro = await Roteiro.findByPk(id, {
        include: {
          model: Cabecalho,
          include: {
            model: Pergunta,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'cabecalhoId'],
            },
          },
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt', 'roteiroId'],
          },
        },
        //order: [[Cabecalho, Pergunta, 'name', 'ASC']],
        order: [
          [Cabecalho, 'name', 'ASC'],
          [Cabecalho, Pergunta, 'name', 'ASC'],
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'categoriaId'],
        },
      });
      return res.json(roteiro);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const roteiro = req.body;
      await Roteiro.create(req.body, {
        include: [
          {
            association: Cabecalho.Roteiro,
            include: [Cabecalho.Pergunta],
          },
        ],
      });
      res.status(201).json(roteiro);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const roteiro = await Roteiro.findByPk(id);
      await roteiro.update({ name }, { where: { id: id } });
      res.status(200).json({ message: `User successfully updated.` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Roteiro.destroy({ where: { id: id } });
      return res.json({ message: `User successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new RoteiroController();
