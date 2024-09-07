import React from "react";
import "./Categories.css";
import Category from "./Category/Category";


function BlankPaper({Header, categoryList}){

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
                    {
                        categoryList.map((category) => (
                            <Category category={category} key={category.id}></Category>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default BlankPaper;