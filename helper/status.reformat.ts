import { ProductStatus } from '@/types/product.interface'

export const getReformatedStatusText = (status: ProductStatus) => {
	switch (status) {
		case ProductStatus.ACTIVE:
			return 'Доступен'
		case ProductStatus.ARCHIVED:
			return 'Архивирован'
		case ProductStatus.BLOCKED:
			return 'Заблокирован'
		case ProductStatus.RENTED:
			return 'Арендован'
		case ProductStatus.RESERVED:
			return 'Зарезервирован'
	}
}

export const getReformatedStatusColor = (status: ProductStatus) => {
	switch (status) {
		case ProductStatus.ACTIVE:
			return 'text-greenAccent'
		case ProductStatus.ARCHIVED:
			return 'text-orangeAccent'
		case ProductStatus.BLOCKED:
			return 'text-redWarning'
		case ProductStatus.RENTED:
			return 'text-orangeAccent'
		case ProductStatus.RESERVED:
			return 'text-orangeAccent'
	}
}
