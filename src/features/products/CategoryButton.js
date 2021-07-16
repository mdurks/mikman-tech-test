import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedProducts } from './productsSlice'
import './CategoryButton.scss';

export const CategoryButton = (props) => {

    const dispatch = useDispatch()
    const state_products_selectedProducts = useSelector((state) => state.products.selectedProducts)

    return (
        <button
            className={`categoryBtn ${
                state_products_selectedProducts.find(category => category.title === props.title) ?
                'categoryBtn__selected' : 'categoryBtn__unselected'
            }`}
            onClick={() => {
                dispatch(updateSelectedProducts(props.title))
                setTimeout(() => {
                    let targetId = document.getElementById(props.title.replace(/\s/g, ''))
                    if (targetId) {
                        targetId.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }, 200);
            }}
            aria-label={`View ${props.title} category`}
        >
            <img
                className="categoryBtn__menuImg"
                src={`https://source.unsplash.com/150x150/?${props.title}`}
                alt={props.title}
                height="150"
                width="150"
            />
            {props.title}
        </button>
    )
}
