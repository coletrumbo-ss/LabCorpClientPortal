import { GRAB_INVOICES_SUCCESFUL, GRAB_INVOICES_FAILURE, GRAB_INVOICES_PENDING} from './actionTypes';
import { invoiceApi } from "../../utils";
import axios from "axios";


// const generateAccessToken = () => {
//     // var axios = require('axios');
//     // var FormData = require('form-data');
//     // var data = new FormData();
//     var data = [];
//     data.append('client_id', 'efa93954-ca45-47d5-9f92-b628f05b4871');
//     data.append('scope', 'https://sswilbobraggins.crm.dynamics.com/.default');
//     data.append('client_secret', '79SzE_oKo7tfHfu.4X-mw9j2N4.t3uWN5~');
//     data.append('grant_type', 'client_credentials');
//     // var data = {
        
//     // }
    
//     var config = {
//       method: 'post',
//       url: 'https://login.microsoftonline.com/58bf51ec-ca22-48d9-ad93-e9d44309b27a/oauth2/v2.0/token',
//       headers: { 
//         'Host': 'login.microsoftonline.com', 
//         'Content-Type': 'application/x-www-form-urlencoded', 
//         'Cookie': 'x-ms-gateway-slice=prod; stsservicecookie=ests; fpc=AvSRHBlYM9dLq8lRuOMaWjv9eeWLAQAAAIoImNYOAAAA', 
//         'client_id': 'efa93954-ca45-47d5-9f92-b628f05b4871',
//         'scope': 'https://sswilbobraggins.crm.dynamics.com/.default',
//         'client_secret': '79SzE_oKo7tfHfu.4X-mw9j2N4.t3uWN5~',
//         'grant_type': 'client_credentials'
//         // ...data.getHeaders()
//       },
//       data: data
//     };
    
//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }



export const grabInvoices = (customerid) => {
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJodHRwczovL3Nzd2lsYm9icmFnZ2lucy5jcm0uZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNThiZjUxZWMtY2EyMi00OGQ5LWFkOTMtZTlkNDQzMDliMjdhLyIsImlhdCI6MTU5NDI0MDg5MywibmJmIjoxNTk0MjQwODkzLCJleHAiOjE1OTQyNDQ3OTMsImFpbyI6IkUyQmdZR2g4b09iNjlLSkVpWE5keXdTK3dNcVBBQT09IiwiYXBwaWQiOiJlZmE5Mzk1NC1jYTQ1LTQ3ZDUtOWY5Mi1iNjI4ZjA1YjQ4NzEiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81OGJmNTFlYy1jYTIyLTQ4ZDktYWQ5My1lOWQ0NDMwOWIyN2EvIiwib2lkIjoiNDRiM2FlZGItMWNlOC00YmY0LWFiMmQtZjJhZGVjYTJjYTZkIiwic3ViIjoiNDRiM2FlZGItMWNlOC00YmY0LWFiMmQtZjJhZGVjYTJjYTZkIiwidGlkIjoiNThiZjUxZWMtY2EyMi00OGQ5LWFkOTMtZTlkNDQzMDliMjdhIiwidXRpIjoidWJHeGJhVUwxa1dTaER1a01QenRBQSIsInZlciI6IjEuMCJ9.ZVhN52JtwZE3neptNovd2eK8TtXcrNe3Fd5pZs-N-EPl7hYPlw_S2Kvpp8KeYU2Yu4h89WL2iGtGbdw5AXuTAADZUuL0oYEu6LGrAPak5n6jGR6GzShAh-03z1DomntHe1Lfi4ugojNFWvMPnEtQD1tgxcOZhy9QgvoinTqjM0J6S_GjlDLBirxB1ziG_FP43d9OBq6UFftMgBgBZdWlga_-1ttAAUmMu0uao8FjKH-sifFu88OrpqSY6EQAk5EQByR4Hqz_wFaKaWLOnGV8cy8WjGGDAU8g7BYbnnWoFSPrkUCQDZw6CV-N8WzqEQSdRVJ3bhSpILebcRjM7gNvrA'
    var config = {
        method: 'get',
        url: `https://sswilbobraggins.crm.dynamics.com/api/data/v9.1/invoices?$select=invoicenumber,name,duedate,totalamount,description&$expand=invoice_details($select=invoicedetailid,priceperunit,productname),customerid_contact($select=ss_stripeid)&$filter=_customerid_value%20eq%20${customerid}`,
        headers: { 
            'Authorization': `Bearer ${accessToken}`, 
            'Cookie': 'ARRAffinity=6a8f7cd71f11c2b510d8550123c171c66ae60d2845592c7c2250ea645dabc54a; ReqClientId=616b95a9-6995-4aff-b917-ad7068fd97e8; orgId=d1c2af78-68e3-490e-a502-af5e7047a5dd'
        }
    };
    return dispatch => {
        dispatch(_grabInvoicesStarted());
        localStorage.setItem('accessToken', accessToken)
        return axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data.value));
          dispatch(_grabInvoicesSuccess(response.data.value));
        })
        .catch(function (error) {
          console.log(error);
          dispatch(_grabInvoicesFailed(error));
        });

        // return invoiceApi
        // .isValidInvoice(customerid)
        // .then(res => {
        //     dispatch(_grabInvoicesSuccess(res.data.value));
        // })
        // .catch( (error) => {
        //     console.log(error);
        //     dispatch(_grabInvoicesFailed(error));
        // });
    };
}

// Helper function
const parseProducts = (products) => {
    const product_list = products.map((prod) => ({
        invoicedetailid: prod.invoicedetailid,
        productname: prod.productname,
        priceperunit: prod.priceperunit
    }))
    return JSON.stringify(product_list)
}

const _grabInvoicesSuccess = (invoiceList) => {
    return {
        type: GRAB_INVOICES_SUCCESFUL,
        data: invoiceList.map((obj, indx) => ({
            id: obj.invoicenumber,
            name: obj.name,
            duedate: obj.duedate,
            totalamount: obj.totalamount,
            description: obj.description,
            products: parseProducts(obj.invoice_details),
            stripeid: obj.customerid_contact.ss_stripeid,
        }))
    };
}

const _grabInvoicesFailed = (error) => {
    return {
        type: GRAB_INVOICES_FAILURE,
        error  
    };
}

const _grabInvoicesStarted = () => {
    return {
        type: GRAB_INVOICES_PENDING
    };
}