import hotelRepository from '@/repositories/hotel-repository';

export async function getHotels() {
  const hotels = await hotelRepository.getHotels();
  const capacityAndOccupation = await countCapacityAndOccupation(hotels);
  return capacityAndOccupation;
}

function countCapacityAndOccupation(hotels: any) {
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
            (totalOccupation: number, roomOccupation: { RoomsUsers: any }) =>
              totalOccupation + roomOccupation.RoomsUsers.length,
            0,
          )
        : 0,
  }));
  return hotelsWithRooms;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
