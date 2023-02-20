export const fakeData = {
  user: {
    name: 'steve',
    email: 'steve@gmail.com',
    id: '12345',
  },
  files: [
    {
      id: 'aaa',
      type: 'pickme',
      name: 'Pick-a-kid',
      settings: {
        background: 1,
        theme: 2,
      },
      items: [
        {
          id: '111',
          name: 'Elliot',
          visible: true,
          order: 0,
        },
        {
          id: '222',
          name: 'Oliver',
          visible: true,
          order: 1,
        },
        {
          id: '333',
          name: 'Levi',
          visible: false,
          order: 2,
        },
      ],
    },
    {
      id: 'bbb',
      type: 'pickme',
      name: 'Where2eat',
      settings: {
        background: 3,
        theme: 4,
      },
      items: [
        {
          id: '112',
          name: "Wendy's",
          visible: true,
          order: 0,
        },
        {
          id: '223',
          name: "McDonald's",
          visible: true,
          order: 1,
        },
        {
          id: '334',
          name: 'Chipotle',
          visible: false,
          order: 2,
        },
      ],
    },
  ],
};

export interface File {
  id: string;
  name: string;
  type: string;
  items: Item[];
  settings: {
    background: number;
    theme: number;
  }
}

export interface Item {
  id: string;
  name: string;
  visible: boolean;
  order: number;
}
