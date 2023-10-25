import React, { useEffect, useState } from "react";
import { Images } from "../helper/ExploreProducts";
import { useLocation } from "react-router-dom";

function ExploreProduct() {
  const [img, setImg] = useState(Images[0].img[0]);
  const [products,setProducts] = useState("")
  const location=useLocation()

  console.log(location.pathname.split("/")[2])

 useEffect(()=>{
 setProducts(Images.filter((res,i)=>{
  return res.subCatId==location.pathname.split("/")[2]
}))
 },[])

 console.log(products,"Wesgy")

  return (
    <div className="flex flex-col md:flex-row md:w-[85vw] justify-between m-auto mt-4">
      <div className="md:w-[38vw] bg-white">
        <div className="w-full  h-[60vh] flex items-center justify-center">
          <img src={img} className="h-[80%]"/>
        </div>
        <div className="flex">
          {products[0]?.img?.map((res, i) => {
            return (
                 <div
                className={`w-[20vw] md:w-[10vw] bg-white hover:opacity-50 cursor-pointer ${res===img?"border-red-600 border-[4px]":"border-slate-300 border-[2px]"}`}
                key={i}
                onMouseOver={() => {
                  setImg(res);
                }}
              >
                <img src={res} />
              </div>
              );
          })}
        </div>
      </div>
      <div className="w-[38vw]">
      <h1 className="text-3xl">{products[0]?.title}</h1>
      </div>
    </div>
  );
}

export default ExploreProduct;
