const { Ingredient } = require("../models/recipes");

const getRecipeIngredients = async (recipeIngredients) => {
  const allIngredientList = await Ingredient.find({
    _id: {
      $in: recipeIngredients.map((recipeIngredient) =>
        recipeIngredient.id ? recipeIngredient.id : recipeIngredient.ingredient
      ),
    },
  });

  return recipeIngredients.reduce((acc, currentIngredient, index) => {
    return [...acc, { ...currentIngredient, ...allIngredientList[index]._doc }];
  }, []);
};

module.exports = getRecipeIngredients;
