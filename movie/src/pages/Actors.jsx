import React, { useState , useEffect } from 'react';
import axios from 'axios';

function Actor() {
  const [actors, setActors] = useState([]);
  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState(null);
  const [error, setError] = useState(null);
  const [editingActor, setEditingActor] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/actors')
        .then(response => {
            setActors(response.data);
        })
        .catch(error => {
            console.error('Có lỗi xảy ra khi lấy danh sách danh mục!', error);
        });
  }, []);

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
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add actor');
    }
  };
  const handleDeleteActor = async (actorId) => {
    try {
      await axios.delete(`http://localhost:8081/actors/${actorId}`);
      // Sau khi xoá diễn viên thành công, cập nhật danh sách diễn viên
      const updatedActors = await axios.get('http://localhost:8081/actors');
      setActors(updatedActors.data);
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
  
      // Sau khi chỉnh sửa thành công, cập nhật danh sách diễn viên
      const updatedActors = await axios.get('http://localhost:8081/actors');
      setActors(updatedActors.data);
  
      alert('Actor updated successfully');
      setEditingActor(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update actor');
    }
  };
  

  return (
    <div>
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
        <button type="submit">Add Actor</button>
      </form>
      {editingActor && (
  <div className="modal2">
    <div className="modal-content2">
      <span className="close" onClick={() => setEditingActor(null)}>&times;</span>
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
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
)}    
      {error && <p>{error}</p>}
      <h1 className='text-white'>Existing Actors</h1>
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
                    {actors.map((actor, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{actor.name}</td>
                            <td><img src={`../assets/images/${actor.profile_img}`} alt={actor.name} style={{maxWidth: '100px'}}/></td>
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
   
    </div>
    
  );
}

export default Actor;