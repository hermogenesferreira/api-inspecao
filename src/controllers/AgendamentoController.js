import Agendamento from '../models/Agendamento';
import Estabelecimento from '../models/Estabelecimento';
import User from '../models/User';

class AgendamentoController {
  async index(req, res) {
    try {
      const categoria = await Agendamento.findAll({
        include: [{ model: Estabelecimento }, { model: User }],
      });
      return res.json(categoria);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const agendamento = await Agendamento.findAll();
      return res.json(agendamento);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const agendamento = req.body;
      await Agendamento.create(req.body);
      res.status(201).json(agendamento);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { description, dataAgendamento, estabelecimentoId } = req.body;
      const agendamento = await Agendamento.findByPk(id);
      await agendamento.update(
        { description, dataAgendamento, estabelecimentoId },
        { where: { id: id } },
      );
      res.status(200).json({ message: `Agendamento successfully updated.` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await Agendamento.destroy({ where: { id: id } });
      return res.json({ message: `Agendamento successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new AgendamentoController();
