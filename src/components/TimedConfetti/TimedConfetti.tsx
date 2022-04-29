import ReactConfetti, {
  Props as ReactConfettiProps,
} from "@sekmet/react-confetti";
import { useEffect, useState } from "react";

export const TimedConfetti = ({
  ms = 5000,
  numberOfPieces = 100,
  ...props
}: ReactConfettiProps & { ms?: number }) => {
  const [recycle, setRecycle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecycle(false);
    }, ms);
  }, [ms]);

  return (
    <ReactConfetti
      recycle={recycle}
      numberOfPieces={numberOfPieces}
      {...props}
    />
  );
};
