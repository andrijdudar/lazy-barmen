import { useEffect, useMemo, useState } from "react";
import { convertToOptionsSelect } from "../../../../utils/SearchSelect/SearchUtils";
import { addCategory, addCategoryHome, getAllCategories } from "../../../../../utils/fetch";
import cn from "classnames";
import SearchSelect from "../../../../utils/SearchSelect/SearchSelect";
import "./AddCategory.scss";
import { useNavigate } from "react-router-dom";


export const AddCategory = () => {
  const [categories, setCategories] = useState([{
    child: true,
    dishes: false,
    name: "Головна категорія",
    parent_id: null,
  }]);
  const [nameCategory, setNameCategory] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then((data) => {
      console.log(data);
      setCategories(prev => [...prev, ...data]);
      setLoading(false);
    });
  }, []);

  const options = useMemo(() => convertToOptionsSelect(categories), [categories]);


  const saveCategory = (e) => {
    e.preventDefault();
    if (!nameCategory || !parentCategory) {
      return;
    }
    if (parentCategory.value === 'Головна категорія') {
      addCategoryHome({ name: nameCategory }).then(() => {
        navigate('/admin/categories');
      });
      return;
    }

    const newCategory = {
      name: nameCategory,
      parent: parentCategory.value,
    }
    setLoading(true);
    addCategory(newCategory).then((res) => {
      setLoading(false);
      navigate('/admin/categories');
    });
    console.log(nameCategory, parentCategory);
  }

  return (
    <div className="addCategory">
      <h1 className="titleAddCategory">Додати категорію</h1>
      <form className="form-add-category" onSubmit={saveCategory}>
        <div className="field field-add-category">
          <label className="label">Назва категорії: <span className="selectedCategory">{nameCategory}</span></label>
          <div className="control">
            <input
              className="inputAddCategory input is-rounded" type="text" placeholder="Назва категорії"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
            />
            <div className='searchSelectEdit'>
              <div className='label'>
                Батьківська категорія: <span className="selectedCategory">{parentCategory.value|| '---'}</span>
              </div>
              <SearchSelect
                className='searchSelect'
                options={options}
                placeholder='Пошук батьківськї категорії...'
                selectOpen={true}
                path='/'
                onSelect={(category) => {
                  console.log(category);
                  setParentCategory(category)
                }}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className={cn('button', {
                "is-loading": loading,
              })}
            >
              Зберегти
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
