import { useEffect, useRef, useState } from "react";
import { useCategories } from "../../../hooks/queries/useCategories";
import "./CategoriesFilter.css";
import Loader from "../../common/Loader/Loader";

const CategoriesFilter = ({ formId, onChangeCategories, initialCategories = [] }) => {
  const { data, isLoading, isError, error } = useCategories();
  const [categoryIdList, setCategoryIdList] = useState(initialCategories);
  const isFirstRender = useRef(true);

  const addIdToList = (categoryId) => {
    const copyList = structuredClone(categoryIdList);
    copyList.push(categoryId);

    const copyWithoutRepeats = Array.from(new Set(copyList));

    if(copyWithoutRepeats.length === data.length) setCategoryIdList([]);
    else setCategoryIdList(copyWithoutRepeats);
  };

  const removeIdFromList = (categoryId) => {
    const listWithoutId = categoryIdList.filter((id) => id !== categoryId);
    setCategoryIdList(listWithoutId);
  };

  const handleChange = (isChecked, categoryId) => {
    if (isChecked) addIdToList(categoryId);
    else removeIdFromList(categoryId);
  };

  const handleEmpty = (isChecked) => {
    if (isChecked) setCategoryIdList([]);
  };

  useEffect(() => {
    if(isFirstRender.current) isFirstRender.current = false;
    else onChangeCategories();
  }, [categoryIdList, onChangeCategories]);

  if (isLoading) return (
    <div className="loader-categories">
      <Loader/>
    </div>
  );

  if (isError)
    return <p>{error.message ?? "No fue posible obtener las categorías"}</p>;

  return (
    <fieldset form={formId} className="categories-filter">
      <legend className="categories-filter__title">Categories</legend>

      <div className="input-container">
        <input
        className="input"
          onChange={(e) => handleEmpty(e.target.checked)}
          checked={categoryIdList.length === 0}
          type="checkbox"
          name="categories"
          value=""
          id="empty-category"
        />
        <label htmlFor="empty-category" className="input-label">All</label>
      </div>

      {data.map((category) => (
        <div key={category.id} className="input-container">
          <input
          className="input"
            checked={categoryIdList.includes(category.id)}
            onChange={(e) => handleChange(e.target.checked, category.id)}
            type="checkbox"
            name="categories"
            value={category.id}
            id={category.id + "-category"}
            form={formId}
          />
          <label htmlFor={category.id + "-category"} className="input-label">{category.name}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default CategoriesFilter;
