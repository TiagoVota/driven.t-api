import hotelRepository from '@/repositories/hotel-repository';

type HotelRoom = {
  id: number;
  name: string;
  image: string;
};

export async function getHotels() {
  const hotels = await hotelRepository.getHotels();
  const capacityAndOccupation = await countCapacityAndOccupation(hotels);
  return capacityAndOccupation;
}

function countCapacityAndOccupation(hotels: HotelRoom[]) {
  const hotelsWithRooms = hotels.map((hotel: any) => ({
    id: hotel.id,
    name: hotel.name,
    image: hotel.image,
    capacity:
      hotel.Room.length > 0
        ? hotel.Room.reduce(
            (totalCapacity: number, roomCapacity: { capacity: number }) => totalCapacity + roomCapacity.capacity,
            0,
          )
        : 0,
    occupation:
      hotel.Room.length > 0
        ? hotel.Room.reduce(
            (totalOccupation: number, roomOccupation: any) => totalOccupation + roomOccupation.RoomsUsers.length,
            0,
          )
        : 0,
    type: getHotelRoomTypes(hotel.Room),
  }));
  return hotelsWithRooms;
}

function getHotelRoomTypes(hotel: any) {
  const roomTypes: string[] = [];
  const roomNames: any = { 1: 'Single', 2: 'Double', 3: 'Triple' };

  for (hotel of hotel) {
    const value: number = hotel.capacity;
    if (!roomTypes.includes(roomNames[value]) && roomNames[value] !== undefined) {
      roomTypes.push(roomNames[value]);
    }
  }
  const sortedRoomTypes: string[] = [];

  for (let i = 1; i <= Object.keys(roomNames).length; i++) {
    if (roomTypes.includes(roomNames[i])) {
      sortedRoomTypes.push(roomNames[i]);
    }
  }

  return sortedRoomTypes.join(', ');
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
