import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8085';

export class ContactServices {
    static serverURL = 'http://localhost:8085';

    static getAllContacts() {
        let dataUrl = `${this.serverURL}/users`;
        return axios.get(dataUrl);
    }

    static getContact(contactId) {
        let dataUrl = `${this.serverURL}/user/${contactId}`;
        return axios.get(dataUrl);
    }

    static createContact(contact) {
        let dataURL = `${this.serverURL}/users`;
        return axios.post(dataURL, contact);
    }

    // static login(email, password) {
    //     let dataURL = `${this.serverURL}/users/find`;
    //     return axios.get(dataURL, { email, password });
    // }
    static login(credentials) {
        let dataURL = `${this.serverURL}/users/find`;
        return axios.post(dataURL, credentials, {
            headers: {
                'Content-Type': 'application/json' // Ensure the content type is set
            }
        });
    }
    

}
