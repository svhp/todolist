const express = require('express');
const router = express.Router();

const { pokazZadania,
        zaktualizujZadanie,
        utworzZadanie,
        usunZadanie,
        getZadanie
} = require('../controllers/tasks');

router.route('/').get(pokazZadania).post(utworzZadanie);
router.route('/:id').delete(usunZadanie).patch(zaktualizujZadanie).get(getZadanie);
module.exports = router;
