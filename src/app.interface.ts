export enum statusType {
  error = 'error',
  success = 'success',
}

export interface HealthResponse {
  message: string;
  status: statusType;
  error: boolean;
}
