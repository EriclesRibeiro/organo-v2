import { Dispatch, useEffect, useState } from "react"

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue])

  return [storedValue, setStoredValue]
}