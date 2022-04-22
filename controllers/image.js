const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

// -- To Get Model IDs --
// const Clarifai = require('clarifai');
// console.log(Clarifai);

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set('authorization', `Key ${process.env.CLARIFAI_API}`);

const handleApiCall = (req, res) => {
  if (req.body.model === 'facedetection') {
    stub.PostModelOutputs(
      {
        model_id: 'a403429f2ddf4b49b307e318f00e528b',
        inputs: [{ data: { image: { url: req.body.input } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          console.log('Error: ' + err);
          return;
        }

        if (response.status.code !== 10000) {
          console.log(
            'Received failed status: ' +
              response.status.description +
              '\n' +
              response.status.details
          );
          return;
        }
        res.json(response);
      }
    );
  } else {
    stub.PostModelOutputs(
      {
        model_id: 'aaa03c23b3724a16a56b629203edc62c',
        inputs: [{ data: { image: { url: req.body.input } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          console.log('Error: ' + err);
          return;
        }

        if (response.status.code !== 10000) {
          console.log(
            'Received failed status: ' +
              response.status.description +
              '\n' +
              response.status.details
          );
          return;
        }
        res.json(response);
      }
    );
  }
};

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err =>
      res.status(400).json('Could not find user with such credentials')
    );
};

module.exports = {
  handleImage,
  handleApiCall,
};
