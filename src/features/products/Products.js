import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsData, selectLoadingStatus } from './productsSlice'
import { CategoryButtonGroup } from './CategoryButtonGroup'
import { CategoryGroup } from './CategoryGroup'
import './Products.scss';

const Products = () => {

    const dispatch = useDispatch()
    const state_products_loading = useSelector(selectLoadingStatus)

    useEffect(() => {
        dispatch(fetchProductsData())
    }, [])

    return (
        <>
            {state_products_loading === "loading" && (
                <div className="centralContainer">
                    <p>Loading...</p>
                </div>
            )}
            {state_products_loading === "rejected" && (
                <div className="centralContainer">
                    <p>Rejected</p>
                </div>
            )}
            {state_products_loading === "fullfilled" && (
                <>
                    <CategoryButtonGroup />
                    <CategoryGroup />
                </>
            )}
        </>
    )
}

export default Products
