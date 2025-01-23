export interface Description {
  time: number;
  version: string;
  blocks: {
    id: string;
    type: string;
    data: {
      level?: number;
      text: string;
    };
  }[];
}
