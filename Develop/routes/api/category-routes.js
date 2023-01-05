const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated products
 try {
 const userData = await Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
  res.status(200).json(userData);
} catch(err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const userData = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  if(!userData) {
    res.status(404).json({ message: 'No item with this ID!'});
    return;
  }
  res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const userData = await Category.create([
    {
      category_name: req.body.category_name,
    }
  ]);
  res.status(200).json(userData);
}
  catch(err) {
    res.status(400).json(err);  
  }
});
 

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const userData = await Category.update(req.body,
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id:req.params.id,
      },
    });
    if(!userData[0]) {
      res.status(400).json({ message: 'No item found with that ID!' });
      return;
    }
    res.status(200).json(userData);
}
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const userData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if(!userData) {
    res.status(400).json({ message: 'No item found with that ID!' });
    return;
  }
  res.status(200).json(userData);
}
  catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;
