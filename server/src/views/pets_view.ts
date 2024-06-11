import Pet from '../models/Pet';
import imagesView from './images_views';

export default {
  render(pet: Pet) {
    return {
      id: pet.id,
      name: pet.name,
      email: pet.email,
      phone: pet.phone,
      latitude: pet.latitude,
      longitude: pet.longitude,
      ad_title: pet.ad_title,
      species: pet.species,
      breed: pet.breed,
      sex: pet.sex,
      castrated: pet.castrated,
      color_animal: pet.color_animal,
      info_pet: pet.info_pet,
      info_donation: pet.info_donation,
      images: imagesView.renderMany(pet.images),
    };
  },

  renderMany(pets: Pet[]) {
    return pets.map((pet) => this.render(pet));
  },
};
