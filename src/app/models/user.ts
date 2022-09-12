export class User{
    getToken: any;

    constructor(
        public _id: string,
        public name: string,
        public lastname: string,
        public username: string,
        public password: string,
        public role: string
    ){}

}