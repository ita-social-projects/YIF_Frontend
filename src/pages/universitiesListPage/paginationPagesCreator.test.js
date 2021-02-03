import { PaginationPagesCreator } from './paginationPagesCreator';

it('renders without crashing, if total = 3', () => {
  const request = PaginationPagesCreator(3, 1);
  return expect(request).toMatchObject([1, 2, 3]);
});

it('renders without crashing, if total = 2', () => {
  const requestSecond = PaginationPagesCreator(4, 3);
  return expect(requestSecond).toMatchObject([2, 3, 4]);
});

it('renders without crashing, if total = 1', () => {
  const requestThird = PaginationPagesCreator(4, 1);
  return expect(requestThird).toMatchObject([1, 2, 3]);
});
