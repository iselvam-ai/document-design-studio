import React, { useMemo } from 'react';
import type { ColorPalette, DesignConfig, TypographyStyle } from '../types';
import { formatPageNumber, mmToPx, resolveColor } from '../utils';

interface CanvasProps {
  design: DesignConfig;
}

type TextStyleOptions = { spacing?: boolean; alignment?: boolean };

// Converts a typography style from the design into inline CSS for the preview.
const textStyle = (
  style: TypographyStyle,
  palette: ColorPalette,
  { spacing = true, alignment = true }: TextStyleOptions = {},
) => {
  const css: React.CSSProperties = {
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    fontWeight: style.fontWeight,
    fontStyle: style.italic ? 'italic' : 'normal',
    color: resolveColor(style.color, palette),
    letterSpacing: `${style.letterSpacing}px`,
    lineHeight: style.lineHeight,
  };
  if (alignment) css.textAlign = style.alignment.toLowerCase() as React.CSSProperties['textAlign'];
  if (spacing) {
    css.marginTop = `${style.paragraphSpacingBefore}px`;
    css.marginBottom = `${style.paragraphSpacingAfter}px`;
  }
  return css;
};

const Canvas: React.FC<CanvasProps> = ({ design }) => {
  const pageWidthPx = useMemo(() => mmToPx(design.page.width), [design.page.width]);
  const pageHeightPx = useMemo(() => mmToPx(design.page.height), [design.page.height]);

  const marginTopPx = mmToPx(design.page.margins.top);
  const marginBottomPx = mmToPx(design.page.margins.bottom);
  const marginLeftPx = mmToPx(design.page.margins.left);
  const marginRightPx = mmToPx(design.page.margins.right);

  const hasLogo = design.logo.enabled && Boolean(design.logo.source);
  const logoInHeader = hasLogo && design.header.enabled && design.header.includeLogo;
  const logoSizeStyle: React.CSSProperties = {
    width: `${mmToPx(design.logo.width)}px`,
    height: `${mmToPx(design.logo.height)}px`,
    opacity: design.logo.opacity,
  };

  // The preview shows a single page, so the page number is always 1.
  const pageNumberText = formatPageNumber(1, design.pageNumber.format);
  const footerSlots = (() => {
    const slots = [design.footer.leftContent, design.footer.centerContent, design.footer.rightContent];
    if (!design.footer.includePageNumber) {
      // A slot that only exists to show the page number is hidden with it.
      return slots.map((slot) => (slot.includes('{page}') ? '' : slot));
    }
    if (slots.some((slot) => slot.includes('{page}'))) {
      return slots.map((slot) => slot.split('{page}').join(pageNumberText));
    }
    const index = { BottomLeft: 0, BottomCenter: 1, BottomRight: 2 }[design.pageNumber.position as string] ?? 2;
    return slots.map((slot, i) => (i === index ? [slot, pageNumberText].filter(Boolean).join(' ') : slot));
  })();

  const type = design.typography;
  const palette = design.colors;
  const color = (value: string) => resolveColor(value, palette);
  const cellStyle = (style: TypographyStyle): React.CSSProperties => ({
    ...textStyle(style, palette, { spacing: false }),
    padding: `${design.table.cellPadding}px`,
    borderBottom: `${design.table.borderThickness}px solid ${color(design.table.borderColor)}`,
  });
  const tableRows = [
    ['Board of Trustees', 'Sets strategy and approves the annual budget'],
    ['Audit Committee', 'Oversees financial reporting and controls'],
    ['Executive Office', 'Delivers operations within approved policy'],
  ];

  const getBackgroundStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {};

    if (design.background.type === 'Solid') {
      base.backgroundColor = color(design.background.solidColor);
    } else if (design.background.type === 'Gradient') {
      const color1 = color(design.background.gradientColor1);
      const color2 = color(design.background.gradientColor2);
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
                      backgroundColor: color(shape.color),
                    }),
                    ...(shape.type === 'Rectangle' && {
                      backgroundColor: color(shape.color),
                    }),
                    ...(shape.type === 'RoundedRectangle' && {
                      backgroundColor: color(shape.color),
                      borderRadius: '4px',
                    }),
                    ...(shape.type === 'Line' && {
                      backgroundColor: color(shape.color),
                    }),
                  }}
                />
              ))}
          </div>

          {hasLogo && !logoInHeader && (
            <img
              className="page-logo"
              src={design.logo.source}
              alt=""
              style={{
                ...logoSizeStyle,
                left: `${mmToPx(design.logo.x)}px`,
                top: `${mmToPx(design.logo.y)}px`,
              }}
            />
          )}

          <div className="page-inner">
            {design.header.enabled && (
              <div
                className="page-header"
                style={{
                  paddingTop: `${marginTopPx}px`,
                  paddingLeft: `${marginLeftPx}px`,
                  paddingRight: `${marginRightPx}px`,
                  paddingBottom: `${design.header.spacing}px`,
                  borderBottomWidth: design.header.borderEnabled ? `${design.header.borderThickness}px` : 0,
                  borderBottomStyle: design.header.borderEnabled ? 'solid' : 'none',
                  borderBottomColor: color(design.header.borderColor),
                }}
              >
                <div
                  className="page-slots doc-header"
                  style={textStyle(type.header, palette, { spacing: false, alignment: false })}
                >
                  <div className="header-left">
                    {logoInHeader && (
                      <img className="header-logo" src={design.logo.source} alt="" style={logoSizeStyle} />
                    )}
                    {design.header.leftContent}
                  </div>
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
              }}
            >
              <h1 className="page-text doc-document-title" style={textStyle(type.documentTitle, palette)}>
                Institutional Governance Framework
              </h1>
              <p className="page-text doc-subtitle" style={textStyle(type.subtitle, palette)}>
                A Professional Organizational Publication
              </p>
              <h2 className="page-text doc-part-title" style={textStyle(type.partTitle, palette)}>
                Part I — Foundations
              </h2>
              <h3 className="page-text doc-article-title" style={textStyle(type.articleTitle, palette)}>
                Article 1. Purpose and Scope
              </h3>
              <h4 className="page-text doc-section-title" style={textStyle(type.sectionTitle, palette)}>
                Vision &amp; Purpose
              </h4>
              <p className="page-text doc-lead-paragraph" style={textStyle(type.leadParagraph, palette)}>
                This framework sets out how the institution is directed, controlled and held to account.
              </p>
              <p className="page-text doc-body" style={textStyle(type.body, palette)}>
                This is sample document content demonstrating the design system. Every aspect of typography, colour, and
                layout is independently controllable through the design interface.
              </p>

              <table className="sample-table">
                <thead>
                  <tr style={{ backgroundColor: color(design.table.headerBackground) }}>
                    <th className="doc-table-header" style={cellStyle(type.tableHeader)}>
                      Body
                    </th>
                    <th className="doc-table-header" style={cellStyle(type.tableHeader)}>
                      Responsibility
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr
                      key={row[0]}
                      className={design.table.stripedRows && i % 2 === 1 ? 'striped' : undefined}
                      style={{ backgroundColor: color(design.table.bodyBackground) }}
                    >
                      {row.map((cell) => (
                        <td key={cell} className="doc-table-body" style={cellStyle(type.tableBody)}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="page-text doc-caption" style={textStyle(type.caption, palette)}>
                Table 1. Governance bodies and their responsibilities
              </p>
            </div>

            {design.footer.enabled && (
              <div
                className="page-footer"
                style={{
                  paddingBottom: `${marginBottomPx}px`,
                  paddingLeft: `${marginLeftPx}px`,
                  paddingRight: `${marginRightPx}px`,
                  paddingTop: `${design.footer.spacing}px`,
                  borderTopWidth: design.footer.borderEnabled ? `${design.footer.borderThickness}px` : 0,
                  borderTopStyle: design.footer.borderEnabled ? 'solid' : 'none',
                  borderTopColor: color(design.footer.borderColor),
                }}
              >
                <div
                  className="page-slots doc-footer"
                  style={textStyle(type.footer, palette, { spacing: false, alignment: false })}
                >
                  <div>{footerSlots[0]}</div>
                  <div>{footerSlots[1]}</div>
                  <div>{footerSlots[2]}</div>
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
