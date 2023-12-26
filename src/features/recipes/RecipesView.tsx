import { useRSelector } from '../../hooks/reducs';

import { getRecipesState } from './recipesReducer';

import Error from '../../UI/Error';
import Empty from '../../UI/Empty';
import RecipeItem from './RecipeItem';
import Spinner from '../../UI/Spinner';
import CopyRight from '../../UI/CopyRight';
import Pagination from '../../UI/Pagination';
import { Recipe } from '../../shared/types';

interface Data {
  isLoading: boolean;
  error: string;
  currentRecipes: Recipe[];
}

const RecipesView = () => {
  const { isLoading, error, currentRecipes }: Data =
    useRSelector(getRecipesState);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!currentRecipes.length) return <Empty />;

  return (
    <div className="flex flex-col py-8 px-0 justify-between">
      <ul className="list-none mb-5">
        {currentRecipes.map(recipe => (
          <RecipeItem key={recipe.recipe_id} recipe={recipe} />
        ))}
      </ul>

      <div>
        <Pagination />
        <CopyRight />
      </div>
    </div>
  );
};

export default RecipesView;
