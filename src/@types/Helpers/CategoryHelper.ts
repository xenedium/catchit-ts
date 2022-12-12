import { CategoryDto } from '../';
import { ICategory } from '../../Models/Interfaces';

export function CategoryHelper (article: ICategory): CategoryDto {
    return {
        _id: article._id,
        name: article.name,
        image: article.image,
    };
}