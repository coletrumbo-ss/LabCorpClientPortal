export const apiRoute = 'https://sswilbobraggins.api.crm.dynamics.com/api/data/v9.1/';

export const getConfig = {
    method: 'get',
    'OData-MaxVersion': 4.0,
    'OData-Version': 4.0,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    headers: {
        'Prefer': "odata.include-annotations=*"
    }
};