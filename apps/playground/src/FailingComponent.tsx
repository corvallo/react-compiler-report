import { useState } from "react";

type Props = { value: number };

export function FailingComponent({ value }: Props) {
  if (value) {
    const [x] = useState(value); 
    return <div>{x} asd1</div>;
  }

  return <div>disabled</div>;
}
