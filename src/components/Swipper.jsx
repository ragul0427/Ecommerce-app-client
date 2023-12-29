// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Image } from "antd";
import Categories from "./Categories";

export default function Swipper() {
  const Banners = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/sale-discount-banner-festival-lights-diwali-vector_1017-39895.jpg?size=626&ext=jpg&ga=GA1.2.297619635.1690879118&semt=ais",
    },

    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/traditional-shubh-diwali-sale-banner-with-realistic-diya-design_1017-40298.jpg?size=626&ext=jpg&ga=GA1.2.297619635.1690879118&semt=ais",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-vector/black-friday-sale-modern-banner-with-text-soace_1017-34852.jpg?size=626&ext=jpg&ga=GA1.2.297619635.1690879118&semt=ais",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/premium-vector/sale-banner-template-design_39705-92.jpg?size=626&ext=jpg&ga=GA1.2.297619635.1690879118&semt=ais",
    },
  ];
  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation={{ clickable: true }}
        className="w-[100vw] mt-2"
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 2000 }}
      >
        {Banners.map((res, i) => {
         
          return (
            <SwiperSlide key={res.id}>
              <div>
                <Image
                  src={`${res.image}`}
                  className="!h-[20vh] md:h-[25vh] lg:!h-[40vh] !w-[100vw]"
                  preview={false}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div>
        <Categories />
      </div>
    </div>
  );
}
