const { Category } = require('../database/models');

const check = async (dados) => {
  await Promise.all(dados.map(async (id) => {
    const checkId = await Category.findOne({ where: { id } });
    if (!checkId) throw new Error('400|"categoryIds" not found');
  }));
};

module.exports = check;
