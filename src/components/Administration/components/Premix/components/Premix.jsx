/* eslint-disable react-hooks/exhaustive-deps */
import useStore from '../../../../../StoreZustand';
import { createPremix, deletePremix, getAllIngredients, getAllPremixes } from '../../../../../utils/fetch';
import { Loaderr } from '../../../../utils/Loader/Loaderr';
import SearchSelect from '../../../../utils/SearchSelect/SearchSelect';
import { convertToOptionsSelect, filteredItems } from '../../../../utils/SearchSelect/SearchUtils';
import './Premix.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function Premix() {
  const premixes = useStore((state) => state.premixes);
  const setPremixes = useStore((state) => state.setPremixes);
  const [searchPremixes, setSearchPremixes] = useState([]);
  const [editPremix, setEditPremix] = useState(false);
  const [currentPremix, setCurrentPremix] = useState();

  const [ingredients, setIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [openDetailId, setOpenDetailId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(currentPremix || {});

  useEffect(() => {
    setLoading(true);
    getAllPremixes()
      .then((res) => {
        setPremixes(res);

        setSearchPremixes(res);
        // localStorage.setItem('premixes', JSON.stringify(res));
      })
      .catch((err) => {
        // console.log(err);
        // const LS = JSON.parse(localStorage.getItem('premixes'));
        // setPremixes(LS);
        // alert('Помилка при завантаженні преміксів');
      })
      .finally(() => {
        console.log('премікси завантажені');
        setLoading(false);
      });
    getAllIngredients().then((res) => {
      setIngredients(res);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'using' ? (value === true) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };




  const handleIngredientQuantityChange = (ingredientId, quantity) => {
    setSelectedIngredients(prevSelected => prevSelected.map(ingredient =>
      ingredient.ingredient.id === ingredientId ? { ...ingredient, quantity } : ingredient
    ));
  };

  const handleIngredientSelect = (selectedIngredients) => {
    // console.log(selectedIngredients);
    const newSelectedIngredients = selectedIngredients.map((option) => ({
      ingredient: {
        id: option.id,
        name: option.value,
        measure: option.measure
      },
      quantity: 1 // Default quantity
    }));
    // console.log(newSelectedIngredients);
    setSelectedIngredients((prevSelected) => [...prevSelected, ...newSelectedIngredients]);
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      ingredients: selectedIngredients.map(ingredient => ({
        id: ingredient.ingredient.id,
        name: ingredient.ingredient.name,
        quantity: ingredient.quantity || 5,
      })),
      description: formData.description
    };
    createPremix(dataToSend).then((res) => {
      setSearchPremixes((prev) => [...prev, res]);
    });
    setEditPremix(false);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   getAllPremixes()
  //     .then((res) => {
  //       setPremixes(res);

  //       setSearchPremixes(res);
  //       // localStorage.setItem('premixes', JSON.stringify(res));
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       // const LS = JSON.parse(localStorage.getItem('premixes'));
  //       // setPremixes(LS);
  //       // alert('Помилка при завантаженні преміксів');
  //     })
  //     .finally(() => {
  //       console.log('премікси завантажені');
  //       setLoading(false);
  //     });
  //   getAllIngredients().then((res) => {
  //     setIngredients(res);
  //   });
  // }, []);

  const options = useMemo(() => convertToOptionsSelect(premixes), [premixes]);

  const updateOptions = useCallback((options) => {
    setSearchPremixes(filteredItems(premixes, options));
  }, [premixes]);

  const optionsForm = useMemo(() => convertToOptionsSelect(ingredients), [ingredients]);

  const updateOptionsForm = useCallback((options) => {
    setSearchIngredients(filteredItems(ingredients, optionsForm));
    console.log(searchIngredients);
  }, [ingredients]);


  const handleToggle = (id) => {
    setOpenDetailId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="premixList">
      <h2>Список преміксів</h2>
      <div className='premixSearch'>
        <SearchSelect
          options={options}
          updateOptions={updateOptions}
          placeholder='Пошук преміксів...'
          selectOpen={true}
          path='/'
        />
      </div>
      {loading ? (
        <Loaderr />
      ) : (
        <ul className="ul">
          {searchPremixes.map((premix) => (
            <li key={premix.id} className="premixItem">
              <details
                className="detailsPremix"
                open={openDetailId === premix.id}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPremix(premix);
                    setEditPremix(false);
                    setFormData(premix);
                    handleToggle(premix.id)
                  }}
                >
                  {premix.name}
                </summary>
                {!editPremix ? (
                  <div>
                    <strong>Опис:</strong>
                    <p>{premix.description}</p>
                    <ul>
                      <strong>Інгредієнти:</strong>
                      {premix.premix_ingredients.map((premix_ingredient) => (
                        <li
                          key={premix_ingredient.ingredient_id} className="premixLi"
                        // onClick={
                        //   getAllIngredients().then((res) => {
                        //     setIngredients(res);
                        //   })}
                        >
                          <strong>{premix_ingredient.ingredient.name}:</strong> {premix_ingredient.quantity} {premix_ingredient.ingredient.measure}
                        </li>
                      ))}
                    </ul>

                    <div className='btnContainer'>
                      <button
                        className='button is-ounded is-warning is-hovered is-outlined'
                        type='button'
                        onClick={() => {
                          setEditPremix(!editPremix);
                          // getAllIngredients().then((res) => {
                          //   setIngredients(res);
                          // });
                        }}
                      >
                        Редагувати
                      </button>
                      <button
                        className='button is-rounded is-danger is-hovered is-outlined'
                        type='button'
                        onClick={() => {
                          deletePremix(premix.id).then(() => {
                            setSearchPremixes((perv) => {
                              return perv.filter((item) => item.id !== premix.id);
                            });
                          });
                        }}
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
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
                        updateOptions={updateOptionsForm}
                        placeholder='Пошук інгредієнтів...'
                        selectOpen={true}
                        path='/'
                        onSelect={handleIngredientSelect}
                      />
                      {selectedIngredients.map(ingredient => (
                        <div key={ingredient.ingredient.id} className='field'>
                          <label className='label'>{ingredient.ingredient.name} - {ingredient.ingredient.measure}</label>
                          <div className='control'>
                            <input
                              type="number"
                              className="input"
                              value={ingredient.quantity}
                              onChange={(e) => handleIngredientQuantityChange(ingredient.ingredient.id, parseFloat(e.target.value))}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="submit" className='button is-primary'>Відправити</button>
                  </form>
                )}
              </details>
            </li>
          ))}
        </ul>
      )
      }
    </div >
  );
}
