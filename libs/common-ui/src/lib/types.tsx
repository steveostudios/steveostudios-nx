export interface KeyProps {
	visible?: boolean;
	disabled?: boolean;
	showLabel?: boolean;
	readonly?: boolean;
}
export interface CommonInputProps extends KeyProps {
	slug: string;
	label: string;
}
