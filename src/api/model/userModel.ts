export interface UserModel {
  systems: System[];
  permissions: string[];
  roles: string[];
  user: User;
  info: UserInfo;
}

export interface UserInfo {
  id: number;
  userId: number;
  unitId: number;
  userName: string;
  oldName: string;
  userNameInitials: string;
  userNameFull: string;
  birthday: string;
  sex: number;
  regionCode: string;
  nation: string;
  nativesCode: string;
  photoImageId: number;
  partyCode: string;
  address: string;
  postCode: string;
  studyProCodeFirst: string;
  studyProCodeSecond: string;
  studyProCodeThird: string;
  position: string;
  unitPart: string;
  engageProCodeFirst: string;
  engageProCodeSecond: string;
  engageProCodeThird: string;
  paperworkTypeCode: string;
  paperworkNumber: string;
  learn: string;
  performanceYears: string;
  jobWorkYears: string;
  status: number;
  sort: number;
  gmtCreate: number;
  gmtModified: number;
  photoImageUrl: string;
  phone: string;
  email: string;
  unitName: string;
  schoolDept: string;
}

export interface User {
  id: number;
  typeId: number;
  loginName: string;
  loginPassword: string;
  salt: string;
  commonCode: string;
  email: string;
  phone: string;
  status: number;
  repeatLogin: number;
  gmtCreate: number;
  gmtModified: number;
  sort: number;
  nickName: string;
  avatar: string;
  admin: boolean;
}

export interface System {
  createBy: string;
  updateBy: string;
  updateTime: string;
  id: number;
  title: string;
  sort: number;
  status: number;
}
