export function generateRandomName() {
    const adjectives = [
      'Cool', 'Fast', 'Happy', 'Sneaky', 'Witty', 'Brave', 'Lucky', 'Bright', 'Loyal', 'Sharp',
      'Mighty', 'Cheerful', 'Gentle', 'Quick', 'Sly', 'Clever', 'Fearless', 'Bold', 'Daring', 'Jolly'
    ];

    const animals = [
      'Tiger', 'Eagle', 'Panda', 'Lion', 'Falcon', 'Otter', 'Wolf', 'Hawk', 'Shark', 'Dragon',
      'Cheetah', 'Leopard', 'Rabbit', 'Bear', 'Fox', 'Koala', 'Dolphin', 'Swan', 'Turtle', 'Badger',
      'Deer', 'Camel', 'Squirrel', 'Pelican', 'Buffalo', 'Moose', 'Beaver', 'Crane', 'Cobra', 'Jaguar'
    ];

    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}${Math.floor(Math.random() * 1000)}`;
  }
