import jwt_decode from 'jwt-decode';

export class Token {
    accessLevel: string = null;
    userId: string = null;

    constructor() {
    }

    private decodeToken(token: string | null) {

        if (token == null || token == 'null') {
            this.accessLevel = null;
            this.userId = null;
            return;
        }

        const decoded: any = jwt_decode(token);
        this.accessLevel = decoded.NivelAcesso;
        this.userId = decoded.UsuarioId;
    }

    saveToken(token: string) {
        window.localStorage.removeItem('DataUser');
        window.localStorage.setItem('DataUser', token);
        this.decodeToken(token);
    }

    removeToken() {
        window.localStorage.removeItem('DataUser');
    }

    isAuthenticated(): boolean {
        this.decodeToken(window.localStorage.getItem('DataUser'));
        return this.userId != null && this.userId != '';
    }

    isAdmToken(): boolean {
        this.decodeToken(window.localStorage.getItem('DataUser'));
        return this.accessLevel != null && this.accessLevel != '' && this.accessLevel == 'FullAccess';
    }

}
