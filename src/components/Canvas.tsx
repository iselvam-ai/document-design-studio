import React, { useMemo } from 'react';
import type { DesignConfig } from '../types';
import { mmToPx } from '../utils';

interface CanvasProps {
  design: DesignConfig;
}

const Canvas: React.FC<CanvasProps> = ({ design }) => {
  const pageWidthPx = useMemo(() => mmToPx(design.page.width), [design.page.width]);
  const pageHeightPx = useMemo(() => mmToPx(design.page.height), [design.page.height]);

  const marginTopPx = mmToPx(design.page.margins.top);
  const marginBottomPx = mmToPx(design.page.margins.bottom);
  const marginLeftPx = mmToPx(design.page.margins.left);
  const marginRightPx = mmToPx(design.page.margins.right);

  const getBackgroundStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {};

    if (design.background.type === 'Solid') {
      base.backgroundColor = design.background.solidColor;
    } else if (design.background.type === 'Gradient') {
      const color1 = design.background.gradientColor1;
      const color2 = design.background.gradientColor2;
      const direction = design.background.gradientDirection;
      base.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
      base.opacity = design.background.gradientOpacity;
    } else if (design.background.type === 'Image' && design.background.imageUrl) {
      base.backgroundImage = `url(${design.background.imageUrl})`;
      base.backgroundSize = design.background.imageFit.toLowerCase();
      base.backgroundPosition = `${design.background.imagePositionX}% ${design.background.imagePositionY}%`;
      base.opacity = design.background.imageOpacity;
    }

    return base;
  };

  return (
    <div className="canvas-container">
      <div
        className="page-preview"
        style={{
          width: `${pageWidthPx}px`,
          height: `${pageHeightPx}px`,
        }}
      >
        <div className="page-content">
          <div className="page-background" style={getBackgroundStyle()}>
            {design.background.type === 'Shapes' &&
              design.background.shapes.map((shape) => (
                <div
                  key={shape.id}
                  className="decorative-shape"
                  style={{
                    left: `${mmToPx(shape.x)}px`,
                    top: `${mmToPx(shape.y)}px`,
                    width: `${mmToPx(shape.width)}px`,
                    height: `${mmToPx(shape.height)}px`,
                    opacity: shape.opacity,
                    transform: `rotate(${shape.rotation}deg)`,
                    ...(shape.type === 'Circle' && {
                      borderRadius: '50%',
                      backgroundColor: shape.color,
                    }),
                    ...(shape.type === 'Rectangle' && {
                      backgroundColor: shape.color,
                    }),
                    ...(shape.type === 'RoundedRectangle' && {
                      backgroundColor: shape.color,
                      borderRadius: '4px',
                    }),
                    ...(shape.type === 'Line' && {
                      backgroundColor: shape.color,
                    }),
                  }}
                />
              ))}
          </div>

          <div className="page-inner">
            {design.header.enabled && (
              <div
                className="page-header"
                style={{
                  paddingTop: `${mmToPx(design.page.margins.top)}px`,
                  paddingLeft: `${marginLeftPx}px`,
                  paddingRight: `${marginRightPx}px`,
                  paddingBottom: `${design.header.spacing}px`,
                  borderBottomWidth: design.header.borderEnabled ? `${design.header.borderThickness}px` : 0,
                  borderBottomStyle: design.header.borderEnabled ? 'solid' : 'none',
                  borderBottomColor: design.header.borderColor,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: `${design.header.fontSize}px`,
                    fontFamily: design.header.fontFamily,
                    color: design.header.color,
                  }}
                >
                  <div>{design.header.leftContent}</div>
                  <div>{design.header.centerContent}</div>
                  <div>{design.header.rightContent}</div>
                </div>
              </div>
            )}

            <div
              className="page-body"
              style={{
                paddingLeft: `${marginLeftPx}px`,
                paddingRight: `${marginRightPx}px`,
                paddingTop: design.header.enabled ? 0 : `${marginTopPx}px`,
                paddingBottom: design.footer.enabled ? 0 : `${marginBottomPx}px`,
                overflow: 'hidden',
              }}
            >
              <div style={design.typography.documentTitle}>
                <div
                  className="page-text title"
                  style={{
                    fontSize: `${design.typography.documentTitle.fontSize}px`,
                    fontFamily: design.typography.documentTitle.fontFamily,
                    fontWeight: design.typography.documentTitle.fontWeight,
                    fontStyle: design.typography.documentTitle.italic ? 'italic' : 'normal',
                    color: design.typography.documentTitle.color,
                    letterSpacing: `${design.typography.documentTitle.letterSpacing}px`,
                    lineHeight: design.typography.documentTitle.lineHeight,
                    marginBottom: `${design.typography.documentTitle.paragraphSpacingAfter}px`,
                    textAlign: design.typography.documentTitle.alignment.toLowerCase() as any,
                  }}
                >
                  Institutional Governance Framework
                </div>
              </div>

              <div
                className="page-text subtitle"
                style={{
                  fontSize: `${design.typography.subtitle.fontSize}px`,
                  fontFamily: design.typography.subtitle.fontFamily,
                  fontWeight: design.typography.subtitle.fontWeight,
                  fontStyle: design.typography.subtitle.italic ? 'italic' : 'normal',
                  color: design.typography.subtitle.color,
                  lineHeight: design.typography.subtitle.lineHeight,
                  marginBottom: `${design.typography.subtitle.paragraphSpacingAfter}px`,
                  textAlign: design.typography.subtitle.alignment.toLowerCase() as any,
                }}
              >
                A Professional Organizational Publication
              </div>

              <div
                className="page-text section-title"
                style={{
                  fontSize: `${design.typography.sectionTitle.fontSize}px`,
                  fontFamily: design.typography.sectionTitle.fontFamily,
                  fontWeight: design.typography.sectionTitle.fontWeight,
                  fontStyle: design.typography.sectionTitle.italic ? 'italic' : 'normal',
                  color: design.typography.sectionTitle.color,
                  letterSpacing: `${design.typography.sectionTitle.letterSpacing}px`,
                  marginTop: `${design.typography.sectionTitle.paragraphSpacingBefore}px`,
                  marginBottom: `${design.typography.sectionTitle.paragraphSpacingAfter}px`,
                  textAlign: design.typography.sectionTitle.alignment.toLowerCase() as any,
                }}
              >
                VISION & PURPOSE
              </div>

              <div
                className="page-text"
                style={{
                  fontSize: `${design.typography.body.fontSize}px`,
                  fontFamily: design.typography.body.fontFamily,
                  fontWeight: design.typography.body.fontWeight,
                  fontStyle: design.typography.body.italic ? 'italic' : 'normal',
                  color: design.typography.body.color,
                  lineHeight: design.typography.body.lineHeight,
                  marginBottom: `${design.typography.body.paragraphSpacingAfter}px`,
                  textAlign: design.typography.body.alignment.toLowerCase() as any,
                }}
              >
                This is sample document content demonstrating the design system. Every aspect of typography, color,
                and layout is independently controllable through the design interface.
              </div>

              <table
                className="sample-table"
                style={{
                  marginTop: '12px',
                  marginBottom: '12px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: design.table.headerBackground,
                      color: design.table.headerTextColor,
                    }}
                  >
                    <th style={{ padding: `${design.table.cellPadding}px` }}>Item</th>
                    <th style={{ padding: `${design.table.cellPadding}px` }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: design.table.stripedRows ? design.table.bodyBackground : 'transparent',
                      borderBottomWidth: `${design.table.borderThickness}px`,
                      borderBottomStyle: 'solid',
                      borderBottomColor: design.table.borderColor,
                    }}
                  >
                    <td style={{ padding: `${design.table.cellPadding}px`, color: design.table.bodyTextColor }}>
                      Row 1
                    </td>
                    <td style={{ padding: `${design.table.cellPadding}px`, color: design.table.bodyTextColor }}>
                      Sample data
                    </td>
                  </tr>
                  <tr
                    style={{
                      backgroundColor: design.table.stripedRows ? 'rgba(0,0,0,0.02)' : 'transparent',
                      borderBottomWidth: `${design.table.borderThickness}px`,
                      borderBottomStyle: 'solid',
                      borderBottomColor: design.table.borderColor,
                    }}
                  >
                    <td style={{ padding: `${design.table.cellPadding}px`, color: design.table.bodyTextColor }}>
                      Row 2
                    </td>
                    <td style={{ padding: `${design.table.cellPadding}px`, color: design.table.bodyTextColor }}>
                      More data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {design.footer.enabled && (
              <div
                className="page-footer"
                style={{
                  paddingBottom: `${mmToPx(design.page.margins.bottom)}px`,
                  paddingLeft: `${marginLeftPx}px`,
                  paddingRight: `${marginRightPx}px`,
                  paddingTop: `${design.footer.spacing}px`,
                  borderTopWidth: design.footer.borderEnabled ? `${design.footer.borderThickness}px` : 0,
                  borderTopStyle: design.footer.borderEnabled ? 'solid' : 'none',
                  borderTopColor: design.footer.borderColor,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: `${design.footer.fontSize}px`,
                    fontFamily: design.footer.fontFamily,
                    color: design.footer.color,
                  }}
                >
                  <div>{design.footer.leftContent}</div>
                  <div>{design.footer.centerContent}</div>
                  <div>
                    {design.footer.rightContent.includes('{page}')
                      ? design.footer.rightContent.replace('{page}', '1')
                      : design.footer.rightContent}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
