import { Dispatch, useEffect, useState } from "react";
import { TOrgano } from "../@types/TOrgano";

export default function useLocalStorage(key: string, initialValue: TOrgano[]): [TOrgano[], Dispatch<React.SetStateAction<TOrgano[]>>] {
  const [storedValue, setStoredValue] = useState<TOrgano[]>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue])

  return [storedValue, setStoredValue]
}