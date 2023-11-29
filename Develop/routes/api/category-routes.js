const router = require('express').Router();
const { Category, Product } = require('../../models');

// Below: category will have fetching data from the mysql database and also create, update, and delete a category. 
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!categoriesData) {
      res.status(404).json({ message: 'Id of the category you requested does not exist.' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!categoriesData) {
      res.status(404).json({ message: '' });
      return;
    }
    res.status(200).json({ status: "completed", categoriesData });
  } catch (err) {
    res.status(500).json({ status: "incomplete", categoriesData: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'Id of the category you requested does not exist.' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
