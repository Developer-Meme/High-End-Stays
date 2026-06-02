export interface Listing {
	id: string;
	name: string;
	location: 'Eldoret' | 'Meru';
	price: number;
	description: string;
	amenities: string[];
	image: string;
	bedrooms: number;
	bathrooms: number;
	guests: number;
	rating: number;
	reviewCount: number;
	isFeatured?: boolean;
	theme?: 'default' | 'luxury-dark';
}

export interface Review {
	id: string;
	name: string;
	rating: number;
	comment: string;
	date: string;
	location: string;
}

export interface TeamMember {
	id: string;
	name: string;
	role: string;
	description: string;
	phone: string;
	whatsapp: string;
}
