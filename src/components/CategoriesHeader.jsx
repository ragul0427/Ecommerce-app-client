/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swipper from "./Swipper";
import { Image } from "antd";
import { CategoriesList } from "../helper/categories";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

function CategoriesHeader() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [categories, setCategories] = useState("");
  const Categories = [
    {
      id: 1,
      name: "Grocery",
      catId:10,
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
    },
    {
      id: 2,
      name: "Mobiles",
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
    },
    {
      id: 3,
      name: "Fashion",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100",
    },
    {
      id: 4,
      name: "Electronics",
      catId:21,
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
    },
    {
      id: 5,
      name: "Homes&Furnitures",
      catId:25,
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
    },
    {
      id: 6,
      name: "Applicances",
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
    },
    {
      id: 7,
      name: "Travel",
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100",
    },
    {
      id: 8,
      name: "Beauty,Food,Toys&more",
      catId:22,
      image:
        "https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
    },
    {
      id: 9,
      name: "TwoWheelers",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/05d708653beff580.png?q=100",
    },
  ];

  const mouseOver = (res) => {
    console.log("looo", res.name);
    setData(res);
    setCategories(
      CategoriesList.filter((data, i) => {
        return data.id===res.catId
      })[0]
    );
  };


  return (
    <div>
      <div
        className="fixed h-[15vh] lg:15vh lg:pt-3 bg-white z-40">
        <p className="flex items-end justify-end pr-8 pt-1 xl:hidden">
          <ArrowRightAltOutlinedIcon />
        </p>
        <div className=" !w-screen  px-4 overflow-x-scroll lg:px-36 flex items-center gap-x-12 justify-between">
          {Categories.map((res, i) => {
            return (
              <div className="flex flex-col justify-center h-[100%]" key={i}>
                <div className="flex items-center justify-center">
                  <Image
                    src={`${res.image}`}
                    width={50}
                    height={50}
                    preview={false}
                    className="cursor-pointer "
                  />
                </div>
                <p
                  className="text-[10px]  flex lg:text-[14px] hover:text-[#2874F0] cursor-pointer font-semibold"
                  onMouseOver={() => {
                    mouseOver(res);
                  }}
                >
                  <span onClick={()=>{navigate(`/subcategories/${res.id}`)}}>{res.name}</span>
                 
                </p>
                
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-[12vh]">
        <Swipper />
      </div>
    </div>
  );
}

export default CategoriesHeader;
