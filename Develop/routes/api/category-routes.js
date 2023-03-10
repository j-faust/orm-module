const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  async (req, res) => {
  // find all categories and return any erros
 try {
 const userData =  await Category.findAll({
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
  // find one category by its `id` value and also returning any errors
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
  // create a new category and return any errors
  try {
  const userData =  await Category.create(
    {
      category_name: req.body.category_name
    }
  )
  res.status(200).json(userData);
}
  catch(err) {
    res.status(400).json();  
  }
});
 

router.put('/:id', async (req, res) => {
  // updated categories by its `id` value and return any errors
  try {
  const userData = await Category.update(
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

router.delete('/:id',  (req, res) => {
  // to delete a category by its `id` value and return errors
  try {
  const userData =  Category.destroy({
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
