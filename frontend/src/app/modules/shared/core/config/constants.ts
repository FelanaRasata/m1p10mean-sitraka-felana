import {
    faBasketShopping,
    faDolly,
    faList,
    faMoneyBillTrendUp,
    faTruckFast,
    faUsersGear,
    faUserShield,
    faUtensils,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons'


export const API_ENDPOINTS = {
    user: 'users',
    delivery_men: 'users/delivery_men',
    order: 'orders',
    benefits: 'orders/benefits',
    car: 'cars',
    repairs_car: '',
    session: {
        sign_in: 'auth/sign_in',
        sign_up: 'auth/sign_up',
        sign_out: 'auth/sign_out',
        logged_in_user: 'auth/logged_in_user',
    },
}

export const KEYS = {
    token_key: '624d9ae426624d9ae426a0fd1c1d7bb7ada0fd1c1d7bb7ad',
    url_part_key: '624db2e1567624db2e156799a0cc0c9692299a0cc0c96922',
}


export interface RouteInfo {

    path: string;

    title: string;

    class: string;

    icon: IconDefinition;

}


export const CUSTOMER_ROUTES: RouteInfo[] = [
    {
        path: 'customer/car_list',
        title: 'Your cars',
        class: '',
        icon: faBasketShopping,
    },
    {
        path: 'customer/repair_list',
        title: 'Your repairs',
        class: '',
        icon: faBasketShopping,
    },
]


export const WORKSHOP_ROUTES: RouteInfo[] = [
    {
        path: 'workshop/filtered_repairs',
        title: 'Repair List',
        class: '',
        icon: faTruckFast,
    },
]

export const FINANCIAL_ROUTES: RouteInfo[] = [
    {
        path: 'financial/dashboard',
        title: 'Dashboard',
        class: '',
        icon: faList,
    },
    {
        path: 'financial/repairs_initiated',
        title: 'Repairs Initiated',
        class: '',
        icon: faUserShield,
    },
    {
        path: 'financial/repairs_paid',
        title: 'Repairs Paid',
        class: '',
        icon: faDolly,
    },
]
