import React, { useEffect } from "react";
import { CategoriesList } from "../helper/categories";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
// import required modules
import { FreeMode, Grid, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import {useNavigate} from "react-router-dom"

function Categories() {
  const value=useSelector((state)=>state.user.user)
 
  return (
    <div>
      {CategoriesList.map((res, i) => {
        return (
          <div className="h-[30vh] lg:h-[45vh] w-screen flex items-center mt-2 bg-white" key={res.id}>
            <div className="h-[100%] w-[40vw] lg:w-[20vw] px-10 flex flex-col gap-5 items-center justify-center">
              <p className="text-sm font-semibold lg:text-3xl text-center">{res.catName}</p>
              <button className="bg-[#2874F0] text-sm w-[22vw] lg:w-[8vw] h-[5vh]  text-white font-semibold  rounded-md">
                View All
              </button>
            </div>

            <Swiper
             freeMode={true}
              grid={{
                rows: 1,
              }}
              navigation={{
                clickable: true,
              }}
              modules={[Grid, Navigation,FreeMode]}
              className="flex bg-white"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1520: {
                  slidesPerView: 4,
                  spaceBetween: 0,
                },
              }}
                      
            >
              {res.catNames.map((data, i) => {
               
                return (
                  <SwiperSlide className="!w-[25%]  !flex !flex-col items-center justify-center">
                    <img src={`${data.image}`} className="w-[30vw] lg:!w-[15vw]" />
                    <span>{data.name}</span>
                    <span>From {data.price}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
