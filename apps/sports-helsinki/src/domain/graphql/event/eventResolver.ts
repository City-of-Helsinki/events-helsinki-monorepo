/* eslint-disable @typescript-eslint/no-explicit-any */
const Event = {
  id({ id }: any) {
    return id;
  },
  name({ name }: any, _: any, { language }: any) {
    return name?.[language];
  },
  shortDescription({ short_description }: any, _: any, { language }: any) {
    return short_description?.[language];
  },
  startTime({ start_time }: any) {
    return start_time;
  },
  endTime({ end_time }: any) {
    return end_time;
  },
  images({ images }: any) {
    return images.map(({ id, url, alt_text }: any) => ({
      id,
      url,
      alt: alt_text,
    }));
  },
  offers({ offers }: any, _: any, { language }: any) {
    return offers.map(({ is_free, description, infoUrl, price }: any) => ({
      isFree: is_free,
      description: description?.[language],
      infoUrl: infoUrl?.[language],
      price: price?.[language],
    }));
  },
  infoUrl({ info_url }: any, _: any, { language }: any) {
    return info_url?.[language];
  },
};

export default Event;
