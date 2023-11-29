const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//Below: Similar to product routes where we can fetch data for one tag or all. Tag can be updated, deleted, or created. 
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'Tag_product' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'Tag_product' }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Id of the category you requested does not exist.' });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!tagData) {
      res.status(404).json({ message: 'Id of the category you requested does not exist.' });
      return;
    }
    res.status(200).json({ status: "completed", tagData });
  } catch (err) {
    res.status(500).json({ status: "incomplete", tagData: err.message });
  }
});

module.exports = router;
