import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  return axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
