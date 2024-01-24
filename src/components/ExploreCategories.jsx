/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CategoriesList } from "../helper/categories";
import { useParams,useNavigate } from "react-router-dom";

function ExploreCategories() {
  const {id} = useParams();
  const navigate=useNavigate()
  const [categories, setCategories] = useState("");
  console.log(id,"ididi")

  useEffect(() => {
   setCategories( CategoriesList.filter((res)=>{
    return res.id===Number(id)
   })[0])
  }, [CategoriesList]);

  console.log(categories,"wnkje")

  return (
    <div>
        <h1 className="text-center bg-white py-2 text-md">{categories?.catName}</h1>
      <div className="grid grid-cols-2 md:flex  md:flex-wrap items-center md:pl-32 justify-start md:gap-10 xxl:w-[90vw]">
        
        {categories?.catNames?.map((res, i) => {
       
          return (
            <div
              className="flex  items-center justify-center pt-5"
              key={i}
            >
              <div className="bg-white cursor-pointer p-2 py-1 shadow-lg w-[48vw] h-[28vh] md:w-[22vw] lg:w-[16vw] lg:h-[27vh] xl:w-[13vw] xl:h-[27vh] rounded-lg flex-col items-center justify-center">
                <div className="flex items-center pt-5 justify-center">
                  <img alt="productimage" src={res.image} className="h-[18vh] w-fit bg-cover" />
                </div>
                <div className="text-center" onClick={()=>{navigate(`/subcategories/${res.id}`)}}>{res.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreCategories;
