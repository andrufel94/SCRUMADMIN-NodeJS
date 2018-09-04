import { Component } from '@angular/core'
import { OnInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks'
import { User } from '../../models/user'
import { UserService } from '../../services/user.services'
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string
    public user: User
    public message: string
    public status: string
    public token
    public identity

    constructor(
        private _userService: UserService,
        private _router: Router
    ) {
        this.title = 'Login'
        this.user = new User('', '')
    }

    ngOnInit() {
        console.log("login.component cargado")
    }

    onSubmit() {
        // console.log(this._userService.login(this.user))
        this._userService.login(this.user).subscribe(
            res => {
                this.token = res.token
                if (this.token.length <= 0) {
                    this.message = "Error, no se ha generado el token"
                    this.status = "error"
                } else {
                    delete this.user.userPassword

                    this._userService.setIdentity(JSON.stringify(this.user))
                    this._userService.setToken(this.token)

                    this.message = res.user
                    this.status = "success"
                    this._router.navigate(["/"])
                }
            },
            error => {
                this.message = JSON.parse(error._body)
                this.status = "error"
            }
        )
    }
}