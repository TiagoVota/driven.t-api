type RoomTypesTable = {
  [label: number]: string;
};

export function makeRoomTypeByCapacity(capacity: number) {
  const roomTypesTable = {
    1: 'Single',
    2: 'Double',
    3: 'Triple',
  } as RoomTypesTable;

  return roomTypesTable[capacity] || 'not found room type';
}
