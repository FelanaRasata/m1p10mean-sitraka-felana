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
    users: 'users',
    orders: 'orders',
    benefits: 'orders/benefits',
    cars: 'cars',
    repairs: {
        list: 'repairs',
        drop_off_car: 'repairs/drop_off_car/:car_id',
        init: 'repairs/init/:repair_id',
        in_progress: 'repairs/finance/validate',
        proceed: 'repairs/proceed/:repair_id',
        finish: 'repairs/finish/:repair_id',
    },
    car_diagnosis: 'car_diagnosis',
    user: 'users',
    car: 'cars',
    repairs_car: '',
    repair_types:'repair_types',
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
        path: 'customer/cars',
        title: 'My cars',
        class: '',
        icon: faBasketShopping,
    },
    {
        path: 'customer/repairs',
        title: 'Repairs in progress',
        class: '',
        icon: faBasketShopping,
    },
]


export const WORKSHOP_ROUTES: RouteInfo[] = [
    {
        path: 'workshop/repairs',
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
        path: 'financial/repairs/initiated',
        title: 'Repairs Initiated',
        class: '',
        icon: faUserShield,
    },
    {
        path: 'financial/repairs/paid',
        title: 'Repairs Paid',
        class: '',
        icon: faDolly,
    },
]
