import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedProducts, selectAllSelectedProducts } from './productsSlice'
import { CategoryButton } from './CategoryButton'
import './CategoryButtonGroup.scss';

export const CategoryButtonGroup = () => {

    const state_products_data = useSelector((state) => state.products.data)
    const dispatch = useDispatch()

    // I ran out of time really to do a nice scroller, so I've just created this simple one
    // for mobile the user can just scroll-swipe to view the products

    const scroll_left = () => {
        document.querySelector('.categoryButtonGroup__navList').scrollBy({
            top: 0,
            left: -document.querySelector('.categoryBtn').parentNode.offsetWidth + 16,
            behavior: 'smooth'
        })
    }

    const scroll_right = () => {
        document.querySelector('.categoryButtonGroup__navList').scrollBy({
            top: 0,
            left: +document.querySelector('.categoryBtn').parentNode.offsetWidth + 16,
            behavior: 'smooth'
        })
    }

    // apply the intersection observer to bring in the scroll back to top button
    useEffect(() => {
        const sentinalEl = document.querySelector('.categoryButtonGroup')
        const handler = (entries) => {
            if (!entries[0].isIntersecting) {
                document.querySelector('.backToTopBtn').classList.add('visible')
            } else {
                document.querySelector('.backToTopBtn').classList.remove('visible')
            }
        }
        const observer = new window.IntersectionObserver(handler)
        observer.observe(sentinalEl)
    },[])

    return (
        <nav className="categoryButtonGroup">
            <div className="centralContainer">
                <div className="categoryButtonGroup__scrollWrapper">
                    <button
                        onClick={scroll_left}
                        className="categoryButtonGroup__navList__arrow_left"
                    >
                        ❮
                    </button>
                    <ul className="categoryButtonGroup__navList">
                        {state_products_data.map((item) =>
                            <li key={item.title}>
                                <CategoryButton title={item.title} />
                            </li>
                        )}
                    </ul>
                    <button
                        onClick={scroll_right}
                        className="categoryButtonGroup__navList__arrow_right">
                            ❯
                    </button>
                </div>
                <div className="categoryButtonGroup__overRideGrp">
                    <button
                        className="categoryButtonGroup__overRideBtn"
                        onClick={() => { dispatch(clearSelectedProducts()) }}
                        aria-label="Clear all selected product categories"
                        >
                        Clear All
                    </button>
                    <button
                        className="categoryButtonGroup__overRideBtn"
                        onClick={() => { dispatch(selectAllSelectedProducts()) }}
                        aria-label="Select all product categories"
                    >
                        Select All
                    </button>
                </div>
            </div>
        </nav>
    )
}
