import React, { useRef } from 'react';

export function CustomFileInput(): JSX.Element {
  const fileRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  // function handleClick(){
  //   if(fileRef?.current){

  //     fileRef.current.click()
  //   }
  // }

  return (
    <div>
      <button
        onClick={(): void => {
          return;
        }}
      >
        Custom File Input Button
      </button>
      <input ref={fileRef} onChange={handleChange} multiple={false} type="file" hidden />
    </div>
  );
}
