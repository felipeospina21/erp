import { useState, useEffect } from 'react';

export function useValidateTextLen(text: string): boolean {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (text.length > 50) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [text]);

  return isValid;
}
