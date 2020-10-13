import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import imagesView from '@modules/imgs/infra/http/views/ImagesView';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
      created_at: orphanage.created_at,
      updated_at: orphanage.updated_at,
    };
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage));
  },
};
