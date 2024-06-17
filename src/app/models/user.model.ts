export class User{
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public google?: string,
        public role?: string,
        public uid?: string
    ){}
}