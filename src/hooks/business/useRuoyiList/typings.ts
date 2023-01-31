type UrlDescribe = [string, string ];

export interface UrlObj {
  list: string;
  query: string;
  //
  add: string;
  edit: string;
  //
  del: string;
}

export type RuoyiListRequestUrl = UrlDescribe | UrlObj;