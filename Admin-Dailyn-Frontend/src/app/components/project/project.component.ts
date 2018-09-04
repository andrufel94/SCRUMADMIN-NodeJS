import { Component } from '@angular/core'
import { OnInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks'
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.services'
import { UserService } from '../../services/user.services'
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular'

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css'],
    providers: [ProjectService, UserService]
})
export class ProjectComponent implements OnInit {
    public title: string
    public dataSource: Project[]
    public events: Array<string> = [];
    public users: Array<any> = [];
    public selectedUsers: Array<any> = [];
    public saveProject: Project;

    constructor(
        private _projectService: ProjectService,
        private _userService: UserService
    ) {
        this.title = 'Aministrador de proyectos'
        //   this.dataSource = this._projectService.getProjects("")
    }

    ngOnInit() {
        // this._projectService.getProjects(this._userService.getToken()).subscribe(
        //     res => {
        //         this.dataSource = res.projects
        //     },
        //     error => {
        //         console.log("Error: " + error)
        //     }
        // )
        this.getProjects();
        this.users = [
            {
                "_id": "5a5ada656fe2612ec8a9c337",
                "userName": "afluque"
            },
            {
                "_id": "5a6351a457c2d10ce430b52b",
                "userName": "taluque"
            },
            {
                "_id": "5adb7c72b742381365bb35e5",
                "userName": "pnbarragan"
            }
        ]
    }

    logEvent(eventName) {
        this.events.unshift(eventName);
    }

    clearEvents() {
        this.events = [];
    }

    onContentReady(event, selectedUsersOwner) {
        this.selectedUsers = [];
        if (selectedUsersOwner != null) {
            for (let i = 0; i < selectedUsersOwner.length; i++) {
                let userOwner = selectedUsersOwner[i];
                let a = this.users.map(a => a._id).indexOf(userOwner._id);
                this.selectedUsers.push(this.users[a]);
            }
        }
    }

    onRowInserting(e) {
        this.saveProject = new Project(
            e.data.projectName,
            e.data.projectDescription,
            e.data.projectEnable,
            this.selectedUsers
        );
        this._projectService.registerProject(this._userService.getToken(), this.saveProject).subscribe(
            res => {
                this.getProjects();
            },
            error => {
                console.log("Error: " + error)
            },
        );

        this.logEvent('RowInserting')
    }

    onRowInserted(e) {
       console.log(e)
    }

    getProjects() {
        this._projectService.getProjects(this._userService.getToken()).subscribe(
            res => {
                this.dataSource = res.projects
            },
            error => {
                console.log("Error: " + error)
            }
        )
    }
}
