import { Dish } from './types';

export const mockDishes: Dish[] = [
  {
    id: '1',
    name: 'Feijoada Completa',
    description: 'Feijoada tradicional com todos os acompanhamentos: arroz, couve, farofa, laranja e vinagrete. Serve 2 pessoas.',
    price: 45.00,
    photo: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=800&h=600&fit=crop',
    category: 'Brasileira',
    chef: {
      id: 'chef1',
      name: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      rating: 4.8,
      totalReviews: 127,
      location: 'Copacabana, RJ',
      distance: 1.2
    },
    availableDate: 'Hoje',
    availableTime: '12:00 - 14:00',
    eatInAvailable: true,
    deliveryAvailable: true,
    preparationTime: 30
  },
  {
    id: '2',
    name: 'Lasanha à Bolonhesa',
    description: 'Lasanha caseira com molho bolonhesa artesanal, queijo gratinado e manjericão fresco. Massa feita em casa.',
    price: 38.00,
    photo: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&h=600&fit=crop',
    category: 'Italiana',
    chef: {
      id: 'chef2',
      name: 'Ana Oliveira',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      rating: 4.9,
      totalReviews: 203,
      location: 'Ipanema, RJ',
      distance: 2.5
    },
    availableDate: 'Hoje',
    availableTime: '18:00 - 20:00',
    eatInAvailable: false,
    deliveryAvailable: true,
    preparationTime: 25
  },
  {
    id: '3',
    name: 'Moqueca Capixaba',
    description: 'Moqueca de peixe fresco com camarões, dendê, leite de coco, pimentões e coentro. Acompanha arroz e pirão.',
    price: 52.00,
    photo: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop',
    category: 'Brasileira',
    chef: {
      id: 'chef3',
      name: 'Joana Santos',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
      rating: 5.0,
      totalReviews: 89,
      location: 'Leblon, RJ',
      distance: 3.1
    },
    availableDate: 'Amanhã',
    availableTime: '12:00 - 14:00',
    eatInAvailable: true,
    deliveryAvailable: true,
    preparationTime: 40
  },
  {
    id: '4',
    name: 'Pad Thai Autêntico',
    description: 'Macarrão de arroz salteado com camarões, tofu, amendoim, broto de feijão e molho tamarindo. Receita tailandesa original.',
    price: 35.00,
    photo: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop',
    category: 'Asiática',
    chef: {
      id: 'chef4',
      name: 'Lina Chen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
      rating: 4.7,
      totalReviews: 156,
      location: 'Botafogo, RJ',
      distance: 1.8
    },
    availableDate: 'Hoje',
    availableTime: '19:00 - 21:00',
    eatInAvailable: true,
    deliveryAvailable: true,
    preparationTime: 20
  },
  {
    id: '5',
    name: 'Bobó de Camarão',
    description: 'Camarões frescos em creme de mandioca com leite de coco, azeite de dendê e temperos baianos. Acompanha arroz branco.',
    price: 48.00,
    photo: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800&h=600&fit=crop',
    category: 'Brasileira',
    chef: {
      id: 'chef1',
      name: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      rating: 4.8,
      totalReviews: 127,
      location: 'Copacabana, RJ',
      distance: 1.2
    },
    availableDate: 'Amanhã',
    availableTime: '18:00 - 20:00',
    eatInAvailable: false,
    deliveryAvailable: true,
    preparationTime: 35
  },
  {
    id: '6',
    name: 'Risoto de Funghi',
    description: 'Risoto cremoso com mix de cogumelos frescos, parmesão italiano, manteiga e vinho branco. Finalizado com trufa.',
    price: 42.00,
    photo: 'https://images.unsplash.com/photo-1476124369491-c4f6c1f7a1b6?w=800&h=600&fit=crop',
    category: 'Italiana',
    chef: {
      id: 'chef2',
      name: 'Ana Oliveira',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      rating: 4.9,
      totalReviews: 203,
      location: 'Ipanema, RJ',
      distance: 2.5
    },
    availableDate: 'Hoje',
    availableTime: '19:00 - 21:00',
    eatInAvailable: true,
    deliveryAvailable: true,
    preparationTime: 30
  }
];

export const categories = [
  'Todas',
  'Brasileira',
  'Italiana',
  'Asiática',
  'Vegetariana',
  'Sobremesas'
];
