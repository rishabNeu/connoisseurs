const express = require('express');
const router = express.Router();
const passport = require('passport');

const Notification = require('../../models/Notification');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.find({userID: req.user.id, read: false })
        .countDocuments()
        .then(count => {
            Notification.find({userID: req.user.id})
                .sort('-date')
                .then(notification => {
                    res.json({
                        notification: notification,
                        unread: count
                    });
                })
                .catch(err =>
                    res.status(500).json({error: "Error in GET api " + err})
                );
        });
});


module.exports = router;


router.put('/check', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.updateMany({userID: req.user.id, read: false }, {read: true})
        .catch(err =>
            res.status(500).json({error: "Error in check " + err})
        );
});


router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Notification.findById(req.params.id)
        .then(notification => {
            if(!notification){
                return res.status(404).json({error: 'Notification not found'});
            }
            notification.remove().then(() => res.json({success: true}));
        })
        .catch(err =>
            res.status(500).json({error: "Error while deleting. " + err})
        );
});

module.exports = router;