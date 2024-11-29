'use client';

import { AngleSlider } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

export default function Page() {
  const [value, setValue] = useInputState(0);

  return (
    <div>
      <AngleSlider
        value={value}
        onChange={setValue}
        aria-label='Angle slider'
      />
    </div>
  );
}
