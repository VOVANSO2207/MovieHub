import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Actor() {
  const [actors, setActors] = useState([]);
  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [error, setError] = useState(null);
  const [editingActor, setEditingActor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 5; // Number of actors to display per page

  useEffect(() => {
    fetchActors();
  }, [currentPage]);

  const fetchActors = async () => {
    try {
      const response = await axios.get('http://localhost:8081/actors');
      setActors(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách diễn viên!', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('profile_img', profileImg);

      await axios.post('http://localhost:8081/actors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Actor added successfully');
      setName('');
      setProfileImg(null);
      setShowAddModal(false); // Close the add modal
      fetchActors(); // Refresh actors list
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add actor');
    }
  };

  const handleDeleteActor = async (actorId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this actor?");
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/actors/${actorId}`);
      fetchActors(); // Refresh actors list
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to delete actor');
    }
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editingActor.name);
      if (editingActor.profileImg) {
        formData.append('profile_img', editingActor.profileImg);
      }

      await axios.put(`http://localhost:8081/actors/${editingActor.actor_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Actor updated successfully');
      setEditingActor(null);
      fetchActors(); // Refresh actors list
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update actor');
    }
  };

  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(actors.length / actorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {showAddModal && (
        <div className="modal2">
          <div className="modal-content2">
            <span style={{display: 'flex', justifyContent:'flex-end'}} className="close" onClick={() => setShowAddModal(false)}>&times;</span>
            <h2>Add New Actor</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="profileImg">Profile Image:</label>
                <input
                  type="file"
                  id="profileImg"
                  onChange={(e) => setProfileImg(e.target.files[0])}
                  accept="image/*"
                  required
                />
              </div>
              <button className="btn btn-success" type="submit" style={{marginTop: '10px'}}>Add Actor</button>
            </form>
          </div>
        </div>
      )}

      {editingActor && (
        <div className="modal2">
          <div className="modal-conten2">
            <span style={{display: 'flex', justifyContent:'flex-end'}} className="close" onClick={() => setEditingActor(null)}>&times;</span>
            <h2>Edit Actor</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div>
                <label htmlFor="editName">Name:</label>
                <input
                  type="text"
                  id="editName"
                  value={editingActor.name}
                  onChange={(e) => setEditingActor({ ...editingActor, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="editProfileImg">Profile Image:</label>
                <input
                  type="file"
                  id="editProfileImg"
                  onChange={(e) => setEditingActor({ ...editingActor, profileImg: e.target.files[0] })}
                  accept="image/*"
                />
              </div>
              <button className="btn btn-danger" type="submit" style={{marginTop: '10px'}}>Save</button>
            </form>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      <h1 className='text-white'>Actors List</h1>
      <table className="table caption-top bg-white rounded mt-5">
        <thead>
          <tr className="table-category" style={{ background: 'red' }}>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Img</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentActors.map((actor, index) => (
            <tr key={index}>
              <th scope="row">{indexOfFirstActor + index + 1}</th>
              <td>{actor.name}</td>
              <td><img src={`../assets/images/${actor.profile_img}`} alt={actor.name} style={{ maxWidth: '100px' }} /></td>
              <td>
                <button className="btn btn-warning" onClick={() => setEditingActor(actor)}>Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteActor(actor.actor_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination" style={{ justifyContent: 'flex-end' }}>
        <button className="btn btn-warning" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button className="btn btn-warning" onClick={handleNextPage} disabled={currentPage === Math.ceil(actors.length / actorsPerPage)}>Next</button>
      </div>
      <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Actor</button>
    </div>
  );
}

export default Actor;
