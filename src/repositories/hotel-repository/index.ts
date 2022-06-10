import { prisma, redis } from '@/config';

async function find(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });
}

async function getHotels() {
  const cachedHotels = await redis.get('hotels');
  if (!cachedHotels) {
    const hotels = await prisma.hotel.findMany({
      include: {
        Room: {
          include: {
            RoomsUsers: true,
          },
        },
      },
    });
    await redis.set('hotels', JSON.stringify(hotels), { EX: 600000 });
    return hotels;
  }
  return JSON.parse(cachedHotels);
}

const hotelRepository = {
  find,
  getHotels,
};

export default hotelRepository;
