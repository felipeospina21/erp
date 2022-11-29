import React from 'react';

export default function categories(): JSX.Element {
  fetch('http://localhost:3000/api/category')
    .then((res) => res.json())
    .then((json) => console.log(json));
  return <div>cats</div>;
}
