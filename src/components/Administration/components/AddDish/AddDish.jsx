import React, { useEffect, useState } from 'react';
import './AddDish.scss';
import { getAllDishes } from '../../../../utils/fetch';

export const AddDish = () => {
  const [dishes, setDishes] = useState([]);
  const [editingDishId, setEditingDishId] = useState(null);
  const [formDish, setFormDish] = useState({
    dish_name: '',
    description: '',
    comment: '',
    ingredients: [],
    premixes: [],
    tags: [],
    category: '',
    price: 0,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDishes()
      .then((data) => {
        setDishes(data);
      })
      .catch((error) => console.error('Error fetching dishes:', error));
  }, []);

  const startEditing = (dish) => {
    setEditingDishId(dish.id);
    setFormDish({
      dish_name: dish.dish_name,
      description: dish.description,
      comment: dish.comments.map(comment => comment.comment).join(', '),
      ingredients: dish.dish_ingredients.map(ingredient => ({
        id: ingredient.ingredient_id,
        name: ingredient.ingredient.name,
        quantity: ingredient.quantity,
      })),
      premixes: dish.dish_premixes.map(premix => ({
        id: premix.premix_id,
        name: premix.premix.name,
        quantity: premix.quantity,
      })),
      tags: dish.tags.map(tag => tag.name_tag),
      category: dish.category_name,
      price: dish.price,
    });
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setEditingDishId(null);
    setFormDish({
      dish_name: '',
      description: '',
      comment: '',
      ingredients: [],
      premixes: [],
      tags: [],
      category: '',
      price: 0,
    });
    setIsAdding(true);
  };

  const stopEditing = () => {
    setEditingDishId(null);
    setFormDish({
      dish_name: '',
      description: '',
      comment: '',
      ingredients: [],
      premixes: [],
      tags: [],
      category: '',
      price: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDish((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editingDishId ? 'Updating dish' : 'Adding dish', formDish);
    // const apiCall = editingDishId ? patchDish({ ...formDish, id: editingDishId }) : addDish(formDish);
    // apiCall
    //   .then((data) => {
    //     if (editingDishId) {
    //       setDishes((prev) =>
    //         prev.map((dish) =>
    //           dish.id === editingDishId ? { ...dish, ...formDish } : dish
    //         )
    //       );
    //     } else {
    //       setDishes((prev) => [...prev, data]);
    //     }
    //     setSuccessMessage(`Dish ${editingDishId ? 'updated' : 'added'} successfully`);
    //     stopEditing();
    //   })
    //   .catch(() => {
    //     setErrorMessage(`Error ${editingDishId ? 'updating' : 'adding'} dish`);
    //   });
  };

  return (
    <div className="dish-list-container">
      <h2>Список страв</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="button" onClick={handleAddNew}>
        Додати нову страву
      </button>
      <table className="dish-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Ціна</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              {editingDishId === dish.id ? (
                <>
                  <td>{dish.id}</td>
                  <td>
                    <input
                      type="text"
                      name="dish_name"
                      value={formDish.dish_name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={formDish.description}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={formDish.price}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button className="button" onClick={handleSubmit}>
                      Зберегти
                    </button>
                    <button className="button" onClick={stopEditing}>
                      Скасувати
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{dish.id}</td>
                  <td>{dish.dish_name}</td>
                  <td>{dish.description}</td>
                  <td>{dish.price}</td>
                  <td>
                    <button className="button" onClick={() => startEditing(dish)}>
                      Редагувати
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isAdding && !editingDishId && (
        <form onSubmit={handleSubmit}>
          <h3>Додати нову страву</h3>
          <label>
            Назва:
            <input
              type="text"
              name="dish_name"
              value={formDish.dish_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Опис:
            <input
              type="text"
              name="description"
              value={formDish.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Ціна:
            <input
              type="number"
              name="price"
              value={formDish.price}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="button">Додати страву</button>
          <button type="button" className="button" onClick={stopEditing}>Скасувати</button>
        </form>
      )}
    </div>
  );
}
