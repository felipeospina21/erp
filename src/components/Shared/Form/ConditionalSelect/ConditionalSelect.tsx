import { Options } from '@/redux/services';
import React from 'react';
import { CustomSelect } from '../../CustomSelect';

export interface ConditionalSelectProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  cityOptions: Array<Options> | undefined;
}

export function ConditionalSelect({
  handleChange,
  cityOptions,
}: ConditionalSelectProps): JSX.Element {
  return (
    <>
      <CustomSelect
        name="deps"
        id="deps"
        label="deps"
        options={[
          { _id: 'Antioquia', name: 'Antioquia' },
          { _id: 'Caldas', name: 'Caldas' },
        ]}
        onChangeFn={handleChange}
        placeholder="departamento"
        size="md"
      />

      <CustomSelect
        name="cities"
        id="cities"
        label="cities"
        options={cityOptions}
        onChangeFn={handleChange}
        placeholder="cities"
        size="md"
      />
    </>
  );
}
