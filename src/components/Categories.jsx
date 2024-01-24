import React, { useEffect, useState } from "react";
import { CategoriesList } from "../helper/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import { Grid, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { get } from "lodash";

function Categories() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [category, setCategory] = useState([]);
  const [categoryHeading, setCategoryHeadinng] = useState([]);
  const [populate, setPopulate] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/get_category`
      );
      console.log(result, "result");
      setCategory(get(result, "data.data.category", ""));
      setCategoryHeadinng(get(result, "data.data.categoryHeading", ""));
      setPopulate(get(result, "data.data.populateResult", ""));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("send-data-from-server", (data) => {
      console.log(data,"datatdtatta")
      if (data) {
      fetchData()
      }
    });
  }, [socket]);

  return (
    <div>
      {categoryHeading.map((res, i) => {
        const length = category.filter((data) => {
          return data.categoryId === res._id;
        }).length;
        return (
          <div
            key={i}
            className={`h-[27vh] lg:h-[45vh] w-[100vw] flex items-center mt-2 bg-white ${
              length > 0 ? "block" : "hidden"
            }`}
          >
            <div className="h-[100%] w-[30vw] lg:w-[22vw] px-2 md:px-10 flex flex-col gap-5 items-center justify-center">
              <p className="text-[10px] font-semibold lg:text-2xl text-center">
                {res.name}
              </p>
              <button
                className="bg-[--bg-color] lg:text-sm w-[18vw] lg:w-[8vw] h-[4vh] lg:h-[5vh]  text-white font-semibold text-[11px] rounded-md"
                onClick={() => {
                  navigate(`ExploreCategories/${res._id}`);
                }}
              >
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
                {category
                  .filter((data) => {
                    return data.categoryId === res._id;
                  })
                  .map((filtered, i) => {
                    return (
                      <SwiperSlide
                        className="xl:!w-[17vw] !flex !flex-col items-center justify-center"
                        onClick={() => {
                          navigate(`/subcategories/${filtered._id}`);
                        }}
                      >
                        <div className="h-[20vh] lg:h-[25vh] flex items-center justify-center  px-2">
                          <img
                            alt="CategoryImage"
                            src={`${filtered.image}`}
                            className="!w-[fit] h-[80%] lg:h-[90%] lg:!w-fit"
                          />
                        </div>
                        <span className="text-[14px] sm:text-[12px] md:text-[15px] lg:text-lg  font-medium cursor-pointer">
                          {filtered.name}
                        </span>
                        <span className="text-[12px] sm:text-[12px] md:text-[15px] lg:text-lg  font-medium">
                          From {filtered.from}
                        </span>
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
