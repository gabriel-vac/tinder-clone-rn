const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  // destructring to get an array with id and the user object
  // Example .entries :
  // const obj = { foo: 'bar', baz: 42 };
  // console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
  // Example .flat()
  // const arr1 = [1, 2, [3, 4]];
  // arr1.flat();
  // // [1, 2, 3, 4]

  // const arr2 = [1, 2, [3, 4, [5, 6]]];
  // arr2.flat();
  // // [1, 2, 3, 4, [5, 6]]

  // const arr3 = [1, 2, [3, 4, [5, 6]]];
  // arr3.flat(2);
  // // [1, 2, 3, 4, 5, 6]

  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};

export default getMatchedUserInfo;
