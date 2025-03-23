const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('shops/index.ejs', {
            shops: currentUser.shops,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('shops/new.ejs');
});

router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.shops.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/shops`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

router.get('/:shopId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const shop = currentUser.shops.id(req.params.shopId);
        res.render('shops/show.ejs', {
            shop: shop,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
router.delete('shopId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.shops.id(req.params.shopId).deleteOne();
        await currentUser.save();
        res.redirect(`users/${currentUser._id}/shops`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;