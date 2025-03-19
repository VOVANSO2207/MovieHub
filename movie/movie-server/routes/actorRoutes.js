const express = require('express');
const router = express.Router();
const { uploadActors } = require('../middleware/upload');
const { getActors, getActorDetails, addNewActor, deleteActorById, updateActorDetails, addActorToMovieLink } = require('../controllers/actorController');

router.get('/', getActors);
router.get('/:id', getActorDetails);
router.post('/', uploadActors.fields([{ name: 'profile_img', maxCount: 1 }]), addNewActor);
router.delete('/:id', deleteActorById);
router.put('/:id', uploadActors.fields([{ name: 'profile_img', maxCount: 1 }]), updateActorDetails);
router.post('/addActorToMovie', addActorToMovieLink);

module.exports = router;