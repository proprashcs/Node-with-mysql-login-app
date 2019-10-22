const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController = require('../controllers/home.controller');
const ContentPartnerController = require('../controllers/contentpartner.controller');
const AlbumController = require('../controllers/album.controller')

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "Parcel Pending API", data: { "version_number": "v1.0.0" } })
});


router.post('/users', UserController.create);                                                    // C
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);        // R
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update);     // U
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove);     // D
router.post('/users/login', UserController.login);

router.post('/companies', passport.authenticate('jwt', { session: false }), CompanyController.create);                  // C
router.get('/companies', passport.authenticate('jwt', { session: false }), CompanyController.getAll);                  // R

router.get('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.get);     // R
router.put('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.update);  // U
router.delete('/companies/:company_id', passport.authenticate('jwt', { session: false }), custom.company, CompanyController.remove);  // D

router.post('/albums', passport.authenticate('jwt', { session: false }), AlbumController.create);                  // C
router.get('/albums', passport.authenticate('jwt', { session: false }), AlbumController.getAll);                  // R
router.get('/albums/:album_id', passport.authenticate('jwt', { session: false }), AlbumController.get);     // R
router.put('/albums/:album_id', passport.authenticate('jwt', { session: false }), AlbumController.update);  // U
router.delete('/albums/:album_id', passport.authenticate('jwt', { session: false }), AlbumController.remove);  // D

router.get('/dash', passport.authenticate('jwt', { session: false }), HomeController.Dashboard);
router.get('/contentpartner', passport.authenticate('jwt', { session: false }), ContentPartnerController.getAll);
router.delete('/contentpartner/:id', passport.authenticate('jwt', { session: false }), custom.CP, ContentPartnerController.remove);  // D


//********* API DOCUMENTATION **********
router.use('/docs/api.json', express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs', express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
