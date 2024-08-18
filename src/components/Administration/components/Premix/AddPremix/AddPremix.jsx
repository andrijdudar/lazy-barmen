import React, { useEffect, useMemo, useState } from 'react';
import { createPremix, getAllIngredients } from '../../../../../utils/fetch';
import SearchSelect from '../../../../utils/SearchSelect/SearchSelect';
import { convertToOptionsSelect, filteredItems } from '../../../../utils/SearchSelect/SearchUtils';
import './AddPremix.scss';
import { Loaderr } from '../../../../utils/Loader/Loaderr';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import IconDelete from '../../../../../img/delete-forever-24px.svg'

export function AddPremix() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [hesErrorName, setHesErrorName] = useState(false);
  const [hesErrorIngredients, setHesErrorIngredients] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHesErrorName(false);
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
    selectedOption.length && setHesErrorIngredients(false);
    const newIngredient = {
      ingredient: {
        id: selectedOption.id,
        name: selectedOption.value,
        measure: selectedOption.measure || 'кг',
      },
      ingredient_id: selectedOption.id,
      quantity: selectedOption.quantity || 0,
    };
    const ingredientTrue = !selectedIngredients.find((item) => item.ingredient_id === newIngredient.ingredient_id);
    if (ingredientTrue) {
      setSelectedIngredients((prevSelected) => [...prevSelected, newIngredient]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !formData.name ? setHesErrorName(true) : setHesErrorName(false);
    !selectedIngredients.length ? setHesErrorIngredients(true) : setHesErrorIngredients(false);

    const dataToSend = {
      name: formData.name,
      ingredients: selectedIngredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.quantity,

      })),
      description: formData.description,
    };


    if (selectedIngredients.length && dataToSend.name) {
      setLoadingSubmit(true);
      createPremix(dataToSend)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert('Помилка при створенні преміксу');
        })
        .finally(() => {
          setFormData({ name: '', description: '' });
          setSelectedIngredients([]);
          setLoadingSubmit(false);
          navigate('/admin/premix');
        });
    }
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
        <form
          onSubmit={handleSubmit}
        >
          <div className='field field-add-premix'>
            <label className='label'>Назва:</label>
            <div className='control constrol-input'>
              <input
                type="text"
                name="name"
                className="input input-name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {hesErrorName && <p className='error has-text-danger'>Поле не може бути пустим</p>}
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
              <ul key={ingredient.id} className='field'>
                {/* <p>{ingredient.name}</p> */}
                <li className='control'>
                  <div className='control'>
                    <label className='label-ingredient'>{ingredient.ingredient.name}</label>
                    <div className='control-end'>
                      <input
                        type="number"
                        className="input-edit-premix input-search"
                        value={ingredient.quantity}
                        onChange={(e) => {
                          handleIngredientQuantityChange(ingredient.id, parseFloat(e.target.value));
                        }}
                      />
                      <div className='ingredient-measure'>{ingredient.measure}</div>
                      <button
                        type="button"
                        className='icon-delete-ingredient button'
                        onClick={() => {
                          const filtredIngredients = selectedIngredients.filter((item) => item.id !== ingredient.id);
                          setSelectedIngredients(filtredIngredients);
                        }}
                      >
                        <img src={IconDelete} alt="delete" width={20} />
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
            {hesErrorIngredients && <p className='error has-text-danger'>Страва не може бути без інгредієнтів</p>}
          </div>
          <button type="submit" className={cn('button', { 'is-loading': loadingSubmit })}>Відправити</button>
        </form>
      )}
    </div>
  );
}
