import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { FaFilter } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineReload } from 'react-icons/ai';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    setIsFilterVisible(false);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="mb-6">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFilterVisible(!isFilterVisible)}
          className={`flex items-center justify-center w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
            isFilterVisible ? 'bg-gray-800' : 'bg-red-600'
          } text-white shadow-lg`}
        >
          {isFilterVisible ? (
            <>
              <AiOutlineClose className="mr-2" />
              Close Filter
            </>
          ) : (
            <>
              <FaFilter className="mr-2" />
              Show Filters
            </>
          )}
        </button>
      </div>

      <div className={`glass-card rounded-2xl p-6 ${isFilterVisible ? 'block' : 'hidden md:block'}`}>
        <div className="flex items-center gap-2 mb-6">
          <FaFilter className="text-red-600 w-4 h-4" />
          <h2 className="font-bold text-xl text-gray-900 dark:text-white">Filter Jobs</h2>
        </div>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">{data.filterType}</h3>
              <div className="space-y-3">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value={item} id={itemId} className="border-gray-300 dark:border-gray-600 text-red-600 focus:ring-red-500" />
                      <Label htmlFor={itemId} className="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors cursor-pointer font-medium">{item}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {selectedValue && (
        <div className="md:hidden mt-4">
          <button
            onClick={() => setIsFilterVisible(true)}
            className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold transition-all"
          >
            <AiOutlineReload className="mr-2 text-red-600" />
            Update Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterCard;
