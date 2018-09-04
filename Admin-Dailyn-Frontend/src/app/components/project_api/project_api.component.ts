import { NgModule, Component, enableProdMode, ChangeDetectionStrategy, Injectable, Inject } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
// import * as AspNetData from "devextreme-aspnet-data";
import { ProjectService } from '../../services/project.services'
import { UserService } from '../../services/user.services'
import { GLOBAL } from '../../services/global'
import DataSource from 'devextreme/data/data_source';
import { Project } from '../../models/project'

@Component({
    selector: 'project_api',
    templateUrl: './project_api.component.html',
    styleUrls: ['./project_api.component.css'],
    providers: [ProjectService, UserService]
})
export class ProjectApiComponent {
    public datasource: any;
    public url: string;
    public title: string;

    public users: Array<any> = [];
    public selectedUsers: any[] = [];

    constructor(
        @Inject(ProjectService) private _projectService: ProjectService,
        private _userService: UserService
    ) {
        this.title = "Administrador de Projectos (API)";
        let token = this._userService.getToken();

        this.datasource = new DataSource({
            load: function () {
                return _projectService.getProjects(token).toPromise().then(
                    result => {
                        return {
                            data: result.projects,
                            totalCount: 0,
                            summary: 0
                        };
                    }
                ).catch(error => {
                    throw 'Error: ' + JSON.parse(error._body).message;
                });
            },
            insert: function (values) {
                let saveProject = new Project(
                    values.projectName,
                    values.projectDescription,
                    values.projectEnable,
                    values.usersOwners
                );
                return _projectService.registerProject(token, saveProject).toPromise().then(
                    result => {
                        return result;
                    }
                ).catch(error => {
                    throw 'Error: ' + JSON.parse(error._body).message;
                });
            },
            update: function (key, values) {
                let saveProject = new Project(
                    (values.projectName) ? values.projectName : key.projectName,
                    (values.projectDescription) ? values.projectDescription : key.projectDescription,
                    (values.projectEnable != null) ? values.projectEnable : key.projectEnable,
                    (values.usersOwners) ? values.usersOwners : key.usersOwners.map(a => { return a._id })
                );
                saveProject.projectId = key._id;
                return _projectService.updateProject(token, saveProject).toPromise().then(
                    result => {
                        return result;
                    }
                ).catch(error => {
                    throw 'Error: ' + JSON.parse(error._body).message;
                });
            }
        });

        this.users = [
            /* 1 */
            {
                "_id": "5a5ada656fe2612ec8a9c337",
                "userName": "afluque"
            },

            /* 2 */
            {
                "_id": "5a6351a457c2d10ce430b52b",
                "userName": "taluque"
            },

            /* 3 */
            {
                "_id": "5adb7c72b742381365bb35e5",
                "userName": "pnbarragan"
            }
        ]


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
        // e.data.usersOwners = this.selectedUsers.map(a => { return a._id });
        // console.log(e);
        // console.log('RowInserting');
    }

    optionChanged(e, cellInfo) {
        cellInfo.setValue(this.selectedUsers);
    }
}