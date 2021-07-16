import React from 'react'
import { useSelector } from 'react-redux'
import './CategoryGroup.scss';

export const CategoryGroup = () => {

    const state_products_data = useSelector((state) => state.products.selectedProducts)

    const returnStockStatus = (stockAmount) => {
        let status;

        switch(true) {
            case stockAmount > 10:
                status = "✔️ In stock"
                break;
            case stockAmount > 0 && stockAmount <= 10:
                status = "⚠️ Few left"
                break;
            case stockAmount === 0:
                status = "❌ Out of stock"
                break;
            default:
                status = "❌ Out of stock"
        }
        return status
    }

    return (
        <div className="categoryGoup">
            <div className="centralContainer">
                {state_products_data.map((item) =>
                    <section id={item.title.replace(/\s/g, '')} key={'categoryGroup' + item.title}>
                        <h2 className="categoryGoup__title">{item.title}:</h2>

                        <div className="categoryGoup__container">
                            {item.data.map((item) =>
                                <div
                                    key={'product' + item.title}
                                    className="categoryGoup__productItem"
                                >
                                    <img
                                        className="categoryGoup__productImg"
                                        src={`https://source.unsplash.com/185x185/?${item.title}`}
                                        alt={item.title}
                                        height="185"
                                        width="185"
                                    />
                                    <div className="categoryGoup__textContainer">
                                        <h3 className="categoryGoup__productTitle">{item.title}</h3>
                                        <div>
                                            <p className="categoryGoup__productPrice">£{item.price} {item.amount}</p>
                                            <p>{returnStockStatus(item.stock)}</p>
                                            <button
                                                className="categoryGoup__buyBtn"
                                                aria-label={`Buy ${item.title} for £${item.price}`}
                                            >
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}
                {state_products_data.length === 0 &&
                    <p className="selectCategoryMsg">Please choose one of the categories above.</p>
                }
            </div>
        </div>
    )
}
