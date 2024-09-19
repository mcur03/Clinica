class User{
    private _gmail: string;
    private _documento: string;
    private _nombre: string;
    private _apellido: string;
    private _edad: string;
    private _celular: string;
    private _fechaNacimiento: string;
    private _password: string;
    private _rol: 'admin' | 'doctor' | 'paciente'; // tipo literal 
    private _is_verified:boolean;

    constructor(
        gmail:string,
        documento:string,
        nombre:string,
        apellido:string,
        edad:string,
        celular:string,
        fechaNacimiento:string,
        password:string,
        rol: 'admin' | 'doctor' | 'paciente',
        is_verified:boolean
    ){
        this._gmail = gmail;
        this._documento = documento;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
        this._celular = celular;
        this._fechaNacimiento = fechaNacimiento;
        this._password = password;
        this._rol = rol;
        this._is_verified = is_verified;
    }
    get gmail(){
        return this._gmail;
    }
    get documento(){
        return this._documento;
    }
    get nombre(){
        return this._nombre;
    }
    get apellido(){
        return this._apellido;
    }
    get edad(){
        return this._edad;
    }
    get celular(){
        return this._celular
    }
    get fechaNacimiento(){
        return this._fechaNacimiento
    }
    get password(){
        return this._password;
    }
    get rol(){
        return this._rol
    }
    get is_verified(){
        return this._is_verified;
    }

    set gmail(gmail:string){
        this._gmail = gmail;
    }
    set documento(documento:string){
        this._documento = documento;
    }
    set nombre(nombre:string){
        this._nombre = nombre;
    }
    set apellido(apellido:string){
        this._apellido = apellido;
    }
    set edad(edad:string){
        this._edad = edad;
    }
    set celular(celular:string){
        this._celular = celular;
    }
    set fechaNacimiento(fechaNacimiento:string){
        this._fechaNacimiento = fechaNacimiento;
    }
    set password(password:string){
        this._password = password;
    }
    set rol(rol:'admin' | 'doctor' | 'paciente'){
        this._rol = rol ;
    }
    set is_verified(is_verified:boolean){
        this._is_verified = is_verified;
    }
}