const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finding all tags
  // be sure to include its associated Product data
  
  try {
  const tagData = await Tag.findAll({
    include:{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
  res.status(200).json(tagData);
}
catch(err){
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // finding a single tag by its `id`
  // be sure to include its associated Product data
  try {
  const tagData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  if(!tagData) {
    res.status(404).json({ message: 'No item found!' });
  }
  res.status(200).json(tagData);
}
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creating a new tag
  try {
  const tagData = await Tag.create([
{
    tag_name: req.body.tag_name,
}
  ])
  res.status(200).json(tagData);
}
 catch(err) {
  res.status(400).json({ message: 'No item found!' });
 }
});

router.put('/:id', async (req, res) => {
  // updating a tag's name by its `id` value
  try {
  const tagData = await Tag.update(req.body, {
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    },
  }
)
  if(!tagData) {
    res.status(400).json({ message: 'No item found!' });
  }
  res.status(200).json(tagData);
}
catch(err) {
  res.json(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // deleting a tag by its `id` value
  try {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  if(!tagData) {
    res.status(400).json({ messsage: 'No item found!' });
  }
  res.status(200).json(tagData);
}
catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
