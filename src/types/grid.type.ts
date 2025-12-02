export interface GridContainerProps {
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  columnGap?: number | string;
  rowGap?: number | string;
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  responsive?: boolean;
  breakpoints?: Record<string, string>;
}

export interface GridItemProps {
  id: string;
  columnStart?: number | string;
  columnEnd?: number | string;
  columnSpan?: number;
  rowStart?: number | string;
  rowEnd?: number | string;
  rowSpan?: number;
  justifySelf?: 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'start' | 'end' | 'center' | 'stretch';
  order?: number;
  // Responsive variants
  sm?: Partial<Omit<GridItemProps, 'id' | 'sm' | 'md' | 'lg' | 'xl'>>;
  md?: Partial<Omit<GridItemProps, 'id' | 'sm' | 'md' | 'lg' | 'xl'>>;
  lg?: Partial<Omit<GridItemProps, 'id' | 'sm' | 'md' | 'lg' | 'xl'>>;
  xl?: Partial<Omit<GridItemProps, 'id' | 'sm' | 'md' | 'lg' | 'xl'>>;
}

export interface GridBuilderProps {
  initialColumns?: number;
  initialRows?: number;
  maxColumns?: number;
  maxRows?: number;
  showGrid?: boolean;
  showGuidelines?: boolean;
  allowResize?: boolean;
  allowDrop?: boolean;
  onConfigChange?: (config: GridTemplateConfig) => void;
}

export interface GridTemplateConfig {
  columns: number;
  rows: number;
  gap: number;
  items: GridItemProps[];
  breakpoints?: Record<string, string>;
  containerProps?: Partial<GridContainerProps>;
}

export interface GridBuilderContext {
  selectedItem: string | null;
  isDragging: boolean;
  isResizing: boolean;
  showGuidelines: boolean;
}

export interface GridBreakpoint {
  name: string;
  minWidth: string;
  columns?: number;
  gap?: number;
}