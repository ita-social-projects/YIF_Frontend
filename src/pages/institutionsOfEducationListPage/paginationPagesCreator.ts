export function PaginationPagesCreator(
  totalPages: number,
  currentPage: number
) {
  let pages = [];

  if (totalPages > 3) {
    if (currentPage > 2) {
      for (let i = currentPage - 1; i <= currentPage + 2; i++) {
        pages.push(i);
        if (i === totalPages) break;
      }
    } else {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
        if (i === totalPages) break;
      }
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return pages;
}
