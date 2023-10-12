import React, { useEffect, useState } from "react";
import { Card, Checkbox, List, Image, Drawer } from "antd";
import { subCategories } from "../helper/subCategories";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function SubCategories() {
  const [subCategory, setSubCategory] = useState(subCategories);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(() => {
    return localStorage.getItem("selectedPriceRange") || "";
  });

  const options = [
    {
      label: "100-1000",
      value: "100-1000",
    },
    {
      label: "1000-3000",
      value: "1000-3000",
    },
    {
      label: "3000-8000",
      value: "3000-8000",
    },
    {
      label: "8000-15000",
      value: "8000-15000",
    },
    {
      label: "15000-30000",
      value: "15000-30000",
    },
    {
      label: "30000-50000",
      value: "30000-50000",
    },
    {
      label: "50000-100000",
      value: "50000-100000",
    },
    {
      label: "100000-1050000",
      value: "100000-1050000",
    },
  ];

  const brands = [
    {
      label: "MI",
      value: "MI",
    },
    {
      label: "Vivo",
      value: "Vivo",
    },
    {
      label: "Oppo",
      value: "Oppo",
    },
    {
      label: "Oneplus",
      value: "Oneplus",
    },
    {
      label: "Poco",
      value: "Poco",
    },
    {
      label: "Realme",
      value: "Realme",
    },
    {
      label: "Iphone",
      value: "Iphone",
    },
  ];

  useEffect(() => {
    setSubCategory(
      subCategory.filter((res, i) => {
        return res.categoryId == location.pathname.split("/")[2];
      })
    );

    const [min, max] = selectedPriceRange.split("-").map(Number);
    const filteredProducts = subCategories.filter((product) => {
      const price = parseInt(product.price);
      return (
        price >= min &&
        price <= max &&
        product.categoryId == location.pathname.split("/")[2]
      );
    });

    if (selectedPriceRange == "") {
      setSubCategory(
        subCategories.filter((res, i) => {
          return res.categoryId == location.pathname.split("/")[2];
        })
      );
    } else {
      setSubCategory(filteredProducts);
    }
  }, [localStorage.getItem("selectedPriceRange")]);

  const onPriceChange = (selectedValues) => {
    setSelectedPriceRange(selectedValues);

    localStorage.setItem("selectedPriceRange", selectedValues);
  };

  const onChange = () => {};
  return (
    <div className="flex ">
      <div
        className="sm:hidden pt-5 pl-2"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuIcon />
      </div>
      <div className="!w-[40vw] hidden sm:block lg:!w-[20vw] gap-5 pt-5 pl-5 bg-white h-[90vh]">
        <div className="fixed">
        <h1>price to price</h1>
        <div className="flex flex-wrap !text-[12px] pt-3 !w-[40vw] lg:!w-[20vw]">
          {options.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              checked={selectedPriceRange === option.value}
              onChange={() => onPriceChange(option.value)}
            >
              {option.label}
            </Checkbox>
          ))}
        </div>
        <h1>Choose Brand</h1>
        <div className="flex flex-wrap pt-3">
          <Checkbox.Group
            options={brands}
            defaultValue={["Pear"]}
            className="!text-xl"
            onChange={onChange}
          />
        </div>
        </div>
      </div>
      <div>
        <List
          className="xsm:!w-[80vw] lg:!w-[75vw]"
          dataSource={subCategory}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          pagination={{
            pageSize: 8,
            align: "end",
            position: "top",
            size: "small",
          }}
          renderItem={(data, index) => {
            return (
              <List.Item className="!flex flex-wrap w-[100vw] lg:w-[60vw] !pt-3 !pl-2">
                <Card className="xl:w-[18vw] lg:w-[22vw] md:w-[30vw] xsm:!w-[90vw] h-[38vh] flex flex-col items-center justify-center">
                  <Image
                    src={data.image}
                    width={140}
                    height={140}
                    preview={false}
                  />
                  <p className="text-center">{data.name}</p>
                  <p className="text-center">{data.price}</p>
                </Card>
              </List.Item>
            );
          }}
        ></List>
      </div>
      <Drawer
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        placement="left"
        width={250}
      >
        <div className="w-[30vw]flex overflow-y-scroll gap-5 pt-5 pl-5 bg-white h-[100%]">
          <h1>price to price</h1>
          <div className="grid !text-[12px] pt-3">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                checked={selectedPriceRange === option.value}
                onChange={() => onPriceChange(option.value)}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
          <h1 className="pt-5">Choose Brand</h1>
          <div className="!flex !flex-col pt-3">
            <Checkbox.Group
              options={brands}
              defaultValue={["Pear"]}
              className="!text-xl"
              onChange={onChange}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default SubCategories;
