import { useEffect, useState } from 'react';

export function useConfirmDelete(
  deleteFunction: () => void
): React.Dispatch<React.SetStateAction<boolean>> {
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (confirmDelete) {
      deleteFunction();
      setConfirmDelete(false);
    }
  }, [confirmDelete, deleteFunction]);

  return setConfirmDelete;
}
