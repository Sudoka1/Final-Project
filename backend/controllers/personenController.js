import Person from '../models/personModel.js';

const getPersonen = async (req, res, next) => {
  try {
    const allePersonen = await Person.find({});
    res.send(allePersonen);
  } catch (err) {
    next(err);
  }
};

const addPerson = async (req, res, next) => {
  try {
    const newPerson = req.body;
    const createdPerson = await Person.create(newPerson);
    res.status(201).send(createdPerson);
  } catch (err) {
    next(err);
  }
};

const loginWithEmail = async (req, res, next) => {
  try {
    const {email} = req.body;
    const user = await Person.findOne({email: email})
    if (!user) {
      const error = new Error('Es gibt keinen User mit der Email-Adresse');
      error.status = 401;
      throw error;
    }
    res.send({message: 'Login erfolgreich'});
  } catch (err) {
    next(err)
  }
}

export { getPersonen, addPerson, loginWithEmail };
