export const LOCAL_URL = 'http://localhost:3001';

export const PATH_CONFIG = {
  LOGIN_URL: `${LOCAL_URL}/auth/login`,

  CREATE_USER_URL: `${LOCAL_URL}/users/createUser`,

  AVATARS_URL: `${LOCAL_URL}/uploads/avatars/{filename}`,

  LOT_IMAGE_URL: `${LOCAL_URL}/uploads/lots/{filename}`,
  LOT_FULL_DATA_URL: `${LOCAL_URL}/lots/getLotFullData/{idLot}`,
  ALL_LOTS: `${LOCAL_URL}/lots/getAllLots`,
  LOTS_BY_CATEGORY_URL: `${LOCAL_URL}/lots/getLotsByCategory/{idCategory}`,
  ADD_LOT_URL: `${LOCAL_URL}/lots/addLot`,
  USER_LOTS: `${LOCAL_URL}/lots/getUserLots/{idCreator}`,
  SEARCH_LOTS: `${LOCAL_URL}/lots/searchLots`,

  CATEGORIES_URL: `${LOCAL_URL}/categories/getAllCategories`,
}
