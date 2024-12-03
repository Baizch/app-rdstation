const calculateMatchScore = (userPreferences, userFeatures, product) => {
  const preferenceScore = (product.preferences || []).filter((preference) =>
    (userPreferences || []).includes(preference)
  ).length;

  const featureScore = (product.features || []).filter((feature) =>
    (userFeatures || []).includes(feature)
  ).length;

  return preferenceScore + featureScore;
};

export default calculateMatchScore;
