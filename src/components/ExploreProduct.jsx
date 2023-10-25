import React, { useEffect, useState } from "react";
import { Images } from "../helper/ExploreProducts";
import { useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";

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
        <div className="md:w-[40vw] bg-white border flex flex-row-reverse border-slate-300">
          <div className="w-full  md:max-w-[100%] md:h-auto flex items-center justify-center">
            <img src={img} className="w-[100%] h-auto md:hidden" />
            <ReactImageMagnify
            className="!hidden md:!flex"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: img, 
                  
                },
                largeImage: {
                  src: img,
                  width: 1000,
                  height: 1000,
                },
              }}
              
            />
          </div>
          <div className="flex flex-col">
            {products[0]?.img?.map((res, i) => {
              return (
                <div
                  className={`w-[20vw] md:w-[6.2vw] bg-white hover:opacity-50 cursor-pointer ${
                    res === img
                      ? "border-red-600 border-[4px]"
                      : "border-slate-300 border-[2px]"
                  }`}
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
        <div className="w-[90vw] m-auto md:w-[38vw] flex flex-col">
          <h1 className="pt-4 text-2xl md:text-4xl">{products[0]?.title}</h1>
          <p classname="flex ">
            <span>0 reviews</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>0 ratings</span>
          </p>
          {products[0]?.description.map((res, i) => {
            return (
              <ul key={i} className="flex flex-col gap-4 pt-3 pl-4">
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
