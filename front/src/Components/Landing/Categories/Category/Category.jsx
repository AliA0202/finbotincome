import React from "react";
import "./Category.css";
import { Link } from 'react-router-dom';

function Category({ category, onTouched }) {
    function basedOnLandingOrBlog() {
        if (onTouched === null) {
            return (<>
                <Link to="/blog"
                    state={{ cat: category.title, catID: category.id }}
                >
                    <div className="card">
                        <div className="card-link">
                            <img src={category.image} alt={category.title} className="cat-img"></img>
                            <div className="cat-overlay"></div>
                            <h1 className="color-dark-blue cat-text">{category.title}</h1>
                        </div>
                    </div>
                </Link>
            </>)
        }
        else {
            return (<>
                <div className="card" onClick={() => onTouched(category.title, category.id)}>
                    <div className="card-link">
                        <img src={category.image} alt={category.title} className="cat-img"></img>
                        <div className="cat-overlay"></div>
                        <h1 className="color-dark-blue cat-text">{category.title}</h1>
                    </div>
                </div>
            </>)
        }
    }
    return (
        <>
            {basedOnLandingOrBlog()}
        </>
    );
}

export default Category;