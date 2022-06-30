const {Customer} = require('../models/customers');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/register', async (req, res) => {
  let customer = new Customer.model({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const customer = await Customer.findById(id);
  if(!customer) return res.send('This customer does not exist.');

  customer.$set({
    name: req.body.name,
    isGold: req.body.isGold
  });

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const customer = Customer.findById(id);
  if(!customer) return res.send('This customer does not exit.');

  res.send(customer);
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const customer = await Customer.findById(id);
  if(!customer) return res.send('This customer does not exist.');

  const removedCustomer = Customer.findByIdAndRemove(id);
  res.send(removedCustomer);
});

module.exports = router;