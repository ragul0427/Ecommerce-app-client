import React, { useEffect, useState } from "react";
import { Card, Checkbox, List, Image, Drawer } from "antd";
import { subCategories } from "../helper/subCategories";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function SubCategories() {
  const [subCategory, setSubCategory] = useState(subCategories);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [dummy, setDummy] = useState("");
  const [selectedValues, setSelectedValues] = useState(() => {
    return localStorage.getItem("selectedBrand") || "";
  });

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

    const selectedBrand = selectedValues.toString().toLowerCase();
    const filteredBrands = subCategories.filter((res, i) => {
      return res?.brand?.toLowerCase() == selectedBrand;
    });

    if (selectedPriceRange !== "" && selectedValues !== "") {
      console.log("true");
      console.log(subCategory,"wdbhkbhb")
      const filteredProducts = subCategories.filter((product) => {
        const price = parseInt(product.price);
        console.log(selectedBrand,product.brand,"price")
        return (
          price >= min &&
          price <= max &&
          product.categoryId == location.pathname.split("/")[2]&&
          product.brand.toLowerCase()==selectedBrand.toLowerCase()
        );
      });

      setSubCategory(filteredProducts)
    } else {
      if (selectedPriceRange === "" && selectedValues === "") {
        setSubCategory(
          subCategories.filter((res, i) => {
            return res.categoryId == location.pathname.split("/")[2];
          })
        );
      } else if (selectedPriceRange == "") {
        setSubCategory(filteredBrands);
      } else {
        setSubCategory(filteredProducts);
      }
    }
  }, [
    localStorage.getItem("selectedPriceRange"),
    localStorage.getItem("selectedBrand"),
    subCategories,
    selectedPriceRange,
    selectedValues,
    location.pathname.split("/")[2],
  ]);

  const onPriceChange = (selectedValues) => {
    setSelectedPriceRange(selectedValues);
    localStorage.setItem("selectedPriceRange", selectedValues);
    setOpen(false);
  };

  const onChange = (e) => {
    setSelectedValues(e.target.value);
    localStorage.setItem("selectedBrand", e.target.value);
    setOpen(false);
  };

  console.log(localStorage.getItem("selectedPriceRange"));

  const allProducts = () => {
    localStorage.removeItem("selectedPriceRange");
    localStorage.removeItem("selectedBrand");
    setSelectedPriceRange("");
    setSelectedValues("");
    setOpen(false)
  };

 
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
          <div className="flex !w-[18vw] justify-between">
            <h1>price to price</h1>
            <Checkbox
              checked={
                (selectedPriceRange=="" && selectedValues == "") ||
                (localStorage.getItem("selectedPriceRange")==null &&
                  localStorage.getItem("selectedBrand") == null)
                  ? true
                  : selectedPriceRange !==""||selectedValues!== ""
                  ? false
                  : ""
              }
              className="pt-1"
              onChange={(event) => {
                allProducts(event);
              }}
            >
              All
            </Checkbox>
          </div>
          <div className="flex flex-wrap pr-2 gap-3 !text-[12px] pt-3 !w-[40vw] lg:!w-[20vw]">
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
          <h1 className="pt-4">Choose Brand</h1>
          <div className="flex pr-3 flex-wrap gap-3 !text-[12px] pt-3 !w-[40vw] lg:!w-[20vw]">
            {brands.map((option) => (
              <Checkbox
                value={option.value}
                key={option.value}
                checked={selectedValues === option.value}
                onChange={onChange}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <div>
        <List
          className="xsm:!w-[90vw] lg:!w-[75vw]"
          dataSource={subCategory}
          grid={{
            gutter: 16,
            xs: 2,
            sm: 2,
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
              <List.Item className="!flex flex-wrap items-start justify-center w-[100vw] lg:w-[60vw] !pt-3 ">
                <Card className="xl:w-[18vw] lg:w-[22vw] md:w-[30vw] xsm:!w-[44vw] flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={data.image}
                      width={120}
                      height={120}
                      preview={false}
                      
                    />
                    <p className="text-center cursor-pointer">{data.name}</p>
                    <p className="text-center">{data.price}</p>
                  </div>

                  <div className="flex gap-3 items-center rounded-md justify-between pt-2">
                    <p className="bg-green-500 py-1 cursor-pointer px-5 md:px-10 rounded-md text-white text-[13px]">
                      <ShoppingCartCheckoutIcon className="!text-[18px]" />
                    </p>
                    <p className="bg-red-500 cursor-pointer px-5 py-1 md:px-10 rounded-md text-[13px] text-white">
                      Buy
                    </p>
                  </div>
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
         <div className="flex justify-between">
         <h1>price to price</h1>
         <Checkbox
              checked={
                (selectedPriceRange=="" && selectedValues == "") ||
                (localStorage.getItem("selectedPriceRange")==null &&
                  localStorage.getItem("selectedBrand") == null)
                  ? true
                  : selectedPriceRange !==""||selectedValues!== ""
                  ? false
                  : ""
              }
              className="pt-1"
              onChange={(event) => {
                allProducts(event);
              }}
            >
              All
            </Checkbox>
         </div>
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
          <div className="grid grid-cols-2 pr-3  gap-3 !text-[12px] pt-3 !w-[40vw] lg:!w-[20vw]">
            {brands.map((option) => (
              <Checkbox
                value={option.value}
                key={option.value}
                checked={selectedValues === option.value}
                onChange={onChange}
              >
                {option.label}
              </Checkbox>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default SubCategories;
