import React from 'react';

/**
 * @export
 * @param {boolean} [initialValue=false]
 * @returns {[boolean, () => void]}
 */

type UseToggle = [boolean, () => void];

export default function useToggle(initialValue = false): UseToggle {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v: boolean) => !v);
  }, []);
  return [value, toggle];
}
