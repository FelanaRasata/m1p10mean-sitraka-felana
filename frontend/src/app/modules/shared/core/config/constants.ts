import {
  faBasketShopping,
  faDolly,
  faList,
  faMoneyBillTrendUp,
  faTruckFast,
  faUsersGear,
  faUserShield,
  faUtensils,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'


export const API_ENDPOINTS = {
  user: 'users',
  delivery_men: 'users/delivery_men',
  order: 'orders',
  benefits: 'orders/benefits',
  dish: 'dishes',
  session: {
    sign_in: 'auth/sign_in',
    sign_up: 'auth/sign_up',
    sign_out: 'auth/sign_out',
    logged_in_user: 'auth/logged_in_user'
  }
}

export const KEYS = {
  token_key: '624d9ae426624d9ae426a0fd1c1d7bb7ada0fd1c1d7bb7ad',
  url_part_key: '624db2e1567624db2e156799a0cc0c9692299a0cc0c96922'
}


export interface RouteInfo {

  path: string;

  title: string;

  class: string;

  icon: IconDefinition;

}


export const CUSTOMER_ROUTES: RouteInfo[] = [
  {
    path: 'customer/restaurants',
    title: 'Make an order',
    class: '',
    icon: faBasketShopping
  }
]
const notifications = [
  {
    userId: '1',
    message: 'You got a fan badge',
    url: 'https://www.example.com/fans/badges/12'
  },
  {
    userId: '2',
    message: 'You are now member of yuzu group',
    url: 'https://www.example.com/groups/156'
  },
]

export const DELIVERY_ROUTES: RouteInfo[] = [
  {
    path: 'delivery',
    title: 'Deliveries',
    class: '',
    icon: faTruckFast
  }
]

export const ADMIN_ROUTES: RouteInfo[] = [
  {
    path: 'admin/orders',
    title: 'Orders',
    class: '',
    icon: faList
  },
  {
    path: 'admin/administrators',
    title: 'Managers',
    class: '',
    icon: faUserShield
  },
  {
    path: 'admin/delivery-men',
    title: 'Delivery men',
    class: '',
    icon: faDolly
  },
  {
    path: 'admin/customers',
    title: 'Customers',
    class: '',
    icon: faUsersGear
  },
  {
    path: 'admin/restaurants',
    title: 'Restaurants',
    class: '',
    icon: faUtensils
  },
  {
    path: 'admin/benefits',
    title: 'Benefits',
    class: '',
    icon: faMoneyBillTrendUp
  }
]

export const RESTAURANT_ROUTES: RouteInfo[] = [
  {
    path: 'restaurant/orders',
    title: 'Orders',
    class: '',
    icon: faList
  },
  {
    path: 'restaurant/dishes',
    title: 'Dishes',
    class: '',
    icon: faUtensils
  },
  {
    path: 'restaurant/benefits',
    title: 'Benefits',
    class: '',
    icon: faMoneyBillTrendUp
  }
]
