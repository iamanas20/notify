// this state data is static for now
export const state: StateType = {
  user: {
    id: 0,
    name: '',
    email: '',
  },
  notes: [
    {
      id: 0,
      title: 'Integer cursus et mauris eu lacinia et cursus.',
      color: '#F3F7FE',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus et mauris eu lacinia. Praesent scelerisque tortor vitae sapien eleifend viverra. Suspendisse potenti. Nullam et libero rhoncus, luctus diam vel, tincidunt dolor. Nullam a interdum sem. Aenean tristique, arcu vitae dignissim eleifend, tortor turpis blandit velit, ac accumsan dolor sapien sed nibh. Cras in consequat risus. Vestibulum facilisis sodales urna nec rhoncus. Vivamus porta blandit neque, quis porttitor diam facilisis vel. Nulla luctus eros sit amet nisl laoreet pellentesque. Sed sollicitudin vulputate nisi id scelerisque. Integer lacinia consequat purus, et hendrerit enim sodales tincidunt. Vivamus suscipit, ligula nec faucibus gravida, tellus velit maximus urna, ut malesuada nunc ipsum quis erat.',
    },
    {
      id: 1,
      title: 'My second note',
      color: '#FEF3F8',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus et mauris eu lacinia. Praesent scelerisque tortor vitae sapien eleifend viverra. Suspendisse potenti. Nullam et libero rhoncus, luctus diam vel, tincidunt dolor. Nullam a interdum sem. Aenean tristique, arcu vitae dignissim eleifend, tortor turpis blandit velit, ac accumsan dolor sapien sed nibh. Cras in consequat risus. Vestibulum facilisis sodales urna nec rhoncus. Vivamus porta blandit neque, quis porttitor diam facilisis vel. Nulla luctus eros sit amet nisl laoreet pellentesque. Sed sollicitudin vulputate nisi id scelerisque. Integer lacinia consequat purus, et hendrerit enim sodales tincidunt. Vivamus suscipit, ligula nec faucibus gravida, tellus velit maximus urna, ut malesuada nunc ipsum quis erat.',
    },
    {
      id: 2,
      title: 'My third note',
      color: '#FEF6F3',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus et mauris eu lacinia. Praesent scelerisque tortor vitae sapien eleifend viverra. Suspendisse potenti. Nullam et libero rhoncus, luctus diam vel, tincidunt dolor. Nullam a interdum sem. Aenean tristique, arcu vitae dignissim eleifend, tortor turpis blandit velit, ac accumsan dolor sapien sed nibh. Cras in consequat risus. Vestibulum facilisis sodales urna nec rhoncus. Vivamus porta blandit neque, quis porttitor diam facilisis vel. Nulla luctus eros sit amet nisl laoreet pellentesque. Sed sollicitudin vulputate nisi id scelerisque. Integer lacinia consequat purus, et hendrerit enim sodales tincidunt. Vivamus suscipit, ligula nec faucibus gravida, tellus velit maximus urna, ut malesuada nunc ipsum quis erat.',
    },
    {
      id: 3,
      title: 'My fourth note',
      color: '#E7FFFC',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus et mauris eu lacinia. Praesent scelerisque tortor vitae sapien eleifend viverra. Suspendisse potenti. Nullam et libero rhoncus, luctus diam vel, tincidunt dolor. Nullam a interdum sem. Aenean tristique, arcu vitae dignissim eleifend, tortor turpis blandit velit, ac accumsan dolor sapien sed nibh. Cras in consequat risus. Vestibulum facilisis sodales urna nec rhoncus. Vivamus porta blandit neque, quis porttitor diam facilisis vel. Nulla luctus eros sit amet nisl laoreet pellentesque. Sed sollicitudin vulputate nisi id scelerisque. Integer lacinia consequat purus, et hendrerit enim sodales tincidunt. Vivamus suscipit, ligula nec faucibus gravida, tellus velit maximus urna, ut malesuada nunc ipsum quis erat.',
    },
    {
      id: 4,
      title: 'My fifth note',
      color: '#F0E8FF',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus et mauris eu lacinia. Praesent scelerisque tortor vitae sapien eleifend viverra. Suspendisse potenti. Nullam et libero rhoncus, luctus diam vel, tincidunt dolor. Nullam a interdum sem. Aenean tristique, arcu vitae dignissim eleifend, tortor turpis blandit velit, ac accumsan dolor sapien sed nibh. Cras in consequat risus. Vestibulum facilisis sodales urna nec rhoncus. Vivamus porta blandit neque, quis porttitor diam facilisis vel. Nulla luctus eros sit amet nisl laoreet pellentesque. Sed sollicitudin vulputate nisi id scelerisque. Integer lacinia consequat purus, et hendrerit enim sodales tincidunt. Vivamus suscipit, ligula nec faucibus gravida, tellus velit maximus urna, ut malesuada nunc ipsum quis erat.',
    },
    {
      id: 5,
      title: 'My sixth note',
      color: '#F0FFD5',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer cursus et mauris eu lacinia. Praesent scelerisque tortor vitae sapien eleifend viverra. Suspendisse potenti. Nullam et libero rhoncus, luctus diam vel, tincidunt dolor. Nullam a interdum sem. Aenean tristique, arcu vitae dignissim eleifend, tortor turpis blandit velit, ac accumsan dolor sapien sed nibh. Cras in consequat risus. Vestibulum facilisis sodales urna nec rhoncus. Vivamus porta blandit neque, quis porttitor diam facilisis vel. Nulla luctus eros sit amet nisl laoreet pellentesque. Sed sollicitudin vulputate nisi id scelerisque. Integer lacinia consequat purus, et hendrerit enim sodales tincidunt. Vivamus suscipit, ligula nec faucibus gravida, tellus velit maximus urna, ut malesuada nunc ipsum quis erat.',
    },
  ],
};

export type StateType = {
  user: {
    id: number,
    name: string,
    email: string,
  },
  notes: {
    id: number,
    title: string,
    text: string,
    color: string,
  }[]
};