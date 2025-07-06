import { type Models } from 'react-native-appwrite'
import { ICategory } from './category.interface'
import { IProduct } from './product.interface'
import { IUser } from './user.interface'

export interface IUserAW extends Models.Document, IUser {}

export interface ICategoryAW extends Models.Document, ICategory {}

export interface IProductAW extends Models.Document, IProduct {}
