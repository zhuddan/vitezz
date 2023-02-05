import type { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile, UploadRequestOptions, UploadUserFile } from 'element-plus';
import type { AssembleComponent } from '../../util';

// 类型
export interface UploadProps {
  // 请求 URL
  action: string;
  // 	设置上传的请求头部
  headers: string;
  // 设置上传请求方法 	'post'
  method: string;
  // 多选
  multiple: boolean;
  // 上传时附带的额外参数
  data: Record<string, any>;
  // 	上传的文件字段名 'file'
  name: string;
  // 支持发送 cookie 凭证信息
  withCredentials: boolean;
  // 是否显示已上传文件列表
  showFileList: boolean;
  // 是否启用拖拽上传
  drag: boolean;
  // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
  accept: string;
  // 点击文件列表中已上传的文件时的钩子
  onPreview: (uploadFile: UploadFile) => void;
  // 文件列表移除文件时的钩子
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  // 文件上传成功时的钩子
  onSuccess: (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  // 文件上传失败时的钩子
  onError: (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  // 文件上传时的钩子
  onProgress: (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void;
  // 	当超出限制时，执行的钩子函数
  onExceed: (files: File[], uploadFiles: UploadUserFile[]) => void;
  // 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
  beforeUpload: (rawFile: UploadRawFile) => Awaitable<void | undefined | null | boolean | File | Blob>;
  // 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
  beforeRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>;
  // 默认上传文件
  fileList:	UploadUserFile[];
  // 文件列表的类型
  listType: 'text' | 'picture' | 'picture-card';
  // 是否自动上传文件
  autoUpload: boolean;
  // 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求
  httpRequest: (options: UploadRequestOptions) => XMLHttpRequest | Promise<unknown>;
  // disabled
  limit: number;
}

export interface UploadEvent {

}

export type Upload = AssembleComponent<'Upload', UploadProps, UploadEvent>;