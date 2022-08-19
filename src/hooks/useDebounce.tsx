import { useEffect, useState } from 'react';

type UseDebounce = [string, React.Dispatch<React.SetStateAction<string>>];

function useDebounce(initialValue: string, delay: number): UseDebounce {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialValue);

  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay);
    return () => clearTimeout(debounceId);
  }, [actualValue, delay]);
  return [debounceValue, setActualValue];
}

export default useDebounce;
