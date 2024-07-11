export class User{
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
        public status?: string,
        public imageURL?: string
    ){}

    get getGoogle(){

        (this.google) ? this.imageURL = this.image : '';

        return this.google;
    }
}