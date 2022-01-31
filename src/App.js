import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesButtonPage } from "./components/RQSuperHeroesButton.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { RQSuperHeroesMountPage } from "./components/RQSuperHeroesMount.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import ParallelQueriesPage from "./components/ParallelQueries.page";
import { DynamicParallelQueriesPage } from "./components/DynamicParallelQueries.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes Button</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes-mount">RQ Super Heroes Mount</Link>
              </li>
              <li>
                <Link to="/rq-parallel">RQ Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dynamic-parallel">RQ Dynamic Parallel</Link>
              </li>
              <li>
                <Link to="/rq-dependent-queries">RQ Dependent</Link>
              </li>
              <li>
                <Link to="/rq-paginated">RQ Paginate</Link>
              </li>
              <li>
                <Link to="/rq-infinite">RQ Infinite</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-infinite">
              <InfiniteQueriesPage />
            </Route>
            <Route path="/rq-paginated">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-dependent-queries">
              <DependentQueriesPage email="teste@teste.com" />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelQueriesPage heroIds={[1, 3]} />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>
            <Route path="/rq-super-heroes/:heroId">
              <RQSuperHeroPage />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesButtonPage />
            </Route>
            <Route path="/rq-super-heroes-mount">
              <RQSuperHeroesMountPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
