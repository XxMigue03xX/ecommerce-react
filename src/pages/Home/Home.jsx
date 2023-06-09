import { useCallback, useEffect, useId, useRef, useState } from 'react';
import CategoriesFilter from '../../components/home/CategoriesFilter/CategoriesFilter.jsx';
import ProductList from '../../components/home/ProductList/ProductList.jsx';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const formId = useId();
    const submit = useSubmit();
    const formRef = useRef();
    const { categories, title } = useLoaderData();
    const [titleValue, setTitleValue] = useState(title);

    const handleChangeCategories = useCallback(
        () => {
            if(!formRef.current) return;
            submit(formRef.current)
        },
        [submit]
    )

    useEffect(()=>{
      setTitleValue(title);
    }, [title])

    return (
      <div className="home-container">
        <aside>
          <CategoriesFilter
            initialCategories={categories}
            formId={formId}
            onChangeCategories={handleChangeCategories}
          />
        </aside>

        <section className='form-and-products'>
          <Form id={formId} ref={formRef} className='home__form'>
            <input
              type="search"
              name="title"
              value={titleValue}
              onChange={(e)=>setTitleValue(e.target.value)}
              placeholder="What are you looking for?"
            />
            <button>
            <i className='bx bx-search' ></i>
            </button>
          </Form>
          <ProductList categories={categories} title={title}/>
        </section>
      </div>
    );
}

export default Home