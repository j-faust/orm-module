const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // finding all tags and catching any errors
  try {
  const tagDataGet = await Tag.findAll({
    include:{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  })
  res.status(200).json(tagDataGet);
}
catch(err){
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // finding a single tag by its `id` and if any errors catching and returning
  try {
  const tagDataGetById = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  if(!tagDataGetById) {
    res.status(404).json({ message: 'No item found!' });
  }
  res.status(200).json(tagDataGetById);
}
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creating a new tags and return errors if any
  try {
  const tagDataCreate = await Tag.create(
{
    tag_name: req.body.tag_name,
}
  )
  if(!tagDataCreate) {
  res.status(404).json();
  }
  res.status(200).json(tagDataCreate);
}
 catch(err) {
  res.status(400).json({ message: 'No item found!' });
 }
});

router.put('/:id', async (req, res) => {
  // updating a tag's name by its `id` value and returning errors
  try {
  const tagDataUpdate = await Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    },
  }
)
  if(!tagDataUpdate) {
    res.status(400).json();
  }
  res.status(200).json(tagDataUpdate);
}
catch(err) {
  res.json(500).json(err);
}
});

router.delete('/:id', (req, res) => {
  // deleting a tag by its `id` value, return errors if any
  try {
  const tagDataDelete = Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  if(!tagDataDelete) {
    res.status(400).json({ messsage: 'No item found!' });
  }
  res.status(200).json(tagDataDelete);
}
catch(err) {
  res.status(500).json(err);
}
});

module.exports = router;
