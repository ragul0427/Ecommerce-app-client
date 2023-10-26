import React, { useEffect, useState } from "react";
import { Images } from "../helper/ExploreProducts";
import { useLocation } from "react-router-dom";
import Zoom from "react-img-zoom";

function ExploreProduct() {
  const [img, setImg] = useState(Images[0].img[0]);
  const [products, setProducts] = useState("");
  const location = useLocation();

  console.log(location.pathname.split("/")[2]);

  useEffect(() => {
    setProducts(
      Images.filter((res, i) => {
        return res.subCatId == location.pathname.split("/")[2];
      })
    );
  }, []);

  console.log(products, "Wesgy");

  return (
    <div className="bg-white md:!h-[100vh]">
      <div className="flex flex-col md:flex-row md:w-[85vw] justify-between m-auto md:pt-5">
        <div className="md:w-[40vw] bg-white border flex flex-col md:flex-row-reverse border-slate-300">
          <div className="w-full h-[50vh] md:max-w-[100%] md:h-auto flex items-center justify-center">
            <img src={img} className="h-[80%] md:w-auto md:h-[90%]" />
            {/* <Zoom img={img} zoomScale={3} width={600} height={600} /> */}
          </div>
          <div className="flex md:flex-col">
            {products[0]?.img?.map((res, i) => {
              return (
                <div
                  className={`h-[10vh] w-[28vw] md:h-[13vh] md:w-[7vw] bg-white hover:opacity-50 cursor-pointer flex items-center justify-center ${
                    res === img
                      ? "border-red-600 border-[4px]"
                      : "border-slate-300 border-[2px]"
                  }`}
                  key={i}
                  onMouseOver={() => {
                    setImg(res);
                  }}
                >
                  <img src={res} className="h-[80%] md:h-[100%]"/>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-[90vw] m-auto md:w-[38vw] flex flex-col">
          <h1 className="pt-2 text-xl md:text-4xl">{products[0]?.title}</h1>
          <p classname="flex ">
            <span>0 reviews</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>0 ratings</span>
          </p>

          <h1 className="texxt-xl md:text-2xl pt-2 font-semibold">Highlights</h1>
          {products[0]?.description.map((res, i) => {
            return (
              <ul key={i} className="flex flex-col gap-2 pt-1 pl-4">
                <li className="list-disc">{res}</li>
              </ul>
            );
          })}

          <div>
            <p className="pt-5">Choose Color</p>
            <div className="flex gap-1 pt-1">
              <div className="!w-[22vw] md:!w-[6vw] border-2 border-slate-300 hover:scale-105 duration-1000 cursor-pointer">
                <img src="https://tiimg.tistatic.com/fp/1/007/951/6-6-inch-screen-size-full-hd-128-gb-internal-storage-vivo-y33t-mobile-phone-447.jpg" />
              </div>
              <div className="!w-[22vw] md:!w-[6vw] border-2 border-slate-300 hover:scale-105 duration-1000 cursor-pointer">
                <img src="https://tiimg.tistatic.com/fp/1/007/951/6-6-inch-screen-size-full-hd-128-gb-internal-storage-vivo-y33t-mobile-phone-447.jpg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreProduct;
