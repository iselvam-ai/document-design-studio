export type PageSize = 'A5' | 'A4' | 'A3' | 'Letter' | 'Legal' | 'Custom';
export type Orientation = 'Portrait' | 'Landscape';
export type BackgroundType = 'Solid' | 'Gradient' | 'Image' | 'Shapes' | 'None';
export type Alignment = 'Left' | 'Center' | 'Right' | 'Justify';
export type ShapeType = 'Circle' | 'Rectangle' | 'RoundedRectangle' | 'Line' | 'Arc';
export type PageNumberFormat = 'None' | 'Arabic' | 'Roman';

export interface Margins {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface PageConfig {
  size: PageSize;
  width: number;
  height: number;
  orientation: Orientation;
  margins: Margins;
}

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  color: string;
  letterSpacing: number;
  lineHeight: number;
  paragraphSpacingBefore: number;
  paragraphSpacingAfter: number;
  alignment: Alignment;
}

export interface TypographyConfig {
  documentTitle: TypographyStyle;
  subtitle: TypographyStyle;
  partTitle: TypographyStyle;
  articleTitle: TypographyStyle;
  sectionTitle: TypographyStyle;
  body: TypographyStyle;
  leadParagraph: TypographyStyle;
  caption: TypographyStyle;
  tableHeader: TypographyStyle;
  tableBody: TypographyStyle;
  header: TypographyStyle;
  footer: TypographyStyle;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  heading: string;
  body: string;
  muted: string;
  background: string;
  tableHeader: string;
  tableBody: string;
  border: string;
  footer: string;
  highlight: string;
}

export interface DecorativeShape {
  id: string;
  enabled: boolean;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  opacity: number;
}

export interface BackgroundConfig {
  type: BackgroundType;
  solidColor: string;
  gradientColor1: string;
  gradientColor2: string;
  gradientDirection: string;
  gradientOpacity: number;
  imageUrl: string;
  imageFit: 'Cover' | 'Contain' | 'Stretch';
  imageOpacity: number;
  imagePositionX: number;
  imagePositionY: number;
  shapes: DecorativeShape[];
}

export interface LogoConfig {
  enabled: boolean;
  source: string;
  width: number;
  height: number;
  x: number;
  y: number;
  opacity: number;
  keepAspectRatio: boolean;
  position: 'TopLeft' | 'TopCenter' | 'TopRight' | 'Center' | 'BottomLeft' | 'BottomCenter' | 'BottomRight';
}

export interface HeaderConfig {
  enabled: boolean;
  leftContent: string;
  centerContent: string;
  rightContent: string;
  spacing: number;
  borderEnabled: boolean;
  borderThickness: number;
  borderColor: string;
  includeLogo: boolean;
}

export interface FooterConfig {
  enabled: boolean;
  leftContent: string;
  centerContent: string;
  rightContent: string;
  spacing: number;
  borderEnabled: boolean;
  borderThickness: number;
  borderColor: string;
  includePageNumber: boolean;
}

export interface PageNumberConfig {
  enabled: boolean;
  format: PageNumberFormat;
  position: 'TopLeft' | 'TopCenter' | 'TopRight' | 'BottomLeft' | 'BottomCenter' | 'BottomRight';
  fontFamily: string;
  fontSize: number;
  color: string;
}

export interface TableConfig {
  headerBackground: string;
  bodyBackground: string;
  borderColor: string;
  borderThickness: number;
  cellPadding: number;
  rowSpacing: number;
  stripedRows: boolean;
}

export interface DesignConfig {
  page: PageConfig;
  background: BackgroundConfig;
  typography: TypographyConfig;
  colors: ColorPalette;
  logo: LogoConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  pageNumber: PageNumberConfig;
  table: TableConfig;
}
