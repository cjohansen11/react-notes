export type APIResponse<Data> =
  | {
      status: "success";
      message: string;
      data: Data;
    }
  | {
      status: "error";
      message: string;
    };
