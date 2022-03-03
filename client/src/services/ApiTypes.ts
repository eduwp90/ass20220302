export type tOptions = {
  method: string;
  headers: {
    'content-Type': string;
  };
  body: string;
}

export type tCommissionRequest = {
  date: string,
  amount: string,
  currency: string,
  client_id: number
}

export type tCommissionResponse = {
  amount: string,
  currency: string
}
