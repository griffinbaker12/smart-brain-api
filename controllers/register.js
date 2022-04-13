const handleRegister = (req, res, knex, bcrypt) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json('Invalid form submission');
  }
  const hash = bcrypt.hashSync(password);
  knex
    .transaction(trx => {
      trx
        .insert({
          hash,
          email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0].email,
              name,
              joined: new Date(),
            })
            .then(user => res.json(user[0]));
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('Unable to register'));
};

module.exports = {
  handleRegister,
};
