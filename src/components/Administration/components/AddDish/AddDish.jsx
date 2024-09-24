import React, { useEffect, useMemo, useState } from 'react';
import './AddDish.scss';
import { createNewDish, getAllCategories, getAllIngredients, getAllPremixes, getAllTags } from '../../../../utils/axiosFunc';
import SearchSelect from '../../../utilsAdministration/SearchSelect/SearchSelect';
import { convertToOptionsSelect, filteredItems } from '../../../utilsAdministration/SearchSelect/SearchUtils';
// import IconDelete from '../../../../img/delete-forever-24px.svg';
import IconDelete from '../../../../utils/IconDelete';


// const testDishe = {
//   "dish_name": "string",
//   "description": "string",
//   "ingredients": [
//     {
//       "id": 0,
//       "name": "string",
//       "quantity": 0
//     }
//   ],
//   "premixes": [
//     {
//       "id": 0,
//       "name": "string",
//       "quantity": 0
//     }
//   ],
//   "tags": [
//     "string"
//   ],
//   "category": "string",
//   "price": 0
// }

export const AddDish = () => {

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedPremixes, setSelectedPremixes] = useState([]);
  const [selectedTages, setSelectedTages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [premixes, setPremixes] = useState([]);
  const [tages, setTages] = useState([]);
  const [categories, setCategories] = useState([]);



  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllIngredients()
      .then((data) => {
        setIngredients(data);

      })
      .catch((error) => console.log(error));

    getAllPremixes()
      .then((data) => {
        setPremixes(data)
      })


      .catch((error) => console.log(error));

    getAllTags()
      .then((data) => {
        setTages(data)
      })
      .catch((error) => console.log(error));

    getAllCategories()
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => console.log(error));

  }, []);

  const stopEditing = () => {
    setDishName('');
    setDescription('');
    setSelectedIngredients([]);
    setSelectedPremixes([]);
    setSelectedTages([]);
    setSelectedCategories('');
    setPrice('');
  };

  // const handleChange = (e) => {
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      dish_name: dishName,
      description: description,
      ingredients: selectedIngredients,
      premixes: selectedPremixes,
      tags: [selectedTages[0].name],
      category: selectedCategories[0].name,
      price: price,
    };
    console.log(selectedTages[0].name);
    console.log(selectedCategories[0].name);
    console.log(dataToSend);
    createNewDish(dataToSend)
      .then((res) => {
        console.log(res);
        stopEditing();
        setSuccessMessage('Страву успішно додано!');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Помилка при додаванні страви');
      });

  };

  // #region  Ingredients
  const handleIngredientQuantityChange = (ingredientId, quantity = 1) => {
    const newSelectedIngredients = selectedIngredients.map((ingredient) => {
      if (ingredient.id === ingredientId) {
        return { ...ingredient, quantity: quantity };
      }
      return ingredient;
    });
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleIngredientSelect = (selectedOption) => {
    const newIngredient = {
      id: selectedOption.id,
      name: selectedOption.value,
      quantity: selectedOption.quantity || 0,
    };
    const ingredientTrue = !selectedIngredients.find((item) => item.id === newIngredient.id);
    if (ingredientTrue) {
      setSelectedIngredients((prevSelected) => [...prevSelected, newIngredient]);
    }
  };

  const optionsIngredients = useMemo(() => convertToOptionsSelect(ingredients), [ingredients]);
  // #endregion

  // #region  Premixes
  const handlePremixQuantityChange = (premixId, quantity = 1) => {
    const newSelectedPremix = selectedPremixes.map((premix) => {
      if (premix.id === premixId) {
        return { ...premix, quantity: quantity };
      }
      return premix;
    });
    setSelectedPremixes(newSelectedPremix);
  };

  const handlePremixesSelect = (selectedOption) => {
    const newPremix = {
      id: selectedOption.id,
      name: selectedOption.value,
      quantity: selectedOption.quantity || 0,
    };
    const premixTrue = !selectedPremixes.find((item) => item.id === newPremix.id);
    if (premixTrue) {
      setSelectedPremixes((prevSelected) => [...prevSelected, newPremix]);
    }

  };
  const optionsPremixes = useMemo(() => convertToOptionsSelect(premixes), [premixes]);
  // #endregion

  // #region  Tages
  const handleTagesSelect = (selectedOption) => {
    const newTag = {
      id: selectedOption.id,
      name: selectedOption.value,
      quantity: selectedOption.quantity || 0,
    };
    // const tagTrue = !selectedTages.find((item) => item.id === newTag.id);
    // if (selectedTages.length < 1) {
    setSelectedTages(() => [newTag]);
    // }

  };
  const optionsTages = useMemo(() => convertToOptionsSelect(tages), [tages]);
  // #endregion

  // #region  Categories
  const handleCategoriesSelect = (selectedOption) => {
    const newCategory = {
      id: selectedOption.id,
      name: selectedOption.value,
      quantity: selectedOption.quantity || 0,
    };
    // const categoryTrue = !selectedCategories.find((item) => item.id === newCategory.id);
    // if (categoryTrue) {
    setSelectedCategories(() => [newCategory]);
    // }
  };
  const optionsCategories = useMemo(() => convertToOptionsSelect(categories), [categories]);
  // #endregion

  return (
    <div className="AddDish">
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className='formAddDish' onSubmit={handleSubmit}>
        <h1>Додати нову страву</h1>
        <label className='label'>
          Назва:
          <div className='inputContainer'>
            <input
              className='input-search input'
              type="text"
              placeholder='Назва страви'
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
          </div>
        </label>
        <label className='label'>
          Опис:
          <div className='control inputContainer'>
            <textarea
              className='textarea input-search'
              placeholder='Опис страви'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </label>
        <div className='label'>
          Інгредієнти:
          <div className='inputContainer'>
            <SearchSelect
              options={optionsIngredients}
              updateOptions={((options) => setIngredients(filteredItems(ingredients, options)), [ingredients])}
              placeholder='Пошук інгредієнтів...'
              selectOpen={true}
              path='/'
              onSelect={handleIngredientSelect}
            />
            {selectedIngredients.map((ingredient) => (
              <ul key={ingredient.id} className='field'>
                <li className='ingredient-li-container'>
                  <p className='label capitalize'>{ingredient.name}</p>
                  <div className='input-container ingredient-li'>
                    <input
                      type="number"
                      className="input-search input ingredient-li-input"
                      value={ingredient.quantity}
                      onChange={(e) => {
                        handleIngredientQuantityChange(ingredient.id, parseFloat(e.target.value));
                      }}
                    />
                    {/* <div className=''>{ingredient.measure}</div> */}
                    <button
                      type="button"
                      className='button button-del-ingredeint'
                      onClick={() => {
                        const filtredIngredients = selectedIngredients.filter((item) => item.id !== ingredient.id);
                        setSelectedIngredients(filtredIngredients);
                      }}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className='label'>
          Примікси:
          <div className='inputContainer'>
            <SearchSelect
              options={optionsPremixes}
              updateOptions={((options) => setPremixes(filteredItems(premixes, options)), [premixes])}
              placeholder='Пошук преміксів...'
              selectOpen={true}
              path='/'
              onSelect={handlePremixesSelect}
            />
            {selectedPremixes.map((premix) => (
              <ul key={premix.id} className='field'>
                <li className='ingredient-li-container'>
                  <p className='label capitalize'>{premix.name}</p>
                  <div className='input-container ingredient-li'>
                    <input
                      type="number"
                      className="input-search input ingredient-li-input"
                      value={premix.quantity}
                      onChange={(e) => {
                        handlePremixQuantityChange(premix.id, parseFloat(e.target.value));
                      }}
                    />
                    <button
                      type="button"
                      className='button button-del-ingredeint'
                      onClick={() => {
                        const filtredPremixes = selectedPremixes.filter((item) => item.id !== premix.id);
                        setSelectedPremixes(filtredPremixes);
                      }}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className='label'>
          Теги:
          <div className='inputContainer'>
            <SearchSelect
              options={optionsTages}
              updateOptions={((options) => setTages(filteredItems(tages, options)), [tages])}
              placeholder='Пошук тегів...'
              selectOpen={true}
              path='/'
              onSelect={handleTagesSelect}
            />
            {selectedTages.map((tag) => (
              <ul key={tag.id} className='field'>
                <li className='ingredient-li-container'>
                  <p className='label capitalize'>{tag.name}</p>
                  <div className='ingredient-li'>
                    <button
                      type="button"
                      className='button button-del-ingredeint'
                      onClick={() => {
                        const filtredTags = selectedTages.filter((item) => item.id !== tag.id);
                        setSelectedTages(filtredTags);
                      }}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <div className='label'>
          Категорії:
          <div className='inputContainer'>
            <SearchSelect
              options={optionsCategories}
              updateOptions={((options) => setCategories(filteredItems(categories, options)), [categories])}
              placeholder='Пошук категорій...'
              selectOpen={true}
              path='/'
              onSelect={handleCategoriesSelect}
            />
            {selectedCategories.map((category) => (
              <ul key={category.id} className='field'>
                <li className='ingredient-li-container'>
                  <p className='label capitalize'>{category.name}</p>
                  <div className='ingredient-li'>
                    <button
                      type="button"
                      className='button button-del-ingredeint'
                      onClick={() => {
                        const filtredTags = selectedCategories.filter((item) => item.id !== category.id);
                        setSelectedCategories(filtredTags);
                      }}
                    >
                      <IconDelete />
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <label className='label'>
          Ціна:
          <div className='inputContainer'>
            <input
              className='input-search input'
              type="number"
              value={price}
              placeholder='Ціна страви'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </label>
        <button type="submit" className="button">Додати страву</button>
        <button type="button" className="button" onClick={stopEditing}>Скасувати</button>
      </form>
    </div>
  );
}
