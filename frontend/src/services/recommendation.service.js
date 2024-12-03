// getRecommendations.js
import calculateMatchScore from '../utils/calculateMatchScore';

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  if (!selectedPreferences.length && !selectedFeatures.length) {
    return [];
  }

  const scoredProducts = products.map((product) => ({
    ...product,
    score: calculateMatchScore(selectedPreferences, selectedFeatures, product),
  }));

  const sortedProducts = scoredProducts.sort((a, b) => {
    if (b.score === a.score) {
      return b.id - a.id;
    }
    return b.score - a.score;
  });

  if (selectedRecommendationType === 'SingleProduct') {
    return sortedProducts.slice(0, 1);
  }

  if (selectedRecommendationType === 'MultipleProducts') {
    return sortedProducts.filter((product) => product.score > 0);
  }

  return [];
};

const recommendationService = { getRecommendations };

export default recommendationService;
