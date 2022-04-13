const handleProfile = (req, res, knex) => {
  const { id } = req.params;
  knex
    .select('*')
    .from('users')
    .where({
      id,
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json('User not found'));
};

module.exports = {
  handleProfile,
};
