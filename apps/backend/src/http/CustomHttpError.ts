export class CustomHttpError extends Error{
    status : number
    error : string
    message: string 

    constructor(status:number,error : string,message:string){
        super(message);
        this.status = status;
        this.error = error;
        this.message = message;
    }
    
}