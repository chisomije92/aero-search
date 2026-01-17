export interface IError {
  type: string;
  status: number;
  errors: Array<{
    status: number;
    code: number;
    title: string;
    detail: string;
  }>;
}

export interface AmadeusError {
  errors?: Array<{
    status?: number;
    code?: number;
    title?: string;
    detail?: string;
    source?: {
      parameter?: string;
    };
  }>;
  message?: string;
}
