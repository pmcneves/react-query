import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // staleTime: 30000
    // refetchOnMount: true, //true (default), false, 'always'
    // refetchOnWindowFocus: 'always'
    // refetchInterval: intervalMs,
    // refetchIntervalInBackground: true
    // enabled: isEnabled,
    onSuccess,
    onError,
    // select: (data) => data.data.map((hero) => hero.name),
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   //re-fetch data
    //   // queryClient.invalidateQueries("super-heroes");

    //   //update query cache
    //   queryClient.setQueriesData('super-heroes', (oldQuerydata) => {
    //     return {
    //       ...oldQuerydata,
    //       data: [...oldQuerydata.data, data.data]
    //     }
    //   })
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueriesData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data.length + 1, ...newHero },
          ],
        };
      });
      return {
        //if mutation fails returns previous data
        previousHeroData,
      };
    },
    //if mutation fails, calls this
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },

    //after mutation or error, calls this
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
