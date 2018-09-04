export class Project{
    public projectId: any;
    constructor(
        public projectName: string,
        public projectDescription: string,
        public projectEnable: Boolean,
        public usersOwners: Array<Object>
    ){}
}