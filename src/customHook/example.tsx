import { useEffect, useState } from "react";

type InitStateType = any


function useCustomHook(
  initialValue: InitStateType,
  newValueInit: InitStateType
) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Сайд-эффекты могут быть выполнены здесь, например, запросы к серверу
    console.log("Кастомный хук был запущен");
  }, []);

  const updateValue = (newValue: InitStateType) => {
    setValue(newValue);
  };

  return [value, updateValue];
}

export default useCustomHook;
