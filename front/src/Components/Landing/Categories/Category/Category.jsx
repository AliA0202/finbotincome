import React from "react";
import "./Category.css";
import { Link } from 'react-router-dom';

function Category({category, onTouched}){
    return (
        <>
            <div className="card" onClick={() => onTouched(category.title)}>
                    <div className="card-link">
                        <img src={category.image} alt={category.title} className="cat-img"></img>
                        <div className="cat-overlay"></div>
                        <h1 className="color-dark-blue cat-text">{category.title}</h1>                        
                    </div>
            </div>
        </>
    );
}

export default Category;