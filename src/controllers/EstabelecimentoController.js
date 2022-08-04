import Estabelecimento from '../models/Estabelecimento';
import Insp from '../models/Insp';

class EstabelecimentoController {
  async index(req, res) {
    try {
      const estabelecimentos = await Estabelecimento.findAll({ include: Insp });
      return res.json(estabelecimentos);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const estabelecimento = await Estabelecimento.findByPk(id);
      return res.json(estabelecimento);
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const estabelecimento = req.body;
      await Estabelecimento.create(req.body);
      res.status(201).json(estabelecimento);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        razaoSocial,
        nomeFantasia,
        cnpj,
        inscricaoEstadual,
        cnae,
        telefone,
        rua,
        bairro,
        cidade,
        uf,
        email,
        alvaraLocalizacao,
        alvaraSanitario,
        funcionarios,
        cpfResponsavel,
      } = req.body;
      const estabelecimento = await Estabelecimento.findByPk(id);
      await estabelecimento.update(
        {
          razaoSocial,
          nomeFantasia,
          cnpj,
          inscricaoEstadual,
          cnae,
          telefone,
          rua,
          bairro,
          cidade,
          uf,
          email,
          alvaraLocalizacao,
          alvaraSanitario,
          funcionarios,
          cpfResponsavel,
        },
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
      await Estabelecimento.destroy({ where: { id: id } });
      return res.json({ message: `User successfully deleted.` });
    } catch (err) {
      return res.json(500).json({ messagem: 'Internal server error.' });
    }
  }
}

export default new EstabelecimentoController();
