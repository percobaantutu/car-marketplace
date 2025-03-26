import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from "@/Shared/Data";

function Search() {
  console.log(Data);

  return (
    <div className="flex bg-white rounded-xl md:rounded-full flex-col md:flex-row  p-2 md:p-5  gap-1 lg:gap-10 mx-5 items-center w-[60%]">
      <Select>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">New</SelectItem>
          <SelectItem value="dark">Used</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg">
          <SelectValue placeholder="Car Brand" />
        </SelectTrigger>
        <SelectContent>
          {Data.carBrand.map((car, index) => (
            <SelectItem value={car.name} key={index}>
              {car.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="p-2 text-2xl bg-black text-white rounded-full hover:scale-105 transition-all cursor-pointer" aria-label="Search">
        <CiSearch />
      </div>
    </div>
  );
}

export default Search;
