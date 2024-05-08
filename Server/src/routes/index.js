const router = require('express').Router();
const login = require('../controllers/login');
const postFav = require('../controllers/fav/postFav');
const getCharById = require('../controllers/getCharById');
const postUser = require('../controllers/postUser');
const removeFav = require('../controllers/fav/removeFav');

router.get('/character/:id', getCharById);
router.get('/login', login);
router.post('/fav', postFav);
router.post('/reg', postUser);
router.delete('/fav', removeFav);
// router.delete("/fav/:id", deleteFav);
module.exports = router;
