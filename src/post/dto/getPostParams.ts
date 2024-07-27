import { Post_Categories } from '@prisma/client';

export interface GetPostParams {
  categoryType?: Post_Categories;
}
