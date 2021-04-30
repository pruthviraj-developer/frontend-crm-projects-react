export interface CardProps {
  onPageChange?: (value: carouselAttributes) => void;
  updatePids?: (value: Record<string, unknown>) => void;
  cardsList?: CardEntityProps[] | null;
  actionButton: string;
  buttonType: CardButtonTypeProps;
  decisionType?: string;
  updateDecisionType: string;
  defaultKey: string;
  itemType: string;
  carouselKey: string;
  label: string;
  page: number;
  totalRecords: number;
}

export type CardButtonTypeProps =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'default'
  | undefined;

interface carouselAttributes {
  defaultKey: string;
  isPrevious?: number;
}

interface CardEntityProps {
  pid: number;
  imageUrl: string;
  attributes?: AttributesEntity[] | null;
}

interface AttributesEntity {
  label: string;
  value: string | number;
}
