import { HotelOption, Modality, Hotel, Room, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  // CREATE EVENT
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  // eslint-disable-next-line no-console
  console.log({ event });

  //CREATE HOTEL OPTIONS
  const hotelOptionsList = [
    {
      isWanted: true,
      price: 35000,
    },
    {
      isWanted: false,
      price: 0,
    },
  ] as HotelOption[];

  const hotelOptionsPromises = hotelOptionsList.map((hotelOption) => {
    const promise = prisma.hotelOption.upsert({
      where: {
        isWanted: hotelOption.isWanted,
      },
      update: {},
      create: hotelOption,
    });

    return promise;
  });
  await Promise.all(hotelOptionsPromises);

  const hotelOptions = await prisma.hotelOption.findMany({});

  const modalitiesList = [
    {
      name: 'Presencial',
      price: 25000,
      hotelOptionId: hotelOptions[0].id,
    },
    {
      name: 'Presencial',
      price: 25000,
      hotelOptionId: hotelOptions[1].id,
    },
    {
      name: 'Online',
      price: 10000,
      hotelOptionId: null,
    },
  ] as Modality[];

  await prisma.modality.deleteMany({});
  await prisma.modality.createMany({
    data: modalitiesList,
  });

  const hotelsList = [
    { name: 'Driven Resort', image: 'https://picsum.photos/300/300' },
    { name: 'Driven Palace', image: 'https://picsum.photos/300/300' },
    { name: 'Driven World', image: 'https://picsum.photos/300/300' },
  ] as Hotel[];
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.hotel.createMany({
    data: hotelsList,
  });

  const hotels = await prisma.hotel.findMany({});

  type RoomWithoutId = Omit<Room, 'id'>;
  const roomQuantity = 16;
  const roomsList = [] as RoomWithoutId[];
  for (let i = 0; i < roomQuantity; i++) {
    const capacity = Math.floor(Math.random() * 3) + 1;
    roomsList.push({ name: `${100 + i}`, hotelId: hotels[0].id, capacity });
  }

  await prisma.room.deleteMany({});
  await prisma.room.createMany({
    data: roomsList,
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
