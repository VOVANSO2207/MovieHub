import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';

function Category({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editedCategory, setEditedCategory] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null); // Track index of category to delete

    // Fetch categories from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8081/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi lấy danh sách danh mục!', error);
            });
    }, []);

    // Add a new category
    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            axios.post('http://localhost:8081/categories', { name: newCategory })
                .then(response => {
                    setCategories([...categories, response.data]);
                    setNewCategory('');
                    setShowAddModal(false);
                })
                .catch(error => {
                    console.error('Có lỗi xảy ra khi thêm danh mục!', error);
                });
        }
    };

    const handleCategoryClick = (selectedCategory) => {
        onCategorySelect(selectedCategory);
    };

    // Delete a category
    const handleDeleteCategory = (index) => {
        const categoryId = categories[index].category_id;
        axios.delete(`http://localhost:8081/categories/${categoryId}`)
            .then(response => {
                // Update the categories locally
                const updatedCategories = [...categories];
                updatedCategories.splice(index, 1);
                setCategories(updatedCategories);
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi xóa danh mục!', error);
            });
    };

    // Edit a category
    const handleEditCategory = (index) => {
        setEditIndex(index);
        setEditedCategory(categories[index].name);
        setShowEditModal(true);
    };

    // Save edited category
    const handleSaveEditedCategory = () => {
        const categoryId = categories[editIndex].category_id;
        axios.put(`http://localhost:8081/categories/${categoryId}`, { name: editedCategory })
            .then(response => {
                const updatedCategories = [...categories];
                updatedCategories[editIndex].name = editedCategory;
                setCategories(updatedCategories);
                setEditIndex(null);
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Có lỗi xảy ra khi cập nhật danh mục!', error);
            });
    };

    return (
        <div className='px-3'>
            <h1 className='text-white'> Category List</h1>
            <table className="table caption-top bg-white rounded mt-5">
                <thead>
                    <tr className="table-category" style={{ background: 'red' }}>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{category.name}</td>
                            <td>
                            <button className="btn btn-warning" onClick={() => handleEditCategory(index)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteCategory(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <button className="btn btn-success" onClick={() => setShowAddModal(true)}>Add Category</button>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="modal-overlay2">
                    <div className="modal2">
                        <div className="modal-header2">
                        <h3 style={{color: 'white'}}>Add Category</h3>
                        <button className="button-close" onClick={() => setShowAddModal(false)}>Close</button>
                        </div>
                        <div className="modal-body2" style={{marginTop: '10px'}}>
                            <input
                                 style={{color: 'white'}}
                                 type="text"
                                 value={newCategory}
                                 onChange={(e) => setNewCategory(e.target.value)}
                                 placeholder="Enter new category"
                            />
                              <button className="btn btn-danger" onClick={handleAddCategory}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay2">
                    <div className="modal2">
                        <div className="modal-header2">
                            <h3>Xoá danh mục</h3>
                            <button onClick={() => setShowDeleteModal(false)}>Close</button>
                        </div>
                        <div className="modal-body">
                            <p>Bạn có chắc chắn muốn xoá danh mục này không?</p>
                            <button onClick={() => handleDeleteCategory(deleteIndex)}>Yes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay2">
                    <div className="modal2">
                        <div className="modal-header2">
                        <h3 style={{color: 'white'}}>Edit Category</h3>
                        <button className="button-close" onClick={() => setShowEditModal(false)}>Close</button>
                        </div>
                        <div className="modal-body2" style={{marginTop: '10px'}}>
                             <input style={{color: 'white'}}
                                type="text"
                                value={editedCategory}
                                onChange={(e) => setEditedCategory(e.target.value)}
                            />
                           <button className="btn btn-danger" onClick={handleSaveEditedCategory}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;
