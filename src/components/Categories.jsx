import React from "react";
import { CategoriesList } from "../helper/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import {  Grid, Navigation } from "swiper/modules";
import {useNavigate} from "react-router-dom"

function Categories() {
  const navigate=useNavigate()
 
  return (  
    <div>
      {CategoriesList.map((res, i) => {
        return (
          <div key={i} className="h-[27vh] lg:h-[45vh] w-[100vw] flex items-center mt-2 bg-white" >
            <div className="h-[100%] w-[30vw] lg:w-[20vw] px-10 flex flex-col gap-5 items-center justify-center">
              <p className="text-sm font-semibold lg:text-3xl text-center">{res.catName}</p>
              <button className="bg-[--bg-color] lg:text-sm w-[18vw] lg:w-[8vw] h-[4vh] lg:h-[5vh]  text-white font-semibold text-[11px] rounded-md" onClick={()=>{navigate(`ExploreCategories/${res.id}`)}}>
                View All
              </button>
            </div>

         <div className="w-[70vw] lg:w-[80vw] lg:ml-[-60px]">
         <Swiper
             
              grid={{
                rows: 1,
              }}
              navigation={{
                clickable: true,
              }}
              modules={[Grid, Navigation]}
             
          
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1520: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
                      
            >
              {res.catNames.map((data, i) => {
               
                return (
                  <SwiperSlide className="xl:!w-[17vw] !flex !flex-col items-center justify-center"  onClick={()=>{navigate(`/subcategories/${data.id}`)}}>
                    <div className="h-[20vh] lg:h-[25vh] flex items-center justify-center  px-2">
                    <img alt="CategoryImage" src={`${data.image}`} className="!w-[fit] h-[70%] lg:h-[90%] lg:!w-fit" />
                    </div>
                    <span className="text-[10px] sm:text-[12px] md:text-[15px] lg:text-lg  font-medium">{data.name}</span>
                    <span className="text-[10px] sm:text-[12px] md:text-[15px] lg:text-lg  font-medium">From {data.price}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
