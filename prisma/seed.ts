import { HotelOption, Modality, Hotel, Room, EventDay, Location, Activity, PrismaClient, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
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

  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.modality.deleteMany({});
  await prisma.modality.createMany({
    data: modalitiesList,
  });

  const hotelsList = [
    { name: 'Driven Resort', image: 'https://picsum.photos/300/300' },
    { name: 'Driven Palace', image: 'https://picsum.photos/300/300' },
    { name: 'Driven World', image: 'https://picsum.photos/300/300' },
  ] as Hotel[];
  await prisma.roomsUsers.deleteMany({});
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

  const eventDaysList = [
    { date: new Date('2022-06-06T00:00:00.000Z') },
    { date: new Date('2022-06-07T00:00:00.000Z') },
    { date: new Date('2022-06-08T00:00:00.000Z') },
  ] as EventDay[];

  await prisma.activity.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.eventDay.deleteMany({});
  await prisma.eventDay.createMany({
    data: eventDaysList,
  });

  const eventDays = await prisma.eventDay.findMany({});
  const locationsNames = ['Auditório Principal', 'Auditório Lateral', 'Sala de Workshop'];
  type LocationWithoutId = Omit<Location, 'id'>;
  const locationsList = [] as LocationWithoutId[];
  for (let i = 0; i < locationsNames.length; i++) {
    for (let j = 0; j < eventDays.length; j++) {
      locationsList.push({ name: locationsNames[i], eventDayId: eventDays[j].id });
    }
  }

  await prisma.activity.deleteMany({});
  await prisma.location.deleteMany({});
  await prisma.location.createMany({
    data: locationsList,
  });

  const locationsForFirstDate = await prisma.location.findMany({ where: { eventDayId: eventDays[0].id } });
  const activitiesList = [
    {
      name: 'Minecraft: montando o PC ideal',
      startAt: new Prisma.Decimal(9),
      duration: new Prisma.Decimal(1),
      capacity: 30,
      occupation: 3,
      locationId: locationsForFirstDate[0].id,
    },
    {
      name: 'LoL: montando o PC ideal',
      startAt: new Prisma.Decimal(10),
      duration: new Prisma.Decimal(1),
      capacity: 80,
      occupation: 80,
      locationId: locationsForFirstDate[0].id,
    },
    {
      name: 'Palestra x',
      startAt: new Prisma.Decimal(9),
      duration: new Prisma.Decimal(2),
      capacity: 30,
      occupation: 18,
      locationId: locationsForFirstDate[1].id,
    },
    {
      name: 'Palestra y',
      startAt: new Prisma.Decimal(11),
      duration: new Prisma.Decimal(1.5),
      capacity: 120,
      occupation: 120,
      locationId: locationsForFirstDate[1].id,
    },
    {
      name: 'Talk x',
      startAt: new Prisma.Decimal(9),
      duration: new Prisma.Decimal(1.5),
      capacity: 30,
      occupation: 30,
      locationId: locationsForFirstDate[2].id,
    },
    {
      name: 'Talk y',
      startAt: new Prisma.Decimal(10.5),
      duration: new Prisma.Decimal(1.5),
      capacity: 50,
      occupation: 35,
      locationId: locationsForFirstDate[2].id,
    },
    {
      name: 'Dota 2: montando o PC ideal',
      startAt: new Prisma.Decimal(11),
      duration: new Prisma.Decimal(1.5),
      capacity: 10,
      occupation: 8,
      locationId: locationsForFirstDate[0].id,
    },
  ] as Activity[];

  await prisma.activity.deleteMany({});
  await prisma.activity.createMany({
    data: activitiesList,
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
