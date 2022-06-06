import faker from '@faker-js/faker';

import { prisma } from '@/config';

import { ModalityName } from '@prisma/client';

export async function createModalities() {
  const hotelOptions = await createHotelOptions();

  const modalityWithoutHotelPromise = createModality('Online');
  const modalitiesWithHotelPromises = hotelOptions.map((hotelOption) => {
    return createModality('Presencial', hotelOption.id);
  });

  const modalities = await Promise.all([modalityWithoutHotelPromise, ...modalitiesWithHotelPromises]);

  return modalities;
}

async function createHotelOptions() {
  const optionsInfo = [
    {
      isWanted: true,
      price: faker.datatype.number({ min: 100, max: 999999 }),
    },
    {
      isWanted: false,
      price: 0,
    },
  ];

  const createOptionsPromises = optionsInfo.map((optionData) => {
    return prisma.hotelOption.create({ data: optionData });
  });

  const hotelOptions = await Promise.all(createOptionsPromises);

  return hotelOptions;
}

async function createModality(name: ModalityName, hotelOptionId?: number, price?: number) {
  const modality = await prisma.modality.create({
    data: {
      name,
      hotelOptionId: hotelOptionId || null,
      price: price || faker.datatype.number({ min: 100 }),
    },
  });

  return modality;
}

export async function findModality(haveHotelOption?: boolean) {
  const whereSelection = Boolean(haveHotelOption)
    ? {
        NOT: [
          {
            hotelOptionId: null,
          },
        ],
      }
    : {};

  const modality = await prisma.modality.findFirst({
    where: whereSelection,
  });

  return modality;
}
