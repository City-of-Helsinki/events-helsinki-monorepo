export type MapOpenDataDataSource_Feature = {
  type: 'Feature';
  geometry: unknown;
  properties: unknown;
};

export type MapOpenDataDataSource_NeighborhoodListResponse = {
  type: 'FeatureCollection';
  features: Array<MapOpenDataDataSource_Feature>;
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned: number;
  timeStamp?: string;
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
};
