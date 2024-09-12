import React from "react";
import "./Categories.css";
import Category from "./Category/Category";


function Categories({ Header, categoryList, onFilter }) {

    return (

        <>
            <div className="container">
                <div className="flex justify-content-center">
                    <h1 className="flex align-center color-dark-blue text-control">
                        <span className="material-symbols-outlined color-gold icon-lg">full_stacked_bar_chart</span>&nbsp;
                        {Header}
                    </h1>
                </div>

                <div className="flex flex-row flex-wrap space-between padding-25 mobile-control">

                    <div className="card" onClick={() => onFilter(-1)}>
                        <div className="card-link">
                            <div className="cat-overlay"></div>
                            <h1 className="color-dark-blue cat-text">همه دسته‌بندی ها</h1>
                        </div>
                    </div>
                    {
                        categoryList.map((category) => (
                            <Category category={category} key={category.id} onTouched={onFilter}></Category>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Categories;