import { ArticleDto } from '../';
import { IArticle, ICategory, IUser } from '../../Models/Interfaces';
import { UserHelper, CategoryHelper } from '.';

export function ArticleHelper (article: IArticle): ArticleDto {
    return {
        _id: article._id,
        title: article.title,
        images: article.images,
        description: article.description,
        category: CategoryHelper(article.category as ICategory),
        seller: UserHelper(article.seller as IUser),
        condition: article.condition,
        price: article.price,
        quantity: article.quantity,
        isSold: article.isSold,
        city: article.city,
    };
}