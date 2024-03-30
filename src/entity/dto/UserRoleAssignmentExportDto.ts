export class UserRoleAssignmentExportDto {
  get user_full_name(): string {
    return this._user_full_name;
  }

  set user_full_name(value: string) {
    this._user_full_name = value;
  }

  get user_login(): string {
    return this._user_login;
  }

  set user_login(value: string) {
    this._user_login = value;
  }

  get user_email(): string {
    return this._user_email;
  }

  set user_email(value: string) {
    this._user_email = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get resource(): string {
    return this._resource;
  }

  set resource(value: string) {
    this._resource = value;
  }

  get assignedTime(): string {
    return this._assignedTime;
  }

  set assignedTime(value: string) {
    this._assignedTime = value;
  }

  get requestTime(): string {
    return this._requestTime;
  }

  set requestTime(value: string) {
    this._requestTime = value;
  }

  get revokedTime(): string {
    return this._revokedTime;
  }

  set revokedTime(value: string) {
    this._revokedTime = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  private _user_full_name!: string;
  private _user_login!: string;
  private _user_email!: string;
  private _role!: string;
  private _resource!: string;
  private _assignedTime!: string;
  private _requestTime!: string;
  private _revokedTime!: string;
  private _status!: string;
}
