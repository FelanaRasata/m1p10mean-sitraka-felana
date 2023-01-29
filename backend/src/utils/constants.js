export const CONSTANTS = {
    'custom_labels': {
        'totalDocs': 'totalItems',
        'docs': 'items',
        'limit': 'itemsPerPage',
        'meta': 'paginator'
    },
    'nodemailer_options': {
        'service': 'gmail',
        'port': 465,
        'secure': true,
        'logger': true,
        'debug': true,
        'secureConnection': false,
        'auth': {
            'user': 'felanarasata91@gmail.com',
            'pass': 'eclwjssfidepmqhe',
            // "pass": "gmail@0901",
        },
        'tls': {
            'rejectUnAuthorized': true
        }
    },
    'password_options': {
        'length': 8,
        'numbers': true,
        'symbols': true,
        'strict': true,
        'exclude': '~{[|`\\^]}¤²<>'
    }
}

export const EXPENSES = {
    diagnosis: 70000,
    salaries: 7000000,
    others: 2000000,
    rent: 700000,
    manpower: 0.05
}