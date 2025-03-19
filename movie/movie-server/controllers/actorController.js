const { getAllActors, getActorById, addActor, deleteActor, updateActor, addActorToMovie } = require('../models/actorModel');

const getActors = async (req, res) => {
  try {
    const actors = await getAllActors();
    res.json(actors);
  } catch (error) {
    res.status(500).send('Error fetching actors');
  }
};

const getActorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await getActorById(id);
    if (!actor) return res.status(404).send('Actor not found');
    res.json(actor);
  } catch (error) {
    res.status(500).send('Error fetching actor details');
  }
};

const addNewActor = async (req, res) => {
  try {
    const { name } = req.body;
    const profileImgFile = req.files['profile_img'] ? req.files['profile_img'][0] : null;
    if (!name || !profileImgFile) return res.status(400).send('Missing name or profile image');
    const profile_img = profileImgFile.filename;
    const result = await addActor([name, profile_img]);
    res.status(201).json({ actor_id: result.insertId, name, profile_img });
  } catch (error) {
    res.status(500).send('Error adding actor');
  }
};

const deleteActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteActor(id);
    if (result.affectedRows === 0) return res.status(404).send('Actor not found');
    res.status(200).send('Actor deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting actor');
  }
};

const updateActorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const profileImgFile = req.files['profile_img'] ? req.files['profile_img'][0] : null;
    const profile_img = profileImgFile ? profileImgFile.filename : null;
    await updateActor(id, [name, profile_img]);
    res.status(200).send('Actor updated successfully');
  } catch (error) {
    res.status(500).send('Error updating actor');
  }
};

const addActorToMovieLink = async (req, res) => {
  try {
    const { movieId, actorId } = req.body;
    if (!movieId || !actorId) return res.status(400).send('Missing movieId or actorId');
    await addActorToMovie(movieId, actorId);
    res.status(201).send('Actor added to movie successfully');
  } catch (error) {
    res.status(500).send('Error adding actor to movie');
  }
};

module.exports = { getActors, getActorDetails, addNewActor, deleteActorById, updateActorDetails, addActorToMovieLink };