import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { API_URL_ENDPOINT } from '@/constants/constants';
import dayjs from 'dayjs';

const MealForm = ({
  mealForm,
  setMealForm,
  totalMealsAvailable,
  errors,
  siteSelected,
  mealFormDisabled,
}) => {
  const [mealsAvailable, setMealsAvailable] = useState('');
  const [validDates, setValidDates] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mealsReceived' || name === 'mealsFromPreviousDays') {
      const newValue = value < 0 ? 0 : value;
      setMealForm({ ...mealForm, [name]: newValue });
    } else {
      setMealForm({ ...mealForm, [name]: value });
    }
  };

  const handleDateChange = (name, value) => {
    setMealForm({ ...mealForm, [name]: value });
  };

  useEffect(() => {
    setMealForm({ ...mealForm, date: '' });
  }, [mealForm.mealType]);

  useEffect(() => {
    if (!siteSelected) return;
    setMealsAvailable('');
    fetch(API_URL_ENDPOINT + `?type=siteMeals&siteName=${siteSelected}`)
      .then((res) => res.json())
      .then((data) => {
        setMealsAvailable(data);
      })
      .catch((e) => console.error('There was an error: ', e));

    fetch(API_URL_ENDPOINT + `?type=siteDates&siteName=${siteSelected}`)
      .then((res) => res.json())
      .then((data) => {
        setValidDates(data);
      })
      .catch((e) => console.error('There was an error: ', e));
  }, [siteSelected]);

  const isDateValid = (date) => {
    const formattedDate = dayjs(date).format('MM/DD/YYYY');

    const disabledDates = validDates
      .filter(([date, mealType]) => mealType === mealForm.mealType)
      .map(([date]) => date);

    return disabledDates.includes(formattedDate);
  };

  return (
    <div className="w-[350px] lg:w-[400px] xl:w-[500px] flex justify-center bg-white">
      <form
        action="submit"
        className="w-full flex flex-col justify-evenly h-[396px] rounded-lg shadow-md py-4 px-8"
      >
        <Box>
          <FormControl fullWidth error={Boolean(errors.mealType)}>
            <InputLabel
              id="meal"
              size="small"
              sx={{
                '&.Mui-focused': {
                  color: '#4f46e5', // Label color when focused
                },
              }}
            >
              Meal type
            </InputLabel>
            <Select
              id="meal"
              label="Meal type"
              value={mealForm.mealType}
              onChange={handleChange}
              name="mealType"
              size="small"
              readOnly={mealFormDisabled}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4f46e5', // Default border color
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4f46e5', // Border color when focused
                },
              }}
            >
              {mealsAvailable &&
                mealsAvailable.map((meal) => {
                  if (meal[1]) {
                    return (
                      <MenuItem key={meal[0]} value={meal[0]}>
                        {meal[0]}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
        </Box>

        {errors.mealType && (
          <span className="text-xs ml-3 text-red-600">{errors.mealType}</span>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              label="Delivery time"
              value={mealForm.deliveryTime}
              onChange={(newValue) =>
                handleDateChange('deliveryTime', newValue)
              }
              readOnly={mealFormDisabled}
              slotProps={{
                textField: {
                  size: 'small',
                  error: Boolean(errors.deliveryTime),
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4f46e5', // Default border color
                    },
                    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#4f46e5', // Border color when focused
                      },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#4f46e5', // Label text color when focused
                    },
                  },
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        {errors.deliveryTime && (
          <span className="text-xs ml-3 text-red-600">
            {errors.deliveryTime}
          </span>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Date"
              value={mealForm.date}
              onChange={(newValue) => handleDateChange('date', newValue)}
              disableFuture
              readOnly={!siteSelected || !validDates || !mealForm.mealType}
              shouldDisableDate={isDateValid}
              slotProps={{
                textField: {
                  size: 'small',
                  error: Boolean(errors.date),
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4f46e5', // Default border color
                    },
                    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: '#4f46e5', // Border color when focused
                      },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#4f46e5', // Label text color when focused
                    },
                  },
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        {errors.date && (
          <span className="text-xs ml-3 text-red-600">{errors.date}</span>
        )}

        <div className="w-full mt-2">
          <TextField
            type="number"
            label="Meals Received/Prepared"
            variant="outlined"
            value={mealForm.mealsReceived}
            onChange={handleChange}
            error={Boolean(errors.mealsReceived)}
            name="mealsReceived"
            size="small"
            InputProps={{
              readOnly: mealFormDisabled,
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4f46e5', // Default border color
              },
              '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: '#4f46e5', // Border color when focused
                },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4f46e5', // Label color when focused
              },
            }}
            fullWidth
          />
        </div>
        {errors.mealsReceived && (
          <span className="text-xs ml-3 text-red-600">
            {errors.mealsReceived}
          </span>
        )}

        <div className="w-full mt-2">
          <TextField
            type="number"
            label="Meals from previous days"
            variant="outlined"
            value={mealForm.mealsFromPreviousDays}
            onChange={handleChange}
            error={Boolean(errors.mealsFromPreviousDays)}
            name="mealsFromPreviousDays"
            size="small"
            InputProps={{
              readOnly: mealFormDisabled,
            }}
            sx={{
              color: 'indigo',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#4f46e5', // Default border color
              },
              '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: '#4f46e5', // Border color when focused
                },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4f46e5', // Label color when focused
              },
            }}
            fullWidth
          />
        </div>
        {errors.mealsFromPreviousDays && (
          <span className="text-xs ml-3 text-red-600">
            {errors.mealsFromPreviousDays}
          </span>
        )}

        <div className="w-full flex justify-between items-center mt-2 ">
          <span className="p-[2px] relative w-[80px]">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-1 bg-white text-black text-lg font-medium text-center rounded-[6px] relative group transition duration-200 hover:bg-transparent hover:text-white truncate">
              {totalMealsAvailable}
            </div>
          </span>
          {/* <span className="text-lg font-medium text-center border border-indigo-600 bg-indigo-50 rounded-lg px-4 py-1 w-[80px]">
            {totalMealsAvailable}
          </span> */}
          <span className="font-semibold text-base md:text-lg text-gray-900">
            Total Meals Available
          </span>
        </div>
      </form>
    </div>
  );
};

export default MealForm;
