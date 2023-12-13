import { useState } from "react";

export const useActiveMonth = () => {
  const [activeDate, setActiveDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const nextMonth = () => {
    setActiveDate((prev) => {
      if (prev.month === 11) {
        return { month: 0, year: prev.year + 1 };
      }
      return { ...prev, month: prev.month + 1 };
    });
  };

  const previousMonth = () => {
    setActiveDate((prev) => {
      if (prev.month === 0) {
        return { month: 11, year: prev.year - 1 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  return {
    activeDate,
    nextMonth,
    previousMonth,
  };
};
