export const homeLoader = ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") ?? "";
  
  const categories = url.searchParams
    .getAll("categories")
    .filter((categoryId) => Boolean(categoryId))
    .map((categoryId) => Number(categoryId));
    
  return { categories, title };
};
