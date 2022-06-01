import modalitiesRepository from '@/repositories/modalities-repository';
import hotelOptionsRepository from '@/repositories/hotel-options-repository';
import { Modality, HotelOption } from '@prisma/client';

interface ModalitiesWithHotelOptions {
  id: number;
  name: string;
  price: number;
  hotelOptionId: number;
  hotelOptions?: HotelOption[];
}

async function getAll() {
  const modalities = await modalitiesRepository.getAll();
  const hotelOptions = await hotelOptionsRepository.getAll();

  return removeObjectsWithDuplicateNames(combineArrays(modalities, hotelOptions));
}

function removeObjectsWithDuplicateNames(array: ModalitiesWithHotelOptions[]): ModalitiesWithHotelOptions[] {
  return array.reduce((acc: any, current: any) => {
    if (!acc.find((item: any) => item.name === current.name)) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}

function combineArrays(modalities: Modality[], hotelOptions: HotelOption[]): ModalitiesWithHotelOptions[] {
  const filteredModalities = modalities.filter((modality) => modality.hotelOptionId !== null);
  const idUpdatedHotelOptions = hotelOptions.map((hotelOption, index) => ({
    ...hotelOption,
    id: filteredModalities[index].id,
  }));

  return modalities.map((modality) => {
    if (modality.hotelOptionId !== null) {
      return { ...modality, hotelOptions: idUpdatedHotelOptions };
    }
    return modality;
  });
}

const modalitiesService = {
  getAll,
};

export default modalitiesService;
