declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties, ReactNode, SVGProps, MouseEvent } from 'react'

  interface ProjectionConfig {
    scale?: number
    center?: [number, number]
    rotate?: [number, number, number]
    parallels?: [number, number]
  }

  interface ComposableMapProps {
    width?: number
    height?: number
    projectionConfig?: ProjectionConfig
    projection?: string
    style?: CSSProperties
    className?: string
    children?: ReactNode
  }

  interface GeographiesRenderProps {
    geographies: GeographyFeature[]
  }

  interface GeographyFeature {
    rsmKey: string
    id: string | number
    properties: Record<string, unknown>
    [key: string]: unknown
  }

  interface GeographiesProps {
    geography: string | object
    children: (props: GeographiesRenderProps) => ReactNode
  }

  interface GeographyStyleEntry {
    fill?: string
    stroke?: string
    strokeWidth?: number
    outline?: string
    cursor?: string
    transition?: string
  }

  interface GeographyStyleProp {
    default?: GeographyStyleEntry
    hover?: GeographyStyleEntry
    pressed?: GeographyStyleEntry
  }

  interface GeographyProps extends Omit<SVGProps<SVGPathElement>, 'style'> {
    geography: GeographyFeature
    style?: GeographyStyleProp
    className?: string
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void
    onMouseMove?: (event: MouseEvent<SVGPathElement>) => void
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void
    onClick?: (event: MouseEvent<SVGPathElement>) => void
  }

  interface ZoomableGroupProps {
    zoom?: number
    center?: [number, number]
    minZoom?: number
    maxZoom?: number
    className?: string
    children?: ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
  export const Marker: ComponentType<Record<string, unknown>>
  export const Line: ComponentType<Record<string, unknown>>
  export const Graticule: ComponentType<Record<string, unknown>>
  export const Sphere: ComponentType<Record<string, unknown>>
}
