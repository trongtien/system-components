export type CSSProperties = Record<string, string | number>;
export type StyledComponent = string | CSSProperties

export type ComponentBaseProps = {
    style?: StyledComponent
    className?: string
}