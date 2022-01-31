import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";



export const RQSuperHeroesButtonPage = () => {
  const [intervalMs, setIntervalMs] = useState(3000);
  const [isEnabled, setIsEnabled] = useState(false);

  const onSuccess = (data) => {
    // if (data.data.length === 4) {
      // refetch()
    // }
    console.log("perform side effect on success", data);
  };
  const onError = () => {
    // setIsEnabled(false);
    console.log("perform side effect on failure");
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>fetch</button>
      {data.data ? data.data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      }) : (<div>noheroes</div>)}
    </>
  );
};
