type MarkerEntry = {
  name: string
  markers: IMarkers[];
  dbase: { id: string; rev: string };
};

export type MarkersMapping = {
  [key: string]: MarkerEntry;
};

export interface IMarkers {
  title: string,
  instructions: string,
  coord: L.PointTuple,
  collected: boolean
}
