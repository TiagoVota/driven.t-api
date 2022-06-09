import roomsUsersRepository from '@/repositories/roomsUsers-repository';

async function deleteSelectedRoomIfExiste(userId: number) {
  const selectedRoom = await roomsUsersRepository.findByUserId(userId);

  if (selectedRoom === null) return;

  const { id } = selectedRoom;
  await roomsUsersRepository.deleteById(id);
}
