import React, { useEffect, useMemo, useState } from 'react';
import { createPremix, getAllIngredients } from '../../../../../../utils/fetch';
import SearchSelect from '../../../../../utils/SearchSelect/SearchSelect';
import { convertToOptionsSelect, filteredItems } from '../../../../../utils/SearchSelect/SearchUtils';
import './AddPremix.scss';
import { Loaderr } from '../../../../../utils/Loader/Loaderr';

export function AddPremix() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientQuantityChange = (ingredientId, quantity = 1) => {
    const newSelectedIngredients = selectedIngredients.map((ingredient) => {
      if (ingredient.id === ingredientId) {
        console.log(ingredient);
        return { ...ingredient, quantity: quantity };
      }
      return ingredient;
    });
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleIngredientSelect = (selectedOption) => {
    console.log(selectedOption);
    const newSelectedIngredient = {
      id: selectedOption.id,
      name: selectedOption.value,
      quantity: 1,
    };
    // setSelectedIngredients(newSelectedIngredient);
    setSelectedIngredients((prev) => [...prev, newSelectedIngredient]);
    console.log(selectedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      ingredients: selectedIngredients.map((ingredient) => ({
        id: ingredient.ingredient.id,
        name: ingredient.ingredient.name,
        quantity: ingredient.quantity,
      })),
      description: formData.description,
    };
    const response = await createPremix(dataToSend);
    createPremix((prev) => [...prev, response]);
    setFormData({ name: '', description: '' });
    setSelectedIngredients([]);
  };

  useEffect(() => {
    setLoading(true);
    getAllIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => {
        console.log(err);
        alert('Помилка при завантаженні інгредієнтів');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const optionsForm = useMemo(() => convertToOptionsSelect(ingredients), [ingredients]);

  return (
    <div className="AddPremix">
      <h2>Створити новий премікс</h2>
      {loading ? (
        <Loaderr />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label className='label'>Назва:</label>
            <div className='control'>
              <input
                type="text"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Опис:</label>
            <div className='control'>
              <textarea
                name="description"
                className="textarea"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Інгредієнти:</label>
            <SearchSelect
              options={optionsForm}
              updateOptions={((options) => setIngredients(filteredItems(ingredients, options)), [ingredients])}
              placeholder='Пошук інгредієнтів...'
              selectOpen={true}
              path='/'
              onSelect={handleIngredientSelect}
            />
            {selectedIngredients.map((ingredient) => (
              <div key={ingredient.id} className='field'>
                <label className='label'>{ingredient.name}</label>
                <div className='control'>
                  <input
                    type="number"
                    className="input"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientQuantityChange(ingredient.id, parseFloat(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className='button is-primary'>Відправити</button>
        </form>
      )}
    </div>
  );
}
